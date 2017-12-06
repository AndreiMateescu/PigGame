/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores;
var roundScore;
var activePlayer;
var gamePlaying;
var lastDice;

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById("score-for-win").disabled = false;
}

function nextPlayer(){
    if (activePlayer === 0){
            activePlayer = 1;
        }else{
            activePlayer = 0;
        }
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; //italic text
//var x = document.querySelector('#score-' + activePlayer).textContent;
//console.log(x);

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gamePlaying){
        
        document.getElementById("score-for-win").disabled = true; 
        
        var dice = Math.floor(Math.random() * 6) + 1;
    
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        if (dice === 6 && lastDice === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        
        if (dice !== 1) {

            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            nextPlayer();
        }
        
        lastDice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if (gamePlaying){
        
        document.getElementById("score-for-win").disabled = true; 
        
        scores[activePlayer] = scores[activePlayer] + roundScore;
    
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        var scoreForWin = document.getElementById("score-for-win").selectedIndex;
        if (scores[activePlayer] >= document.getElementsByTagName("option")[scoreForWin].value){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);


