/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// variable declarations
var scores, roundScore, activePlayer;
// start game
initGame();

// Event listener for the hold button
document.querySelector('.btn-hold').addEventListener('click', function() {

    // 1. the current points are saved to the global score
    scores[activePlayer] += roundScore;

    // 2. update the user interface
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // 3. check whether player has won and assign winner
    if (scores[activePlayer] >= 20) {
        document.getElementById('name-' + activePlayer).textContent = 'Winner';

        // hide the dice again, as the game is over
        document.querySelector('.dice').style.display = ('none');

        // apply another class to the winner
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

        // remove active class from this pannel
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
    // 4. switch the player
        switchPlayer();
    } 
});

// Event listener for the rolling button
document.querySelector('.btn-roll').addEventListener('click', function() {
    
    // 1. Calculate random number for the dice between 1 and 6.
    var randomDice = Math.floor(Math.random() * 6 + 1);

    // 2. Display the result (dice image)
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + randomDice + '.png';

    // 3. Update the round score if the dice is not 1

    if (randomDice !== 1) {
        // add score
        roundScore += randomDice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        // next player
        switchPlayer();
    }
    /*
    
    1. Roll Dice
    2. Display Number
    3. If number 1, pass the turn to the other player and current score becomes 0

    */
});

function switchPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 

    //reset to 0 the round
    roundScore = 0;

    //update interface
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // toggle the active class from one player to another
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // make the dice invisible again
    document.querySelector('.dice').style.display = 'none';

    // document.querySelector('.player-0-panel').classList.remove('active');
    // // add the active class to opponent
    // document.querySelector('.player-1-panel').classList.add('active');

}

// NewGame Button Implementation
document.querySelector('.btn-new').addEventListener('click', initGame);

function initGame() {
    //main score array for both players
    scores = [0, 0];
    // round score
    roundScore = 0;

    //this variable will be zero for player 1, and one for player 2
    activePlayer = 0;

    //change css properties of an html element
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
}

//document.querySelector('#current-' + activePlayer).innerHTML = 'em' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

//select the id element and change the text. 
//document.querySelector('#current-' + activePlayer).textContent = randomDice;