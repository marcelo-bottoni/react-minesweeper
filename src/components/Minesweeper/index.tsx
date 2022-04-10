import { useEffect, useState } from "react";

import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

import { PlayButton } from "./PlayButton";
import { Display } from './Display';
import { Tile } from './Tile';

// * GAME Properties
// - Interface that defines the properties expected by the game component
interface MinesweeperProps
{
  size: { rows: number; columns: number; };
  bombs: number;

  useDoubtFlag?: boolean;

  onVictory?: (results: MinesweeperResults) => void;
  onGameover?: (results: MinesweeperResults) => void;
}

// * GAME Results
// - Interface that defines the results provided by the game component
export interface MinesweeperResults
{
  time: number;
  points: number;
  bombs: number;
  tiles: number;

  clicks:
  {
    left: number;
    right: number
  }
}

// * GAME Component
// - Implementation of the game "Minesweeper" using ReactJS and declarative UI
export function Minesweeper ({ size, bombs, useDoubtFlag = false, onVictory, onGameover }: MinesweeperProps)
{
  // * GAME State
  // - Holds the game main data
  const [ field, setField ] = useState<number[][]>([]);
  const [ tiles, setTiles ] = useState<string[][]>([]);
  const [ flags, setFlags ] = useState<number>(0);
  const [ timer, setTimer ] = useState<number>(0);
  const [ stage, setStage ] = useState<"ready" | "playing" | "complete" | "gameover">("ready");

  // * GAME Statistics State
  // - Holds the game statistics data
  const [ leftClicks, setLeftClicks ] = useState<number>(0);
  const [ rightClicks, setRightClicks ] = useState<number>(0);

  // * GAME Reset
  // - Handles the game reset
  function handleGameReset ()
  {
    // Create a new grid objects
    let newField: number[][] = [];
    let newTiles: string[][] = [];

    // Initialize the grids
    for (let x = 0; x < size.rows; x++)
    {
      newField[x] = [];
      newTiles[x] = [];

      for (let y = 0; y < size.columns; y++)
      {
        newField[x][y] = 0;
        newTiles[x][y] = "idle";
      }
    }

    // Populate the grid with bombs
    for (let b = 0; b < bombs; b++)
    {
      let x: number;
      let y: number;

      // Get a random coordinate (x, y), that is still empty in the grid
      do
      {
        x = Math.floor(Math.random() * (size.rows));
        y = Math.floor(Math.random() * (size.columns));
      }
      while (newField[x][y] !== 0);

      // Set a bomb at this coordinate
      newField[x][y] = 10;
    }

    // Loop in the grid, defining the numbered tiles
    for (let x = 0; x < size.rows; x++)
    {
      for (let y = 0; y < size.columns; y++)
      {
        if (newField[x][y] === 0)
        {
          newField[x][y] = countNearBombs(x, y, newField);
        }
      }
    }

    // Set the state variables
    setField(newField);
    setTiles(newTiles);
    setTimer(0);
    setFlags(0);
    setStage("ready");

    // Set the statistics state
    setLeftClicks(0);
    setRightClicks(0);
  }

  // * TILE Clicked
  // - Handles the click on a given tile
  function handleTileClick (e: React.MouseEvent<Element, MouseEvent>, x: number, y: number)
  {
    // Prevent the default mouse event behavior
    e.preventDefault();

    // Ignore the click if the game has ended already
    if (stage === "complete" || stage === "gameover") return;

    // Prepare the next stage to be saved in state
    let newStage: "ready" | "playing" | "complete" | "gameover" = "playing";

    // Prepare a new copy of the tiles
    let newTiles: string[][] = [];
    for (let x = 0; x < size.rows; x++) { newTiles[x] = [ ...tiles[x] ]; }

    // * LEFT CLICK
    // - User has left clicked the tile
    if (e.type === 'click')
    {
      // If tile is not "idle", ignore the click
      if (newTiles[x][y] !== "idle") return;

      // Increment the click counter
      setLeftClicks(leftClicks + 1);

      // [ NUMBER ] - The clicked tile is a number
      if (field[x][y] >= 1 && field[x][y] <= 8)
      {
        // Update the stage of this tile
        newTiles[x][y] = String(field[x][y]);
      }

      // [ CLEAR ] - The clicked tile is clear
      if (field[x][y] === 0)
      {
        // Open near tiles
        newTiles = openNearTiles(x, y, newTiles);
      }

      // [ BOMB ] - The clicked tile is a bomb
      if (field[x][y] === 10)
      {
        // Update the stage of this tile
        newTiles[x][y] = "exploded";

        // Show the bombs and wrong flags
        newTiles = showAllBombs(newTiles);

        // Prepare the gameover results
        handlesGameover();

        // Define the new game stage
        newStage = "gameover";
      }

      // If stage is still "playing", check for victory
      if (checkVictory(newTiles)) newStage = "complete";
    }

    // * RIGHT CLICK
    // - User has right clicked the tile
    else if (e.type === 'contextmenu')
    {
      // If tile is "idle", set it to "flag"
      if (newTiles[x][y] === "idle")
      {
        // Update the tile
        newTiles[x][y] = "flag";

        // Increment the click counter
        setRightClicks(rightClicks + 1);

        // Increase the number of flags
        setFlags(flags + 1);
      }

      // If tile is "flag", set it to "doubt"
      else if (newTiles[x][y] === "flag")
      {
        // Update the tile
        newTiles[x][y] = (useDoubtFlag) ? "doubt" : "idle";

        // Increment the click counter
        setRightClicks(rightClicks + 1);

        // Decrease the number of flags
        setFlags(flags - 1);
      }

      // If tile is "doubt", set it to "idle"
      else if (newTiles[x][y] === "doubt")
      {
        // Update the tile
        newTiles[x][y] = "idle";

        // Increment the click counter
        setRightClicks(rightClicks + 1);

        // Decrease the number of flags
        setFlags(flags - 1);
      }

      // If tile is in a different stage, ignore the click
      else return;
    }

    // Update the tiles state
    setTiles(newTiles);

    // Update the stage stage
    if (newStage !== stage) setStage(newStage);
  }

  // Counts the number of bombs near a given tile
  function countNearBombs (x: number, y: number, grid: number[][])
  {
    // Bombs counter
    let nearBombs = 0;

    // Check the 8 tiles around the provided coordinate (x, y)
    if (x-1 >= 0 && y-1 >= 0 && grid[x-1][y-1] === 10) nearBombs++;
    if (y-1 >= 0 && grid[x][y-1] === 10) nearBombs++;
    if (x+1 < size.rows && y-1 >= 0 && grid[x+1][y-1] === 10) nearBombs++;
    if (x-1 >= 0 && grid[x-1][y] === 10) nearBombs++;
    if (x+1 < size.rows && grid[x+1][y] === 10) nearBombs++;
    if (x-1 >= 0 && y+1<size.columns && grid[x-1][y+1] === 10) nearBombs++;
    if (y+1<size.columns && grid[x][y+1] === 10) nearBombs++;
    if (x+1 < size.rows && y+1<size.columns && grid[x+1][y+1] === 10) nearBombs++;

    // Return the number of bombs
    return nearBombs;
  }

  // Shows all the bombs in the field
  function showAllBombs (newTiles: string[][])
  {
    // Loop in the fiel array, detecting the bombs
    for (let x = 0; x < size.rows; x++)
    {
      for (let y = 0; y < size.columns; y++)
      {
        if (field[x][y] === 10)
        {
          // If the tile is "idle" show the bomb
          if (newTiles[x][y] === "idle") newTiles[x][y] = "bomb";
        }

        // If user placed a flag here, mark it as a wrong flat
        else if (newTiles[x][y] === "flag") newTiles[x][y] = "wrong-flag";
      }
    }

    // Return the updated tiles array
    return newTiles;
  }

  // Shows all the flags in the field
  function showAllFlags (newTiles: string[][])
  {
    // Loop in the fiel array, detecting the bombs
    for (let x = 0; x < size.rows; x++)
    {
      for (let y = 0; y < size.columns; y++)
      {
        if (field[x][y] === 10)
        {
          // If the tile is "idle", or "doubt", show the flag
          if (newTiles[x][y] === "idle" || newTiles[x][y] === "doubt") newTiles[x][y] = "flag";
        }
      }
    }

    // Return the updated tiles array
    return newTiles;
  }

  // Opens tiles near a "clear" tile
  function openNearTiles (x: number, y: number, newTiles: string[][])
  {
    // If coordinates are off limit, simply return the tiles array
    if (x < 0 || x >= size.rows || y < 0 || y >= size.columns) return newTiles;

    // Analyze the field in this coordinate
    if (newTiles[x][y] === "idle")
    {
      // [ NUMBER ]
      if (field[x][y] >= 1 && field[x][y] <= 8) newTiles[x][y] = String(field[x][y]);

      // [ CLEAR ]
      else if (field[x][y] === 0)
      {
        // Mart this tile as clear
        newTiles[x][y] = "clear";

        // Execute the logic for the near tiles
        newTiles = openNearTiles(x-1, y-1, newTiles);
        newTiles = openNearTiles(x-1, y, newTiles);
        newTiles = openNearTiles(x-1, y+1, newTiles);
        newTiles = openNearTiles(x, y-1, newTiles);
        newTiles = openNearTiles(x, y+1, newTiles);
        newTiles = openNearTiles(x+1, y-1, newTiles);
        newTiles = openNearTiles(x+1, y, newTiles);
        newTiles = openNearTiles(x+1, y+1, newTiles);
      }
    }

    // Return the updated tiles
    return newTiles;
  }

  // Checks if user got victory
  function checkVictory (newTiles: string[][])
  {
    // Number of closed tiles
    let closedTiles = 0;

    // Count the number "closed tiles"
    for (let x = 0; x < size.rows; x++)
    {
      for (let y = 0; y < size.columns; y++)
      {
        if (newTiles[x][y] === "idle" || newTiles[x][y] === "flag" || newTiles[x][y] === "doubt") closedTiles += 1;
      }
    }

    // If number of closed tiles is equal to the number of bombs, we have a victory
    if (closedTiles === bombs)
    {
      // Show the flags
      showAllFlags(newTiles);

      // Prepare the victory results
      handlesVictory();

      // Return true, to indicate the victory
      return true;
    }

    // Return false, as no victory was detected
    return false;
  }

  // Prepare the final statistics and execute the callback function
  function handlesVictory ()
  {
    // TODO: Calculate the "points" of the user, based on time, clicks (and more?)

    // Prepare the results data
    const results: MinesweeperResults =
    {
      time: timer,
      points: 100,

      clicks: { left: leftClicks, right: rightClicks },

      bombs: bombs,
      tiles: (size.columns * size.rows)
    };

    // Execute the victory callback, if defined
    if (onVictory) onVictory(results);
  }

  // Prepare the final statistics and execute the callback function
  function handlesGameover ()
  {
    // Prepare the results data
    const results: MinesweeperResults =
    {
      time: timer,
      points: 0,

      clicks: { left: leftClicks, right: rightClicks },

      bombs: bombs,
      tiles: (size.columns * size.rows)
    };

    // Execute the gameover callback, if defined
    if (onGameover) onGameover(results);
  }

  // * GAME Timer
  // - Increments the game timer, if it is playing
  useEffect(() =>
  {
    // Increment the timer, if game has started
    const timeout = setTimeout(() => { if (stage === "playing") { setTimer(timer + 1); } }, 1000);

    // Clear the timeout loop when unmounting the component
    return () => { clearTimeout(timeout); };
  }, [timer, stage]);

  // * GAME Initialization
  // - Initializes the game when the component mounts or changes the props
  useEffect(() => { handleGameReset(); }, [ size, bombs, useDoubtFlag ]);

  return (
    <Box borderRadius={3} borderWidth={4} borderLeftColor="#FFFFFF" borderTopColor="#FFFFFF" borderRightColor="#808080" borderBottomColor="#808080">
      <Box bg="#C6C6C6" p={2} borderWidth={1} borderLeftColor="#EAEAEA" borderTopColor="#EAEAEA" borderRightColor="#A3A3A3" borderBottomColor="#A3A3A3">

        <Box borderWidth={1} borderLeftColor="#A3A3A3" borderTopColor="#A3A3A3" borderRightColor="#EAEAEA" borderBottomColor="#EAEAEA">
          <Box borderWidth={4} borderLeftColor="#808080" borderTopColor="#808080" borderRightColor="#FFFFFF" borderBottomColor="#FFFFFF" bg="#C0C0C0" position="relative">

            <Flex justifyContent="space-between" p={1}>
              <Display value={bombs - flags}/>

              <div onClick={handleGameReset}>
                <PlayButton stage={stage}/>
              </div>

              <Display value={timer}/>
            </Flex>
          </Box>
        </Box>

        <Box h={2}></Box>

        <Box borderWidth={1} borderLeftColor="#A3A3A3" borderTopColor="#A3A3A3" borderRightColor="#EAEAEA" borderBottomColor="#EAEAEA">
          <Box borderWidth={4} borderLeftColor="#808080" borderTopColor="#808080" borderRightColor="#FFFFFF" borderBottomColor="#FFFFFF" bg="#C0C0C0" position="relative">

            { (stage === "gameover" || stage === "complete") && <Box position="absolute" left={0} top={0} right={0} bottom={0} zIndex={10}></Box> }

            <SimpleGrid columns={size.columns}>

              {
                tiles.map((row: string[], x: number) =>
                (
                  row.map((tile: string, y: number) =>
                  (
                    <div key={`[${x}, ${y}]`}onClick={(e) => handleTileClick(e, x, y)} onContextMenu={(e)=> handleTileClick(e, x, y)}>
                      <Tile x={x} y={y} stage={tile} />
                    </div>
                  ))
                ))
              }

            </SimpleGrid>

          </Box>
        </Box>
      </Box>
    </Box>
  );
}