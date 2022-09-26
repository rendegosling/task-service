import axios from "axios";
import React, { useEffect, useMemo, useState, setState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import tw from "twin.macro";
import { GlobalFilter } from "./globalFilter";

const Table = tw.table`
  table-fixed
  text-base
  text-gray-900
`;

const TableHead = tw.thead`
  p-2
`;

const TableRow = tw.tr`
border
border-blue-500
`;

const TableHeader = tw.th`
border
border-blue-500
p-2
`;

const TableBody = tw.tbody`

`;

const TableData = tw.td`
border
border-blue-500
p-5
`;

const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-black
  rounded-md
  bg-blue-300
  hover:bg-blue-200
  transition-colors
`;

const AddTaskContainer = tw.div`
  mb-6
  mt-6
  flex
  items-center
`;

const AddTaskText = tw.h2`
  text-xl
text-gray-600
  mr-6
`;

const CellText = tw.h2`
  text-xl
text-gray-600
  mr-6
`;

const Input = tw.input`
  h-8
  border-2
  border-solid
  border-blue-500
  outline-none
  p-4
  rounded-lg
  mr-6
`;

const AddTaskButton = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-black
  rounded-md
  bg-blue-300
  hover:bg-blue-200
  transition-colors
`;

export function Tasks(props) {
  const [tasks, setTasks] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchTasks = async () => {
    const response = await axios
      .get("http://localhost:1337/tasks/get")
      .catch((err) => console.log(err));

    if (response) {
      const tasks = response.data;

      console.log("Tasks: ", tasks);
      setTasks(tasks);
    }
  };

  const data = useMemo(
    () => [
      {
        id: 1,
        name: "Task 1",
        description:
          "B Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        due_date: "2022-08-18",
        status: "expired",
      },
      {
        id: 2,
        name: "Task 2",
        description:
          "A Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        due_date: "2022-08-18",
        status: "expired",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Due Date",
        accessor: "due_date"
      }
    ],
    []
  );

  // data in use state from API
  const tasksData = useMemo(() => [...tasks], [tasks]);

  // dynamic columns from the APIs
  const tasksColumns = useMemo(
    () =>
      tasks[0]
        ? Object.keys(tasks[0])
            .map((key) => {
              return { Header: key, accessor: key };
            })
        : [],
    [tasks]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Status",
        Header: "Status",
        Cell: ({ value, row }) => (
          <CellText onClick={() => {
          }}>
            {getStatusStringByDueDate(row.values.due_date)}
          </CellText>
        ),
      },
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <Button onClick={() => {
            let updated_text = prompt("Update Task: <name>, <description>, <due_date>", `${row.values.name}, ${row.values.description}, ${row.values.due_date}`)
            if (updated_text != null) {
              handleUpdateTask(row.values.ID, updated_text);
            }
          }}>
            Edit
          </Button>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: tasksColumns,
      data: tasksData,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  // get even rows for alternating row colors
  const isEven = (idx) => idx % 2 === 0;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const handleName = event => {
    setName(event.target.value);
  };
  const handleDescription = event => {
      setDescription(event.target.value);
  };
  const handleDueDate = event => {
      setDueDate(event.target.value);
  };
  const resetAddTaskFields = () => {
    setName("");
    setDescription("");
    setDueDate("");
  };

  const addTask = async () => {
    const response = await axios.post("http://localhost:1337/tasks/create", {
      name: name,
      description: description,
      due_date: dueDate
    });
    return response;
  }

  const updateTask = async (taskId, name, description, dueDate) => {
    const response = await axios.put(`http://localhost:1337/tasks/update/${taskId}`, {
      name: name,
      description: description,
      due_date: dueDate
    });
    return response;
  }

  const handleAddTask = event => {
    addTask()
    .then((response) =>{
      resetAddTaskFields();
      setRefreshKey(refreshKey+1);
    });
  }

  const handleUpdateTask = (taskId, updated_task) => {
    console.log(updated_task)
    let split_text = updated_task.split(",");
    updateTask(taskId, split_text[0], split_text[1], split_text[2])
    .then((response) => {
      setRefreshKey(refreshKey+1);
    });
  }

  const getStatusStringByDueDate = (dueDateString) => {
    let date = new Date(dueDateString);
    let currentDate = new Date();
    let dayDiff = dateDifference(currentDate, date);
    if (dayDiff >= 7) {
      return "Not Urgent";
    }
    if (dayDiff < 7 && dayDiff > 0) {
      return "Due soon";
    }
    return "Overdue";
  }

  const dateDifference = (date1, date2) => {
    var diff = date2.getTime() - date1.getTime();
    var daydiff = diff / (1000 * 60 * 60 * 24);
    return daydiff;
  }

  useEffect(() => {
    fetchTasks();
  }, [refreshKey]);

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <AddTaskContainer>
        <AddTaskText>Add Task:</AddTaskText>
        <Input
          onChange={handleName} placeholder={`Name`}
        />
        <Input
          onChange={handleDescription} placeholder={`Description`}
        />
        <Input
          onChange={handleDueDate} placeholder={`Due Date YYYY-MM-DD`}
        />
        <AddTaskButton onClick={handleAddTask}>Add Task</AddTaskButton>
      </AddTaskContainer>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);

            return (
              <TableRow
                {...row.getRowProps()}
                className={isEven(idx) ? "bg-blue-400 bg-opacity-30" : ""}
              >
                {row.cells.map((cell, idx) => (
                  <TableData {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableData>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}