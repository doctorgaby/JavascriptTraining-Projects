/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
    A Player loses round and total score and PASSES THE TURN if:
        - two sixes are rolled in the same round or,
        - two ones occur in the same round
    A Player loses current round and CONTINUES if:
        - one of the dices is one and a previous is 1: two consecutive 1
        - one of the dices is 6 and a previous is also 6: two consecutive 6
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game, if not set otherwise at the beginning or during the game in the input field

*/

// variable declarations
var scores, roundScore, activePlayer, gameOn;

// start game
initGame();

var previousRolls = [0, 0];

    /*
    0. Get the final score players have to reach
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
        document.getElementById('dice-nr-1').style.display = 'block';
        document.getElementById('dice-nr-1').src = 'dice-' + randomDice1 + '.png';

        document.getElementById('dice-nr-2').style.display = 'block';
        document.getElementById('dice-nr-2').src = 'dice-' + randomDice2 + '.png';        
        
// ------------------------------------------------------------------------------------
        
        // 1. A player loses the round score if two consecutive six in a row are rolled. 
        if ((randomDice1 === 6 || randomDice2 === 6) && previousRolls.includes(6)) {
            roundScore = 0;
            document.getElementById('current-' + activePlayer).textContent = 0;
            console.log('Two consecutive 6');
        }

        // 2. A player loses the round score if two consecutive six in a row are rolled. 
        else if ((randomDice1 === 1 || randomDice2 === 1) && previousRolls.includes(1)) {
            roundScore = 0;
            document.getElementById('current-' + activePlayer).textContent = 0;
            console.log('Two consecutive 1');
        }

        // 3. Two sixes in the same round --> lose total score and pass the turn
        else if (randomDice1 === 6 && randomDice2 === 6) {
            scores[activePlayer] = 0; 
            document.querySelector('#score-' + activePlayer).textContent = 0;
            switchPlayer();
            console.log('Player switched because of two 6');
        }

        // 4. Two ones in the same round --> lose total score and pass the turn
        else if (randomDice1 === 1 && randomDice2 === 1) {
            scores[activePlayer] = 0; 
            document.querySelector('#score-' + activePlayer).textContent = 0;
            switchPlayer();
            console.log('Player switched because of two 1');
        }

        // Update the round score if the dice is not 1
        else if (randomDice1 !== 1 || randomDice2 !==1 ) {    
            // add score
            roundScore += sumDices;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        else {
            // next player
            switchPlayer();
        }
        // remember to check whether there is collision between Player1 hold with last dice = 6 and Player 2 first dice = 6 

        // save the current score as previous score
        previousRolls[0] = randomDice1;
        previousRolls[1] = randomDice2;
    }
});

// Event listener for the hold button
document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gameOn) {

        // 1. the current points are saved to the global score
        scores[activePlayer] += roundScore;

        // 2. update the user interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 3. get the value from input
        input = document.getElementById('playUntill').value;
        
        
        // variable holding the input value, otherwise it is set to 100
        var playUntill;

        if (input) {
            playUntill = input;
        } else {
            playUntill = 100;
            console.log('No input, therefore we start at 100');
        }

        console.log('The game will play untill ' + playUntill);  

        // 4. check whether player has won and assign winner
        if (scores[activePlayer] >= playUntill) {
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
            // 5. switch the player
                switchPlayer(); 
        }
});

function switchPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 

    //reset the roundScore to 0
    roundScore = 0;

    // 0. Reset previousRolls to 0;
    //previousRolls[0] = 0;
    // previousRolls[1] = 0;
    
    //update interface
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // toggle the active class from one player to another
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // make the dices invisible again
    document.getElementById('dice-nr-1').style.display = 'none';
    document.getElementById('dice-nr-2').style.display = 'none';
}

// NewGame Button Implementation
document.querySelector('.btn-new').addEventListener('click', initGame);

function initGame() {

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