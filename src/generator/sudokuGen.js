import CheckGrid from "../Sudoku_Check/sudokuCheck";
//This function is the blueprint for every case that will populate the sudoku grid
function Case() {
        this.value = 0;
        this.wasErased = false;
}

const RandomizeCase = (grid, i, j, number) => {
    if (j >= 9)
        return true; //We reach the en of the line with a no error => line is valid
    const memoryNumbersArray = new Array(9); //Creating array to remember what numbers we still have to try
    let numberToTry = 0;

    //filling the memory array
    for (let k = 0; k < 9; k++) {
        memoryNumbersArray[k] = k + 1;
    }

    let isGood = false;

    if (j === 0) {
        numberToTry = memoryNumbersArray.splice(memoryNumbersArray.indexOf(number), 1); //Retrieveing the number we're about to try from the memory array
        grid[i][j].value = numberToTry[0];
        if (CheckGrid(grid, true)) //Trying to validate the number for that case.
            isGood = RandomizeCase(grid, i, j + 1, 0); //If that number works, we try to fill the next case in that line
    }

    while (memoryNumbersArray.length > 0 && !isGood) {
        numberToTry = memoryNumbersArray.splice((Math.floor(Math.random() * memoryNumbersArray.length)), 1); //Randomizing the number we'lle try for that case
        grid[i][j].value = numberToTry[0];
        if (CheckGrid(grid, true)) //Trying to validate the number for that case.
            isGood = RandomizeCase(grid, i, j + 1); //If that number works, we try to fill the next case in that line
        else { //If it doesn't work, we're putting back the default value in the case
            grid[i][j].value = 0;
        }
    }
    if (!isGood) {
        grid[i][j].value = 0;
        return false; //Exited the loop without finding a fitting number
    }
    else
        return true; //Exited the loop (and subsequent calls) and found all the good numbers

}

const RandomizeLine = (grid, i) => {
    if (i >= 9)
        return true; //Last line reached, no use to continue further
    
    let isGood = false;
    const memoryArray = new Array(9); // this array will remember the lines we tried so far for the grid

    //filling the memory array
    for (let k = 0; k < 9; k++) {
        memoryArray[k] = k + 1;
    }
    while (!isGood && memoryArray.length > 0) {
        const numberToTry = memoryArray.splice((Math.floor(Math.random() * memoryArray.length)), 1); //We randomize the number we'll try
        if (RandomizeCase(grid, i, 0, numberToTry[0])) //RandomLine check every line possibilities. If false, then no solutions for that configuration.
            isGood = RandomizeLine(grid, i + 1); //if the line is OK, we continue with the next line
        else    
            return false; //if not, we go back one line to try another configuration
    }
    if (isGood) //We finished the loop and start getting back to the main function
        return true;
    else //We didn't find any valid configuration and tried every number possible.
        return false;
}

//This is the main function for the sudoku generation
const GenerateGrid = () =>
{
    //TODO
    //Create the grid line by line

    //the grid is a array of arrays
    const grid = new Array(9);
    //Setting up the grid
    for (let i=0; i<9; i++)
    {
        grid[i] = new Array(9);
        for (let j = 0; j < 9; j++) {
            //populating the grid with the cases that will hold the data we need
            grid[i][j] = new Case();
        }
    }

    RandomizeLine(grid, 0);

    return grid;
}

export default GenerateGrid