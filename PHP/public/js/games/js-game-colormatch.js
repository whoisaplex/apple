var myVars = ["red", "blue", "green", "gray", "purple", "lightgreen", "yellow", "violet"];

var first;
var second;

//createHTML();
shuffleArray(myVars);
createTable(myVars);
addNewListeners();
shuffleArray(myVars);
createTable(myVars);

function createHTML() {
    var createdHeaderDiv = document.createElement('div');
    createdHeaderDiv.id = 'headerText';
    document.body.appendChild(createdHeaderDiv);

    var createdHeaderDivH1 = document.createElement('h1');
    var createdHeaderDivP = document.createElement('p');
    createdHeaderDivH1.innerHTML = "Memory";
    createdHeaderDivP.innerHTML = "Hack the bits.";
    document.getElementById('headerText').appendChild(createdHeaderDivH1);
    document.getElementById('headerText').appendChild(createdHeaderDivP);

    var createDivPrintVars = document.createElement('div');
    createDivPrintVars.id = 'printVars';
    document.body.appendChild(createDivPrintVars);

    var createFlexContainer = document.createElement('div');
    createFlexContainer.id = 'flexContainer';
    document.body.appendChild(createFlexContainer);

    var restartBtn = document.createElement('button');
    restartBtn.id = 'restart';
    restartBtn.disabled = true;
    restartBtn.innerHTML = 'Restart';
    document.getElementById('flexContainer').appendChild(restartBtn);

    var checkoutBtn = document.createElement('button');
    checkoutBtn.id = 'checkout';
    checkoutBtn.disabled = true;
    checkoutBtn.innerHTML = 'Checkout';
    document.getElementById('flexContainer').appendChild(checkoutBtn);

    var printResultDiv = document.createElement('div');
    printResultDiv.id = 'printResult';
    document.body.appendChild(printResultDiv);
};

function createTable(list) {
    for (var i = 0; i<(list.length); i++) {
        var newBtn = document.createElement('button');
        newBtn.className = 'newBtn include';
        document.getElementById('printVars').appendChild(newBtn);
        newBtn.dataset.color = list[i];
    }
};

function addNewListeners () {
    document.getElementById('printVars').addEventListener('click', function(e) {
        if(e.target.classList.contains('newBtn')) {
          questClickFunction(e.target);
        }
      }, false);
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

function questClickFunction(param) {
    var allBtns = document.getElementsByClassName('newBtn');

    if (first == null) {
        first = param;
        param.style.backgroundColor = param.dataset.color;
        first.disabled = true;
    }
    else if (second == null) {
        second = param;
        param.style.backgroundColor = param.dataset.color;

        if (first.dataset.color == second.dataset.color) {
            first.classList.remove('include');
            second.classList.remove('include');
            first.disabled = true;
            second.disabled = true;
            first = null;
            second = null;
            var isEmpty = document.getElementsByClassName('include');
            console.log(isEmpty);
            document.getElementById('printResult').innerHTML = 'The colors matched!';
            if (isEmpty.item(0) == null) {
                allBtns.disabled = true;
                document.getElementById('checkout').disabled = false;
                document.getElementById('printResult').innerHTML = 'Success: You hacked the memory! <br><br> You gained 100k exp and 40 bitcoins!'
            }
            else {

            }
        }
        else {
            document.getElementById('printResult').innerHTML = 'The colors did not match..';

            for (k=0; k<allBtns.length; k++) {
                allBtns[k].disabled = true;
            }

            setTimeout(function () {
                for (var j= 0; j< allBtns.length; j++) {
                    allBtns[j].disabled = false;
                }
                first.style.backgroundColor = "white";
                second.style.backgroundColor = "white";
                first = null;
                second = null;
            }, 500);

            var allIncludes = document.getElementsByClassName('include');

            for (var j= 0; j< allIncludes.length; j++) {
                allIncludes[j].disabled = false;
            }
        }

    }

};
