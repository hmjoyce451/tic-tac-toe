//factory function that generates players
const CreatePlayer = (name, mark) => {
    return { name, mark };
};

//module that controls game display
const gameBoard = (() => {
    'use strict';
    console.log('this is the gameboard module');

    const displayBoard = document.getElementById('container');
    const text = document.getElementById('text');

    text.innerText = `It's Player 1's move`;
    //create game array
    let gameArray = [];

    //populate DOM grid with array content
    for(let i=0; i < 9; i++) {
        gameArray.push('');
    }

    //loop over array and display in DOM gameboard;
    for(let i=0; i<gameArray.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add('empty');
        cell.innerText = '.';
        displayBoard.appendChild(cell);
    }

    //add event listeners to each cell
    Array.from(displayBoard.children).forEach((cell, index) => {
        cell.addEventListener('click', () => {
            //update array, add mark to DOM, update remaining cells
            gameArray[index] = game.currentPlayer.mark;
            cell.innerText = game.currentPlayer.mark;
            cell.classList.remove('empty');
            game.emptyCells -= 1;

            //return if cell has already been marked
            cell.style.pointerEvents = 'none';



            //check winner
            game.checkWinner();
            if(game.winnerDeclared === true) {
                console.log('Winner');
                displayBoard.style.pointerEvents = 'none';
                text.innerText = `Game Over! ${game.currentPlayer.name} is victorious!`;
            }
            
            game.checkTie();
            console.log(game.isTie)
            if(game.isTie === true) {
                console.log('TIE');
                displayBoard.style.pointerEvents = 'none';
                text.innerText = `Game Over ! It's a tie!`
            }
            console.log(game.emptyCells)
            //switch players
            game.playerSwitch();


        });
    }); 
    
    //return global
    return { gameArray, displayBoard, text };
})();

//module that controls game flow
const game = (() => {
    'use strict';
    console.log('this controls the flow of the game'); 
     //create players
    const playerOne = CreatePlayer('Player 1', 'X');
    const playerTwo = CreatePlayer('Player 2', 'O');

    //establish beginning state
    let currentPlayer = playerOne;
    let emptyCells = 9;
    let winnerDeclared = false;
    let isTie = false;
    
    //switch player function
    function playerSwitch() {
        if(game.currentPlayer == playerOne && game.winnerDeclared === false) {
            game.currentPlayer = playerTwo
            text.innerText = `It's ${game.currentPlayer.name}'s turn.  Make a move!`
        } else if(game.currentPlayer == playerTwo && game.winnerDeclared === false) {
            game.currentPlayer = playerOne;
            text.innerText = `It's ${game.currentPlayer.name}'s turn.  Make a move!`
        } else if(game.winnerDeclared === true) {
            text.innerText = `Game Over! ${game.currentPlayer.name} wins!`;
        }
    }


    //establish winning conditions
    const winningConditions = [
        [0, 1, 2], //winner
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]

    ]

    //check winner function
    function checkWinner() {
        //loop through winningConditions array
        winningConditions.forEach(winner => {
             if(gameBoard.gameArray[winner[0]] === game.currentPlayer.mark && gameBoard.gameArray[winner[1]] === game.currentPlayer.mark && gameBoard.gameArray[winner[2]] === game.currentPlayer.mark) {
                game.winnerDeclared = true;
             }
        });
    }
    function checkTie() {
        if(game.emptyCells === 0 && game.winnerDeclared === false)
        game.isTie = true;
    }

    return { currentPlayer, emptyCells, playerSwitch, winnerDeclared, winningConditions, checkWinner, checkTie, isTie }
})();

const resetBtn = document.getElementById('reset-button');

resetBtn.addEventListener('click', () => {
        window.location.reload();
});