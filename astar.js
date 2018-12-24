/* Обозначения: "." - есть проход,
                "#" - нет прохода,
                1, 2, 3... - шаг
*/

let start = () => {
    let rowNum = Math.floor(Math.random() *10);
    let colNum = Math.floor(Math.random() *10);
    let matrixStart = getField(rowNum, colNum);

    console.log(matrixStart);
}

let getField = (rowNum, colNum) => {
    let matrixStart = [];
    for (let i = 0; i < rowNum; i++) {
        matrixStart[i] = [];
        for (let j = 0; j < colNum; j++) {
            let num = Math.round(Math.random());
            if ( (i == 0 && j == 0) || (i == rowNum-1 && j == colNum-1)){
                num = ".";
            } else if (num === 0){
                num = "."
            } else {
                num = "#"
            } 
            matrixStart[i][j] = num;
        }
    }
    return matrixStart;

}




start();

