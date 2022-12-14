import logo from './logo.svg';
import './App.css';
import tw from "twin.macro";
import { Tasks } from "./components/tasks";

import { useState } from "react";

const AppContainer = tw.div`
  w-full
  max-w-full
  flex
  flex-col
  items-center
  justify-center
  pt-6
  pb-10
  pl-10
  pr-10
`;


const Title = tw.h1`
  text-2xl
  font-semibold
`;

function App() {
  return (
    <AppContainer>
      <Title>Task Management</Title>
      <Tasks />
    </AppContainer>
  );
}

export default App;
