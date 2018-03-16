const screen = document.getElementById('quest-game');

export default function play(type){

   // screen.classList.add('show');
   const gameScreen = document.createElement('iframe');
   gameScreen.className = 'game-screen';
   screen.classList.add('show');
   switch(type) {
       case 1:
           screen.innerHTML = "";
           gameScreen.src = '/colormatch';
           break;
       case 2:
           screen.innerHTML = "";
           gameScreen.src = '/swiftwrite';
           break;
       case 3:
           screen.innerHTML = "";
           gameScreen.src = '/wordmatch';
           break;
       case 'end quest':
           screen.innerHTML = "";
           document.querySelector('#questTimerMenu').classList.remove('show'); 
           return;
       default:
           screen.innerHTML = "";
           break;
   }

   screen.appendChild(gameScreen);
}
