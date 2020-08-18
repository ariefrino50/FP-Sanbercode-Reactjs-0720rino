import React from 'react';
import Main from './layout/Main';
import './App.css';
import {UserProvider} from "../src/context/UserContext"
import {MovieProvider} from "../src/context/MovieContext"
// import {GameProvider} from "../src/context/GameContext"

function App() {
  return (
     <>
    {/* <GameProvider> */}
   
    <UserProvider>
    <MovieProvider>
      <Main />
    </MovieProvider>
    </UserProvider>
      
      {/* </GameProvider> */}
    </>
  );
}

export default App;