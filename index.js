const gameCells = document.querySelectorAll('.cell');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const restartBtn =document.querySelector('.restart');
const alertBox =document.querySelector('.alertBox');

// making variables
let currentPlayer = 'X';
let nextPlayer = 'O'
let playerTurn = currentPlayer;

player1.textContent=`Player 1: ${currentPlayer}`;
player2.textContent=`Player 2: ${nextPlayer}`

// Function to start game
const startGame = () => {
    gameCells.forEach(cell => {
          cell.addEventListener('click', handleClick);
    });
}

const handleClick = (e) => {
  if(e.target.textContent === ''){
    e.target.textContent = playerTurn;
    if(checkWin()){
      // console.log(playerTurn+" is a winner");
      showAlert(`${playerTurn} is a winner!`)
      disableCells();
    }
    else if(checkTie()){
      // console.log(`It's a tie!`);
      showAlert(`Its a Tie!`)
      disableCells();
    }
    else{
      showAlert(`Turn for player: ${playerTurn}`);
      changePlayerTurn();
    }}

}
// function to change player's turn
const changePlayerTurn=() =>{
// using if-else

    // if(playerTurn === currentPlayer){
    //     playerTurn=nextPlayer;
    // }
    // else{
    //     playerTurn=currentPlayer;
    // }
    
//    using ternary operator

playerTurn = playerTurn===currentPlayer ? nextPlayer : currentPlayer;
}

// function to check win

const checkWin= ()=>{
    const winningConditions=
    [
       [0,1,2],
       [3,4,5],
       [6,7,8],
       [0,3,6],
       [1,4,7],
       [2,5,8],
       [0,4,8],
       [2,4,6],
    ];
    for (let i=0; i < winningConditions.length; i++){
      const [pos1, pos2, pos3] = winningConditions[i];
      if(gameCells[pos1].textContent !== '' &&
        gameCells[pos1].textContent === gameCells[pos2].textContent && gameCells[pos2].textContent === gameCells[pos3].textContent) {
       return true;
      }
    }
    return false;
}

// function to check tie
const checkTie = () =>{
let emptyCellsCount = 0;
gameCells.forEach(cell => {
  if(cell.textContent ==='') {
    emptyCellsCount++;
  }
});
// gameCells.forEach(function(cell){
//   if(cell.textContent === ''){
//     emptyCellsCount++;
//   }
// });

return emptyCellsCount === 0 && !checkWin();
}
// functionto disable game cells after a win or tie
const disableCells = () =>{
  gameCells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
    cell.classList.add('disabled');
  })
}
// function to restart game
const restartGame = () => {
   gameCells.forEach(cell => {
    cell.textContent='';
    cell.classList.remove('disabled');
   })
   startGame;
}
 
// function to show alert
const showAlert = (msg) =>{
  
  alertBox.textContent = msg;
  alertBox.style.display = "block";
  setTimeout(() =>{
    alertBox.style.display = "none"
  }, 3000)
}
// add event Listener to restart game
restartBtn.addEventListener('click', restartGame);

// calling start gane function
startGame();


