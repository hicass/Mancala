/*----- constants -----*/
// 1. Define required constants
// 1.1 The Players and their info
const PLAYERS = {
    '1': '/graphics/sun.PNG',
    '-1': '/graphics/moon.PNG'
}

class Pit {
    constructor(pitIdx, pebbles, pitType) {
        this.pitIdx = pitIdx;
        this.pebbles = pebbles;
        this.pitType = pitType;
    }
}

/*----- state variables -----*/
// 2. Define the variables that are used to track the game
// 2.1 The board holes 
let board;
// 2.4 The players hand
let playerHand; 
// 2.5 A winner (Player 1, 2, or Tie)
let winner;
// 2.6 Who's turn it is
let turn;

/*----- cached elements  -----*/
// 3. Store page Els that will be used multiple times:
// 3.1 The 12 main holes on the board
const boardEls = [...document.querySelectorAll('#board > div')];
// 3.2 The 'hand' element that shows how many pebbles are in whatever
// pit the mouse is hovering over
const handEl = document.querySelector('#hand');
// 3.3 The element that displays who's turn it is/ win results
const messageEl = document.querySelector('h1')
// 3.4 The play again button
const btn = document.querySelector('button')
// 3.5 The pebbles ???

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', playerSelects)
document.querySelector('button').addEventListener('click', init)

/*----- functions -----*/
// 4. Initialize the state variables
init();
// 4.1 Initialize the state variables:
function init() {
    // 4.1.1 The game starts with empty home bases
    // 4.1.2 The game starts with each main hole having 4 pebbles
    board = [
    new Pit('p0', 0, 'store-1'),
    new Pit('p1', 4, 'm1'),
    new Pit('p2', 4, 'm1'),
    new Pit('p3', 4, 'm1'),
    new Pit('p4', 4, 'm1'),
    new Pit('p5', 4, 'm1'),
    new Pit('p6', 4, 'm1'),
    new Pit('p7', 0, 'store1'),
    new Pit('p8', 4, 'm-1'),
    new Pit('p9', 4, 'm-1'),
    new Pit('p10', 4, 'm-1'),
    new Pit('p11', 4, 'm-1'),
    new Pit('p12', 4, 'm-1'),
    new Pit('p13', 4, 'm-1'),
]
    // 4.1.3 The game starts with player 1
    turn = 1;
    // 4.1.4 The winner is null
    winner = null;
    // 4.1.5 The players hand is empty
    hand = 0;
    // 4.2 Render the state variables to page:
    render();
}

function render() {
    renderBoard();
    renderMessage();
    renderHand();
}

// 4.2.1 Render the board:
function renderBoard() {
    // 4.2.1.1 Loop over the board array, and for each iteration:
    board.forEach((pit, idx) => {
        // 4.2.1.2 Get the HTML div with the corresponding ID to the current Pit object
        const pitEl = document.getElementById(pit.pitIdx);
        // 4.2.1.3 Use the pebbles property to display according amount of pebbles
        pitEl.innerText = pit.pebbles
    });
}

function renderHand() {
    // Updating the hand element text to match data
    handEl.innerText = hand;
}

// 4.2.2. Render the message:
function renderMessage() {
    // 4.2.2.1 If winner is null, render who's turn it is
    if (winner === null) {
        messageEl.innerText = `Player ${turn}'s turn...`
    }
    // 4.2.2.2 If winner is 'T', render a tie message
    if (winner === 'T') {
        messageEl.innerText = `It's a tie!`
    }
    // 4.2.2.3 If winner is not null, render congrats msg
    if (winner === 1 || winner === -1) {
        messageEl.innerText = `Congrats! Player ${winner} wins!`
    }
    // 4.3 Wait for user to click a hole
}

// 5. Handle a player clicking a hole
function playerSelects(pitElClicked) {
    const pitElId = pitElClicked.target.id; // Finding the id of the Pit ELement that was clicked
    const pitObject = board.find((pit) => pit.pitIdx === pitElId); // Finding the corresponding pit in the Board array that has the same ID
    if (pitElId === 'board') return; // Return if it wasn't a Pit Element that was clicked
    if (!pitObject.pitType.includes(`m${turn}`)) return; // Return if what was clicked isn't on the players side.
    // 5.1 Players hand gets updated with the amount of pebbles in the Pit
    hand = pitObject.pebbles;
    // 5.2 Updating the amount of pebbles to 0
    pitObject.pebbles = 0;
    dropPebbles(hand, pitObject);
    render();
}

function dropPebbles(hand, pit) {
    console.log(pit)
    checkForWinner();
    // 5.2 Player deposits one of the pebbles in each hole going counter clock- 
    // wise, until the hand is 0
}

// 5.2.1 If it's their opponents hole, it gets skipped
// 5.2.2 If it's their own hole, they place a pebble in it
// for (i = hand; i > 0; i--) {
//     console.log(i)
//     console.log('idx', idx)
//     console.log('hand:', hand)
//     if (idx === 0) {
//         idx = 8
//         // board[idx]++
//         // hand--
//         console.log('idx === 0')
//     }
//     if (idx === 13) {
//         idx = 7
//         board[idx]++
//         idx = 6
//         console.log('idx === 13')
//     }
//     if (idx >= 7) {
//         idx++
//         board[idx]++
//         hand--
//         console.log('idx > 7')
//     }
//     if (idx < 8) {
//         idx--
//         board[idx]++
//         hand--
//         console.log('idx < 8')
//     }
// }
     // 5.2.2.1 If it's their last pebble being placed into their own hole
     // they play again
   // 5.2.3 If the last piece is dropped in an empty hole on the players side
   // they get to take the pebbles on the opposing side if any
 // 5.3 Check for a winner

// 6. Checking for a winner:
function checkForWinner() {
    if (winner === null) {
        turn *= -1;
    }
}
 // 6.1 Check if six pockets on one side are empty:
  // 6.1.1 If yes the other players takes whatever pebbles are left on
  // their side
 // 6.2 Check which player has the most pebbles
  // 6.2.1 Winner gets updated to the player with the most pebbles
  // 6.2.2 If player have equal amounts winner gets set to tie
// 6.3 Render the updated state

// 7. Handle player clicking replay button:
  // 7.1 Step 4 and 4.2