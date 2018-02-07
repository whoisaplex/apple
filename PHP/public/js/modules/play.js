const screen = document.getElementById('quest-game');

export default function play(type){

   // screen.classList.add('show'); 
   const gameScreen = document.createElement('iframe');
   gameScreen.className = 'game-screen';

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
       default:
           screen.innerHTML = "";
           break;
   }

   screen.appendChild(gameScreen);
}
