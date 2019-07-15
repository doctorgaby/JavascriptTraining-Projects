/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// variable declarations
var scores, roundScore, activePlayer, gameOn, previousRoll;



// start game
initGame();

    /*
    1. Roll Dice
    2. Display Number
    3. If number 1, pass the turn to the other player and current score becomes 0
    Event listener for the rolling button
    */

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gameOn) {
        // 1. Calculate random number for the dice between 1 and 6.
        var randomDice1 = Math.floor(Math.random() * 6 + 1);
        var randomDice2 = Math.floor(Math.random() * 6 + 1);
        var sumDices = randomDice1 + randomDice2;
        
        // 2. Display the result (dice image)
        var diceDom = document.getElementById('dice-nr-1');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + randomDice1 + '.png';

        var diceDom2 = document.getElementById('dice-nr-2');
        diceDom2.style.display = 'block';
        diceDom2.src = 'dice-' + randomDice2 + '.png';

        // 3. Update the round score if the dice is not 1
        if (randomDice1 == 6 && previousRoll == 6) {
            
            // set score to 0
            scores[activePlayer] = 0;

            // update interface
            document.getElementById('score-' + activePlayer).textContent = '0';
            switchPlayer();
        }
        else if (randomDice1 !== 1 || randomDice2 !== 1) {
            // Save state
            // A player loses the entire score if two six in a row are rolled. 
            
            // save the current score as previous score
            

            // add score
            roundScore += sumDices;
            document.getElementById('current-' + activePlayer).textContent = roundScore;

            // this iteration:
            // save each time the randomDice
            // continue
            //
            //
            //
            //
            //  
        }  else {
            // next player
            switchPlayer();
        }
        // remember to check whether there is collision between Player1 hold with last dice = 6 and Player 2 first dice = 6
        previousRoll = randomDice1;
    }
});

// Event listener for the hold button
document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gameOn) {
        // 1. the current points are saved to the global score
        scores[activePlayer] += roundScore;

        // 2. update the user interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 3. check whether player has won and assign winner
        if (scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner';

            // hide the dice again, as the game is over
            document.getElementById('dice-nr-1').style.display = 'none';
            document.getElementById('dice-nr-2').style.display = 'none';

            // apply another class to the winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            // remove active class from this pannel
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            // finish the game
            gameOn = false;
        } else
            // 4. switch the player
                switchPlayer(); 
        }
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

    // make the dices invisible again
    document.getElementById('dice-nr-1').style.display = 'none';
    document.getElementById('dice-nr-2').style.display = 'none';

    // document.querySelector('.player-0-panel').classList.remove('active');
    // // add the active class to opponent
    // document.querySelector('.player-1-panel').classList.add('active');

}

// NewGame Button Implementation
document.querySelector('.btn-new').addEventListener('click', initGame);

function initGame() {

    // set max points to reach for the game
    if (document.querySelector('.max-points').textContent == null)
    console.log("field empty");

    // main score array for both players
    scores = [0, 0];
    // round score
    roundScore = 0;

    //this variable will be zero for player 1, and one for player 2
    activePlayer = 0;

    gameOn = true;

    //change css properties of an html element
    document.getElementById('dice-nr-1').style.display = 'none';
    document.getElementById('dice-nr-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // set the names of the players: --> possible editing with user inserting their own names on click
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // make sure the active class is removed from both panels
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // re-add the active class to Player 1
    document.querySelector('.player-0-panel').classList.add('active');
}

// remove listener from roll-btn so that they have to start a new game, instead of continuing
document.querySelector('.btn-roll').removeEventListener('click', null);

//document.querySelector('#current-' + activePlayer).innerHTML = 'em' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

//select the id element and change the text. 
//document.querySelector('#current-' + activePlayer).textContent = randomDice;