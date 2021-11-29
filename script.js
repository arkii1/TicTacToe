const gridElements = document.getElementsByClassName('grid-element');

const button0 = document.getElementById('0');
const button1 = document.getElementById('1');
const button2 = document.getElementById('2');
const button3 = document.getElementById('3');
const button4 = document.getElementById('4');
const button5 = document.getElementById('5');
const button6 = document.getElementById('6');
const button7 = document.getElementById('7');
const button8 = document.getElementById('8');

const heading = document.getElementById('heading');
const resetButton = document.getElementById('reset');

// Class by name on click call back isn't working for some reason so assigning individually for now
button0.onclick = () => gameManager.onGridButtonClick(0);
button1.onclick = () => gameManager.onGridButtonClick(1);
button2.onclick = () => gameManager.onGridButtonClick(2);
button3.onclick = () => gameManager.onGridButtonClick(3);
button4.onclick = () => gameManager.onGridButtonClick(4);
button5.onclick = () => gameManager.onGridButtonClick(5);
button6.onclick = () => gameManager.onGridButtonClick(6);
button7.onclick = () => gameManager.onGridButtonClick(7);
button8.onclick = () => gameManager.onGridButtonClick(8);

resetButton.onclick = () => gameManager.resetGame();

const gameManager = (() => {
    
    let turn = 'X'; 
    let gameEnded = false;
    let turnCounter = 1;
    const changeTurn = () => { 
        turn = turn == 'X' ? 'O' : 'X'; 
        turnCounter++;
    }
    const checkForDiagonalWin = (board) => {
        const diag1 = [board.getField(0), board.getField(4), board.getField(8)];
        const diag2 = [board.getField(2), board.getField(4), board.getField(6)];

        if(diag1.every(field => field == 'X') || diag1.every(field => field == 'O'))
            return true;

        if(diag2.every(field => field == 'X') || diag2.every(field => field == 'O'))
            return true;

        return false;
    }
    const checkForRowWin = (board) => {
        for (let x = 0; x < 3; x++) {
            let row = [];
            for (let y = 0; y < 3; y++){
                row.push(board.getField( (x * 3) + y ));
            }
            if(row.every(field => field == 'X') || row.every(field => field == 'O'))
                return true;            
        }

        return false;
    }
    const checkForColumnWin = (board) => {
        for (let x = 0; x < 3; x++) {
            let column = [];
            for (let y = x; y <= x + 6; y+=3) { // don't like the y+= 3 or x+6. Maybe rework this part?
                column.push(board.getField(y));
            }

            if(column.every(field => field == 'X') || column.every(field => field == 'O'))
                return true;
        }
        return false;
    }
    const onGridButtonClick = (index) => {
        if(gameEnded || gameBoard.valueAlreadyAssigned(index))
            return;
        gameBoard.assignValue(index, turn); 
        updateUI();
    
        if(checkWin(gameBoard)) {
            endGame('');
        } else if (turnCounter == 9) {
            endGame('DRAW');
        }
        else {
            changeTurn();
        }
    }
    const updateUI = () => {
        for (i = 0; i < gridElements.length; i++) {
            gridElements[i].innerHTML = gameBoard.getField(i) === undefined ? 
                                        "" :
                                        gameBoard.getField(i);
        }
        var t = turn == 'X' ? 'O' : 'X';
        heading.innerHTML = "Player " + t + "'s turn!";
    }
    const checkWin = (board) => {
        if(checkForColumnWin(board) || checkForRowWin(board) || checkForDiagonalWin(board))
            return true;

        return false;
    }
    const endGame = (result) => {
        if(result != 'DRAW'){
            heading.innerHTML = "Player " + turn + " won!"
        }
        else
            heading.innerHTML = "You drew!";

        gameEnded = true;
    }
    const resetGame = () => {
        gameBoard.clearBoard();
        turn = 'X';
        turnCounter = 1;
        gameEnded = false;
        updateUI();
    }

    return {
        onGridButtonClick,
        resetGame,
    };

})();

const gameBoard = (() => {
    let array = new Array(9);

    const assignValue = (i, value) => {
        array[i] = value;
    }

    const getField = (index) => {
        return array[index];
    }

    const valueAlreadyAssigned = (index) => {
        return getField(index) !== undefined;
    }

    const clearBoard = () =>
    {
        array = new Array(9);
    }

    return {
        array,
        assignValue,
        getField,
        valueAlreadyAssigned,
        clearBoard,
    };
})();