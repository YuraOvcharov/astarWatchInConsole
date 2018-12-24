/* Обозначения: "." - есть проход,
                "#" - нет прохода,
                1, 2, 3... - шаг
*/

let start = () => {
    let rowNum = 4; // Math.floor((Math.random() + 1) * 10);
    colNum = 4;// Math.floor((Math.random() + 1) * 10);
    //matrixStart = getField(rowNum, colNum),
        matrixStart =   [
                            ["." , ".", "#", "."],
                            ["#" , ".", ".", "."],
                            ["#" , ".", "#", "#"],
                            ["#" , ".", ".", "."],
                        ]
        //start = matrixStart[0][0];
        //end = matrixStart[rowNum-1][colNum-1];
        checkMaze = seachExit(matrixStart, rowNum, colNum);

    console.log(checkMaze);
}

//Задаем поле
let getField = (rowNum, colNum) => {
    //watch .map() with .fill()
    let matrixStart = [];
    for (let i = 0; i < rowNum; i++) {
        matrixStart[i] = [];
        for (let j = 0; j < colNum; j++) {
            let num = Math.round(Math.random()); // 0 or 1
            if ((i == 0 && j == 0) || (i == rowNum - 1 && j == colNum - 1)) {
                num = ".";
            } else {
                num === 0 ? (num = ".") : (num = "#");
            }
            matrixStart[i][j] = num;
        }
    }
    return matrixStart;

}

const stepRight = (localMatrix, indexRow, indexCol, count) => {
    let doStep = false
    if (localMatrix[indexRow][indexCol + 1] === ".") {
        doStep = true;
    }
    return doStep;
}

const stepLeft = (localMatrix, indexRow, indexCol, count) => {
    let doStep = false;
    if (localMatrix[indexRow][indexCol - 1] === ".") {
        doStep = true;
    }
    return doStep;
}

const stepUp = (localMatrix, indexRow, indexCol, count) => {
    let doStep = false
    let minusIndexRow = indexRow - 1;

    if (minusIndexRow >= 0) {
        if (localMatrix[minusIndexRow][indexCol] === ".") {
            doStep = true;
        }
    }
    return doStep;
}

const stepDown = (localMatrix, indexRow, indexCol, count) => {
    let doStep = false;
    if (localMatrix[indexRow + 1][indexCol] === ".") {
        doStep = true;
    }

    return doStep;
}

let seachExit = (matrixStart, rowNum, colNum) => {
    let count = 0;
    matrixStart[0][0] = 0;
    let localMatrix = matrixStart;
    let resultForExit = true;
    while (resultForExit) {
        let arrayForSteps = [];
        let newMatrix = localMatrix.map(function (nested, indexRow) {
            return nested.map(function (value, indexCol) {
                if (value === count) {
                    let doStepR = stepRight(localMatrix, indexRow, indexCol, count),
                        doStepL = stepLeft(localMatrix, indexRow, indexCol, count),
                        doStepU = stepUp(localMatrix, indexRow, indexCol, count),
                        doStepD = false;

                    if (indexRow < (rowNum - 1)) {
                        doStepD = stepDown(localMatrix, indexRow, indexCol, count);
                    }

                    if (doStepR) {
                        localMatrix[indexRow][indexCol + 1] = count + 1;
                    }
                    if (doStepL) {
                        localMatrix[indexRow][indexCol - 1] = count + 1;
                    }
                    if (doStepD) {
                        localMatrix[indexRow + 1][indexCol] = count + 1;
                    }
                    if (doStepU) {
                        localMatrix[indexRow - 1][indexCol] = count + 1;
                    }

                    //Если из клетки нельзя сделать шаг ни в одну сторону, то добавляем в массив false
                    if ((doStepR === false) && (doStepL === false) && (doStepD === false) && (doStepU === false)) {
                        arrayForSteps.unshift(false);
                    } else {
                        arrayForSteps.unshift(true);
                    }
                }
                return value;
            });
        });

        matrixStart = newMatrix;

        //Если массив содержит true => есть куда шагать
        //Если includes возвращет false значит больше некуда шагать
        resultForExit = arrayForSteps.includes(true);

        resultForExit ? count += 1 : count;
    }
    console.log(matrixStart);
    return (count);
}

//Запуск приложения
start();

