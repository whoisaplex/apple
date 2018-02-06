
window.addEventListener('click', function(e) {

    if(e.target.classList.contains('buttonz')) {
        console.log(e.target.id + " + " + e.currentTarget);
        if (e.target !== e.currentTarget) {
            var myClass = document.getElementsByClassName('buttonz');
            for (i=0; i< myClass.length; i++) {
                myClass[i].classList.add('hide');
            }
    
            var script = document.createElement("script");
        
            var styleSheet = document.createElement("link");
            styleSheet.rel = "stylesheet";
            styleSheet.type = "text/css";
            
            if(e.target.id == 'wordMatchBtn') {
                script.src = "js-game-wordmatch.js";
                script.id = "id-wordmatch"
                styleSheet.href = "css-game-wordmatch.css";
            } 
            else if (e.target.id == 'swiftWriteBtn') {
                script.src = "js-game-swiftwrite.js";
                script.id = "id-swiftwrite"
                styleSheet.href = "css-game-swiftwrite.css";
            }
            else if (e.target.id == 'colorMatchBtn') {
                script.src = "js-game-colormatch.js";
                script.id = "id-colormatch"
                styleSheet.href = "css-game-colormatch.css";
            }
            else {
                throw new Error("No button was selected");
            }
    
            document.body.appendChild(script);
            document.head.appendChild(styleSheet);
        }
        e.stopPropagation();
        
    }
    else if(e.target.classList.contains('iframeBtn')) {

        var oneToThree = Math.floor((Math.random() * 3) + 1);
        console.log(oneToThree);

        var myClass = document.getElementsByClassName('buttonz');
        for (i=0; i< myClass.length; i++) {
            myClass[i].classList.add('hide');
        }
        var class2 = document.getElementsByClassName('iframeBtn');
        for (i=0; i< class2.length; i++) {
            class2[i].classList.add('hide');
        }

        var aniframe = document.createElement('iframe');
        aniframe.id = 'iframeID';

        if(oneToThree == 1){
            aniframe.src = 'game-wordmatch.html';
        }
        else if(oneToThree == 2){
            aniframe.src = 'game-swiftwrite.html';
        }
        else {
            aniframe.src = 'game-colormatch.html';
        }

        document.body.appendChild(aniframe);

/*         var script = document.createElement("script");
        script.src = "js-game-wordmatch.js";
        script.id = "id-wordmatch"
        document.getElementById('iframeID').appendChild(script);

        var styleSheet = document.createElement("link");
        styleSheet.rel = "stylesheet";
        styleSheet.type = "text/css";
        styleSheet.href = "css-game-wordmatch.css";
        document.getElementById('iframeID').appendChild(styleSheet); */
    }

    else {
        throw new Error("No button was selected");
    }
}, false);
/* 
var showiframe = document.getElementById('iframeBtn');
showiframe.addEventListener('click', function() {
    
    var aniframe = document.createElement('iframe');
    aniframe.src = 'js-game-wordmatch.js';
    aniframe.id = 'iframeID';
    document.body
    
}); */
