import { Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { Minesweeper, MinesweeperResults } from './components/Minesweeper';

function App()
{
  // * GAME Difficulty
  // - The current game being played
  const [ difficulty, setDifficulty ] = useState(1);

  // * HANDLE Victory
  // - Callback function called by the game component, when user wins
  function onVictory (results: MinesweeperResults)
  {
    // Simply log the results in the console
    console.log("VICTORY", results);
  }

  // * HANDLE Gameover
  // - Callback function called by the game component, when user loses
  function onGameover (results: MinesweeperResults)
  {
    // Simply log the results in the console
    console.log("GAMEOVER", results);
  }

  return (
    <Flex h="100vh" direction="column" alignItems="center" justifyContent="center">

      <Flex gap={4} pb={12}>
        <Button colorScheme="red" variant={ difficulty === 1 ? "solid" : "ghost" } onClick={() => { setDifficulty(1) }}>Beginner</Button>
        <Button colorScheme="red" variant={ difficulty === 2 ? "solid" : "ghost" } onClick={() => { setDifficulty(2) }}>Intermediate</Button>
        <Button colorScheme="red" variant={ difficulty === 3 ? "solid" : "ghost" } onClick={() => { setDifficulty(3) }}>Expert</Button>
      </Flex>

      { difficulty === 1 && <Minesweeper size={{rows: 9, columns: 9}} bombs={10} onVictory={onVictory} onGameover={onGameover}/> }
      { difficulty === 2 && <Minesweeper size={{rows: 16, columns: 16}} bombs={40} onVictory={onVictory} onGameover={onGameover}/> }
      { difficulty === 3 && <Minesweeper size={{rows: 16, columns: 30}} bombs={99} onVictory={onVictory} onGameover={onGameover}/> }

    </Flex>
  );
}

export default App;