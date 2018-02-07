const screen = document.getElementById('quest-game');

export default function play(type){

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
       case 'end quest':
           screen.innerHTML = "";
           break;
       default:
           screen.innerHTML = "";
           break;
   }

   screen.appendChild(gameScreen);
}
