/* Variables */
var scores, roundScore, activePlayer, gamePlaying;

function initialization () {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    diceScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    /*Reset the Scores and Player Names */
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    /* Remove active class and Winner */
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
initialization ();

 document.querySelector('.btn-new').addEventListener('click', initialization);
 document.querySelector('.btn-roll').addEventListener('click', function () {

     // 1. Check if game is playing or not.
     if (gamePlaying) {    

     // 2. Generate two random numbers and store them in variables
     var dice1 = Math.floor (Math.random() * 6) + 1 ;
     var dice2 = Math.floor (Math.random() * 6) + 1 ;

     // 3. Display the result on the page.
     document.getElementById('dice-1').style.display = 'block';
     document.getElementById('dice-2').style.display = 'block';
     document.getElementById('dice-1').src = 'images/dice-'+dice1+'.png';
     document.getElementById('dice-2').src = 'images/dice-'+dice2+'.png';

     // 4. Update the score Oof dice values            
         diceScore = dice1 +dice2;
         document.querySelector('#score-'+activePlayer).textContent = diceScore;
         
         roundScore = roundScore + dice1 +dice2;
         document.querySelector('#current-'+activePlayer).textContent = roundScore;
     }

 });
 
 function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
 }

 document.querySelector('.btn-hold').addEventListener('click', function () {
     if (gamePlaying){
         scores[activePlayer] += roundScore;

         //Update the UI
         document.querySelector('#current-'+ activePlayer).textContent = scores[activePlayer];

         var input = document.querySelector('.final-score').value;
         var winningScore;

         if (input) {
             winningScore = input;
         } 
         else {
             winningScore = 25;
         }

         //Check if the player has won the game or not.
         if (scores[activePlayer] >= winningScore) {
             document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
             document.getElementById('dice-1').style.display = 'none';
             document.getElementById('dice-2').style.display = 'none';

             document.querySelector('.player-'+activePlayer+ '-panel').classList.add ('winner');
             document.querySelector('.player-'+activePlayer+ '-panel').classList.remove ('active');
             gamePlaying = false;
         }
         else {
             nextPlayer ();
         }
     }
 });