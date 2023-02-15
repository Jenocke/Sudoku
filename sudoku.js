function Main() {
    let isPlaying = true;

    console.log(`Bienvenue dans Sudoku.`);
    let array = new Array(9);

    for (let i = 0; i < 9; i++) {
        array[i] = i + 1;
    }

    while (isPlaying) {

        let userInput;
        Sudoku();

        do {
            userInput = prompt(`Rejouer ? o/n`)
        } while (userInput.toLowerCase() != `o` && userInput.toLowerCase() != `n`);
        if (userInput.toLowerCase() == `n`) { isPlaying = false; }
    }

}


function Sudoku() {
    //TODO
    let grid = GenerateGrid();

    //choose difficulty
    let difficulty = parseInt(prompt(`Choisir difficulté : 1. Facile, 2. Normal, 3.Difficile`));
    EmptyGrid(grid, difficulty * 10);


    let userInput = new Array(3);
    let isPlaying = true;
    do {
        DisplayGrid(grid);
        ChooseCase(userInput);
        if (userInput[0] == -1)
            isPlaying = false;
        else if (grid[userInput[1]][userInput[0]].wasErased)
            //Set user value into the selected case.
            grid[userInput[1]][userInput[0]].userInput = userInput[2];
        else
            console.log(`Impossible d'écraser une case dévoilée`);
    } while (isPlaying);


    //when finished
    if (CheckGrid(grid)) //-> Win
    {
        console.log(`GG !`);
    }
    else //-> lose
    {
        console.log(`Perdu`);
        DisplayFilledGrid(grid);
    }
}

function Case() {
    this.answer = 0;
    this.userInput = 0;
    this.wasErased = false;
}

function GenerateGrid() {
    let grid = new Array(9);

    for (let i = 0; i < 9; i++)    //Setting up the grid
    {
        grid[i] = new Array(9);
        for (let j = 0; j < 9; j++) {
            grid[i][j] = new Case();
        }
    }

    RandomPass(grid, 0);

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            grid[i][j].userInput = grid[i][j].answer;
        }
    }
    //ShuffleGrid(grid);
    DisplayFilledGrid(grid);
    return grid;
}

function RandomPass(grid, i) {
    if (i >= 9)
        return true;

    let isGood = false;
    let numbersArray = new Array(9); //Creating array to remember the lines we tried
    let numberToTry = 0;
    for (let k = 0; k < 9; k++) {
        numbersArray[k] = k + 1;
    }
    while (!isGood && numbersArray.length > 0) {
        numberToTry = numbersArray.splice((Math.floor(Math.random() * numbersArray.length)), 1);
        if (RandomLine(grid, i, 0, numberToTry[0]))
            isGood = RandomPass(grid, i + 1);
        else    //RandomLine check every line possibilities. If false, then no solutions
            return false;
    }
    if (isGood)
        return true;
    else
        return false;

}

function RandomLine(grid, i, j, number) {
    if (j >= 9)
        return true; //isGood = true because we left the grid with CheckGrid returning true
    let numbersArray = new Array(9); //Creating array to remember what numbers we still have to try
    let numberToTry = 0;
    for (let k = 0; k < 9; k++) {
        numbersArray[k] = k + 1;
    }

    let isGood = false;
    if (j == 0) {
        numberToTry = numbersArray.splice(numbersArray.indexOf(number), 1);
        grid[i][j].answer = numberToTry[0];
        if (CheckGrid(grid, true))
            isGood = RandomLine(grid, i, j + 1, 0);
    }
    while (numbersArray.length > 0 && !isGood) {
        numberToTry = numbersArray.splice((Math.floor(Math.random() * numbersArray.length)), 1);
        grid[i][j].answer = numberToTry[0];
        if (CheckGrid(grid, true))
            isGood = RandomLine(grid, i, j + 1);
        else {
            grid[i][j].answer = 0;
        }
    }
    if (!isGood) {
        grid[i][j].answer = 0;
        return false; //Exited the loop without finding a fitting number
    }
    else
        return true; //Exited the loop (and subsequent calls) and found all the good numbers


}

function ShuffleGrid(grid) {
    let nbVerticalShuffles = Math.floor(Math.random() * 5 + 5);
    console.log(`nbVerticalShuffles : ` + nbVerticalShuffles);
    let nbHorizontalShuffles = Math.floor(Math.random() * 5 + 5);
    console.log(`nbHorizontalShuffles : ` + nbHorizontalShuffles);

    for (let i = 0; i < nbHorizontalShuffles; i++) {
        console.log(`Hor Shuffle`);
        HorizontalShuffle(grid);
        //DisplayFilledGrid(grid);
    }

    for (let i = 0; i < nbVerticalShuffles; i++) {
        console.log(`Ver Shuffle`);
        VerticalShuffle(grid);
        //DisplayFilledGrid(grid);
    }

}

function HorizontalShuffle(grid) {
    //selecting a random 'bloc' and a random lines in this 'bloc'
    let randomBloc = Math.floor(Math.random() * 3);
    let randomLineInBloc = Math.floor(Math.random() * 3);
    console.log(`Bloc ` + randomBloc);
    console.log(`Line ` + randomLineInBloc);
    if (Math.floor(Math.random() * 10) % 2 == 0) //Random selection of one of the two other lines in the bloc. %2 = 0 -> selecting down // %2 == 1 -> selecting up
    {
        InvertArray(grid[(randomBloc * 3) + randomLineInBloc], grid[(randomBloc * 3) + ((randomLineInBloc + 1) % 3)]);
    }
    else {
        let offset = 0;
        if (randomLineInBloc == 0) {
            offset = 2;
        }
        else {
            offset = (randomLineInBloc - 1);
        }
        InvertArray(grid[(randomBloc * 3) + randomLineInBloc], grid[(randomBloc * 3) + offset]);
    }
}

function VerticalShuffle(grid) {
    //selecting a random 'bloc' and a random column in this 'bloc'
    let randomBloc = Math.floor(Math.random() * 3);
    let randomColumnInBloc = Math.floor(Math.random() * 3);
    console.log(`Bloc ` + randomBloc);
    console.log(`Line ` + randomColumnInBloc);
    if (Math.floor(Math.random() * 10) % 2 == 0) //Random selection of one of the two other column in the bloc. %2 = 0 -> selecting left // %2 == 1 -> selecting right
    {
        InvertColumn(grid, (randomBloc * 3) + randomColumnInBloc, (randomBloc * 3) + ((randomColumnInBloc + 1) % 3));
    }
    else {
        let offset = 0;
        if (randomColumnInBloc == 0) {
            offset = 2;
        }
        else {
            offset = (randomColumnInBloc - 1);
        }
        InvertColumn(grid, (randomBloc * 3) + randomColumnInBloc, (randomBloc * 3) + offset);
    }
}

function InvertArray(arrayOne, arrayTwo) {
    let tempArray = new Array(9);

    CopyArray(arrayOne, tempArray);
    CopyArray(arrayTwo, arrayOne);
    CopyArray(tempArray, arrayTwo);
}

function CopyArray(arrayOne, arrayTwo) // arrayOne is the array to copy. Array two is the one recieving the copy
{
    for (let i = 0; i < 9; i++) {
        arrayTwo[i] = arrayOne[i];
    }
}

function InvertColumn(grid, index1, index2) {
    let tempCase = new Case(0, 0);
    //looping through the grid to change the datas of the columns
    for (let i = 0; i < 9; i++) {
        tempCase = grid[i][index1];
        grid[i][index1] = grid[i][index2];
        grid[i][index2] = tempCase;
    }
}

function EmptyGrid(grid, nbCasesToHide) {
    for (let i = 0; i < nbCasesToHide; i++) {
        let j = Math.floor(Math.random() * 9);
        let k = Math.floor(Math.random() * 9);

        if (grid[j][k].userInput == 0) {
            i--;
            continue;
        }
        else {
            grid[j][k].userInput = 0;
            grid[j][k].wasErased = true;
        }
    }
}

function ChooseCase(userInput) {
    do {
        //i = 0 -> X or `terminer`, i = 2 -> Y, i=3 -> value to fill
        userInput[0] = parseInt(prompt(`Insérez X ou -1 pour terminer`));
        if (userInput[0] == -1) {
            return userInput;
        }
    } while (Number.isNaN(userInput[0]) || userInput[0] < -1 || userInput[0] >= 9);
    do {
        userInput[1] = parseInt(prompt(`Insérez Y"`));
    } while (Number.isNaN(userInput[1]) || userInput[1] < 0 || userInput[1] >= 9)
    do {
        userInput[2] = parseInt(prompt(`Insérez la valeur souhaitée"`));
    } while (Number.isNaN(userInput[2]) || userInput[2] < 1 || userInput[2] > 9)
    return userInput;
}

function CheckGrid(grid, isGenerating) {
    if (!CheckLines(grid, isGenerating)) {
        return false;
    }
    else if (!CheckColumns(grid, isGenerating)) {
        return false;
    }
    else if (!CheckBlocs(grid, isGenerating)) {
        return false;
    }
    else
        return true;

}

function CheckLines(grid, isGenerating) {
    for (let i = 0; i < 9; i++) {
        if (!CheckLine(grid[i], isGenerating)) {
            return false;
        }
    }
    return true;
}

function CheckLine(line, isGenerating) {
    for (let i = 0; i < 9; i++) {
        for (let j = i + 1; j < 9; j++) {
            if (isGenerating) {
                if (line[i].answer == line[j].answer && line[i].answer != 0)
                    return false;
            }
            else {
                if (line[i].userInput == line[j].userInput || line[i].userInput == 0)
                    return false;
            }
        }
    }
    return true;
}

function CheckColumns(grid, isGenerating) {
    for (let i = 0; i < 9; i++) {
        if (!CheckColumn(grid, i, isGenerating))
            return false;
    }
    return true;
}

function CheckColumn(grid, j, isGenerating) {
    for (let i = 0; i < 9; i++) {
        for (let k = i + 1; k < 9; k++) {
            if (isGenerating) {
                if (grid[i][j].answer == grid[k][j].answer && grid[i][j].answer != 0)
                    return false;
            }
            else {
                if (grid[i][j].userInput == grid[k][j].userInput || grid[i][j].userInput == 0)
                    return false;
            }
        }
    }
    return true;
}

function CheckBlocs(grid, isGenerating) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!CheckBloc(grid, i, j, isGenerating))
                return false;
        }
    }
    return true;
}

function CheckBloc(grid, i, j, isGenerating) {
    let checkArray = new Array(9);
    let checkI = 0
    for (let k = 0; k < 3; k++) {
        for (let p = 0; p < 3; p++) {
            if (isGenerating)
                checkArray[checkI] = grid[(i * 3) + k][(j * 3) + p].answer;
            else
                checkArray[checkI] = grid[(i * 3) + k][(j * 3) + p].userInput;
            checkI++;
        }
    }

    for (let k = 0; k < 9; k++) {
        for (let p = k + 1; p < 9; p++) {
            if (isGenerating) {
                if (checkArray[k] == checkArray[p] && checkArray[k] != 0)
                    return false
            }
            else {
                if (checkArray[k] == checkArray[p] || checkArray == 0)
                    return false;
            }
        }
    }
    return true;
}

function DisplayGrid(grid) {
    let gridToDisplay = new Array(grid.length)
    for (let i = 0; i < grid.length; i++) {
        gridToDisplay[i] = new Array(grid.length);
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].userInput == 0) {
                gridToDisplay[i][j] = `⬜`;
            }
            else {
                gridToDisplay[i][j] = grid[i][j].userInput;
            }
        }
    }
    console.table(gridToDisplay);
}

function DisplayFilledGrid(grid) {
    let gridToDisplay = new Array(grid.length)
    for (let i = 0; i < grid.length; i++) {
        gridToDisplay[i] = new Array(grid.length);
        for (let j = 0; j < grid[i].length; j++) {
            gridToDisplay[i][j] = grid[i][j].answer;
        }
    }
    console.table(gridToDisplay);
}