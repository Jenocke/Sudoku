import logo from './logo.svg';
import './App.css';
import GenerateGrid from './generator/sudokuGen';

function App() {

  const grid = GenerateGrid();
  //TODO
    /*
      -Generate Sudoku
      -Display grid to the player
      -Let the player fill the grid
      -Add a submit button. When pressed 
      -check if the completed sudoku is valid
      -if the grid is valid, tell the player he won
    */
  return (
    <>
       {console.log(grid)}
    </>

  )
}

export default App;
