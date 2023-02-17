
//checking the lines
const CheckLine = (line, isGenerating) => {
    for (let i = 0; i < 9; i++) {
        for (let j = i + 1; j < 9; j++) {
            if (isGenerating) {//if the grid is generating, we don't mind the value 0
                if (line[i].value == line[j].value && line[i].value != 0)
                    return false;
            }
            else {
                if (line[i].value == line[j].value || line[i].value == 0)
                    return false;
            }
        }
    }
    return true;
}

const CheckLines = (grid, isGenerating) => {
    for (let i = 0; i < 9; i++) {
        if (!CheckLine(grid[i], isGenerating)) {
            return false;
        }
    }
    return true;
}

//Checking the columns

const CheckColumn = (grid, j, isGenerating) => {
    for (let i = 0; i < 9; i++) {
        for (let k = i + 1; k < 9; k++) {
            if (isGenerating) {//if the grid is generating, we don't mind the value 0
                if (grid[i][j].value == grid[k][j].value && grid[i][j].value != 0)
                    return false;
            }
            else {
                if (grid[i][j].value == grid[k][j].value || grid[i][j].value == 0)
                    return false;
            }
        }
    }
    return true;
}

const CheckColumns = (grid, isGenerating) => {
    for (let i = 0; i < 9; i++) {
        if (!CheckColumn(grid, i, isGenerating))
            return false;
    }
    return true;
}

//Checking the blocs
const CheckBloc = (grid, i, j, isGenerating) => {
    let checkArray = new Array(9);
    let checkI = 0
    //selecting the array to be checked
    for (let k = 0; k < 3; k++) {
        for (let p = 0; p < 3; p++) {
            checkArray[checkI] = grid[(i * 3) + k][(j * 3) + p].value;
            checkI++;
        }
    }

    //checking the array
    for (let k = 0; k < 9; k++) {
        for (let p = k + 1; p < 9; p++) {
            if (isGenerating) {//if the grid is generating, we don't mind the value 0
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

const CheckBlocs = (grid, isGenerating) =>{
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!CheckBloc(grid, i, j, isGenerating))
                return false;
        }
    }
    return true;
}

const CheckGrid = (grid, isGenerating) =>
{
    //checks if all the lines are valid
    if (!CheckLines(grid, isGenerating)) {
        return false;
    }
    //checks if all the columns are valid
    else if (!CheckColumns(grid, isGenerating)) {
        return false;
    }
    //checks if all the blocks are valid
    else if (!CheckBlocs(grid, isGenerating)) {
        return false;
    }
    //everything is valid
    else
        return true;
}

export default CheckGrid