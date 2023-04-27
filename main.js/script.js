/*----- constants -----*/
class Player {
    constructor(playerIcon, iconAlt){
        this.playerIcon = playerIcon;
        this.iconAlt = iconAlt; 
    }
}

class Pit {
    constructor(pitId, pebbles, pitSide, pitPair) {
        this.pitId = pitId; 
        this.pebbles = pebbles; 
        this.pitSide = pitSide; 
        this.pitPair = pitPair;
    }
}

const PLAYERS = {
    '1': new Player('assets/smiley.png', 'smiley face'), 
    '-1': new Player('assets/cute.png', 'kiss face') 
}

/*----- state variables -----*/
let board; 
let hand;  
let winner;
let turn;

/*----- cached elements  -----*/
const boardEls = [...document.querySelectorAll('#board > div')]; 
const handEl = document.querySelector('#hand'); 
const messageEl = document.querySelector('h1');
const btn = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', playerClicks);
document.getElementById('board').addEventListener('mouseover', handHover);
document.querySelector('button').addEventListener('click', init);

/*----- functions -----*/
init(); 

function init() {
    // Create a board array using the Pit class, with each pit starting with 4 pebbles
    board = [
        new Pit('p0', 0, 'store-1'),
        new Pit('p1', 1, 'm1', 'a'),
        new Pit('p2', 0, 'm1', 'b'),
        new Pit('p3', 1, 'm1', 'c'),
        new Pit('p4', 0, 'm1', 'd'),
        new Pit('p5', 0, 'm1', 'e'),
        new Pit('p6', 0, 'm1', 'f'),
        new Pit('p7', 0, 'store1'),
        new Pit('p8', 0, 'm-1', 'f'),
        new Pit('p9', 1, 'm-1', 'e'),
        new Pit('p10', 2, 'm-1', 'd'),
        new Pit('p11', 2, 'm-1', 'c'),
        new Pit('p12', 1, 'm-1', 'b'),
        new Pit('p13', 0, 'm-1', 'a')
    ]
    turn = 1; 
    winner = null; 
    hand = 0; 
    render(); 
}

/*----- initialized constants -----*/

function render() {
    renderBoard(); 
    renderMessage(); 
}

function renderBoard() {
    board.forEach((pit, idx) => {
        // Get the document div that has the matching id to the current pit item
        const pitEl = document.getElementById(pit.pitId);
        // If the pit is on the players side give it the available class
        if (pit.pitSide === `m${turn}`) { 
            pitEl.setAttribute('class', 'available')
        } 
        // If the pit is not on the players side, if theres a winner, or if theres
        // no pebbles in the pit, remove the available class.
        if (pit.pitSide !== `m${turn}` || winner !== null || pit.pebbles === 0) {
            pitEl.removeAttribute('class', 'available')
        }
        pitEl.innerText = pit.pebbles
    });
    btn.style.visibility = winner ? 'visible': 'hidden'; 
}

function renderMessage() {
    if (winner === null) {
        messageEl.innerHTML = `<h1><img src='${PLAYERS[turn].playerIcon}' alt='${PLAYERS[turn].iconAlt}' id='playerIcon'/>'s turn...</h1>`
    }
    if (winner === 1 || winner === -1) {
        messageEl.innerHTML = `<h1><img src='${PLAYERS[turn].playerIcon}' alt='${PLAYERS[turn].iconAlt}' id='playerIcon'/> wins!!!</h1>`
    }
    if (winner === 'T') {
        messageEl.innerText = `It's a tie!`
    }
}

function playerClicks(pitElClicked) {
    const pitElId = pitElClicked.target.id; 
    const pitInArr = board.find((pit) => pit.pitId === pitElId); 
    if (pitElId === 'board') return; 
    if (!pitInArr.pitSide.includes(`m${turn}`)) return; // If the pit wasn't on the players side return
    if (pitInArr.pebbles === 0) return;
    hand = pitInArr.pebbles; // The pebbles in the pit get picked up by the hand
    pitInArr.pebbles = 0; // Pit now has no pebbles
    dropPebbles(hand, pitInArr);
    render();
}

// Preview how many pebbles are in each pit
function handHover(pitElOver) {
    const pitElId = pitElOver.target.id;
    const pitInArr = board.find((pit) => pit.pitId === pitElId); 
    if (pitElId === 'board' || winner !== null) {
        handEl.style.visibility = 'hidden';
        return;
    }
    handEl.style.visibility = 'visible';
    handEl.innerText = pitInArr.pebbles;
}

function dropPebbles(hand, pit) {
    let pitArrIdx = board.indexOf(pit);
    // Deposit one of the pebbles in each pit going counter clockwise until the hand is 0
    for (let i = hand; i > 0; i--) {
        // If it's the opposing players store it get's skipped
        if (board[pitArrIdx].pitSide === `store${turn * -1}`) {
            --board[pitArrIdx].pebbles; 
            pitArrIdx++;
            ++hand;
            console.log('skipped opponents store')
        } 
        // Player gets another turn if the last pebble is placed in their own store
        if (i === 1 && board[pitArrIdx].pitSide === `store${turn}`) {
            turn *= -1;
            console.log('turned changed')
        }
        if (pitArrIdx === 13) { 
            pitArrIdx = 0;
            ++board[pitArrIdx].pebbles;
            console.log('looped to 0')
        } 
        else {
            ++pitArrIdx;
            ++board[pitArrIdx].pebbles;
            hand--;
            console.log('else was hit')
        }
        // If the last pebble is dropped in an empty pit on the players side
        // the pebbles on the pairing pit on the opponents side gets added to the players store
        // Loop the index number back to 0 when it hits 13
        if (i === 1 && (board[pitArrIdx].pitSide === `m${turn}` && board[pitArrIdx].pebbles === 0)) {
            console.log('if pit 0 hit')
            pitArrIdx++
            ++board[pitArrIdx].pebbles;
            const pairLetter = board[pitArrIdx].pitPair;
            const pair = board.filter((pit) => pit.pitPair === pairLetter);
            const pairPebbles = pair.reduce((total, currentVal) => total + currentVal.pebbles, 0);
            const playerStore = board.find((pit) => pit.pitSide === `store${turn}`)
            if (pairPebbles > 1) {
                playerStore.pebbles += pairPebbles;
                pair.forEach((pit) => pit.pebbles = 0);
                console.log('if pit 0 works')
            }
        } 
    }
    checkForWinner();
}

function checkForWinner() {
    const rightStore = board.find((pit) => pit.pitSide === 'store-1'); 
    const leftStore = board.find((pit) => pit.pitSide === 'store1');
    const allPits = board.filter((pit) => pit.pitSide === 'm1' || pit.pitSide === 'm-1');
    function getRowSum(rowType) {
        let total;
        const row = board.filter((pit) => pit.pitSide === rowType);
        total = row.reduce((total, currentVal) => total + currentVal.pebbles, 0);
        return total;
    }
    const topTotal = getRowSum('m1');
    const botTotal = getRowSum('m-1');
    // If six pits on one side are empty the remaining pebbles on the
    // other side get added to that players store
    if (topTotal === 0 || botTotal === 0) {
        leftStore.pebbles += topTotal;
        rightStore.pebbles += botTotal;
        allPits.forEach((pit) => pit.pebbles = 0)
        hand = null;
        countWinner(leftStore.pebbles, rightStore.pebbles);
    }
    if (winner === null) {
        turn *= -1;
    }
}

function countWinner(leftStore, rightStore) {
    if (leftStore > rightStore) {
        winner = 1;
    }
    if (leftStore < rightStore) {
        winner = -1;
    }
    if (leftStore === rightStore) {
        winner = 'T'
    }
}
