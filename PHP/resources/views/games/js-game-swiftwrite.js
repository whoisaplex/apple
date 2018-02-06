var myVars = ['backdoor', 'black hat', 'botnet', 'bug', 'cracking', 'crypto', 'chip-off', 'dark web', 'ddos', 'deep web',
'defcon', 'digital dertificate', 'encryption', 'evil maid attack', 'exploit', 'forensics', 'gchq', 'hacker', 'hacktivist', 
'hashing', 'https', 'infosec', 'jailbreak', 'keys', 'malware', 'nist', 'nonce', 'opsec', 'otr', 'pentesting', 'pgp', 'phishing',
'plaintext', 'rat', 'ransomware', 'rainbow table', 'red team', 'root', 'rootkit', 'salting', 'script kiddies', 'shodan', 
'signature', 'side channel', 'sniffing', 'social engineering', 'spearphishing', 'spoofing', 'spyware', 'state actor', 
'threat model', 'token', 'tor', 'tails', 'vpn', 'virus', 'vuln', 'warez', 'white hat', 'worm', 'zero-day'];

var wordCount = 0;

window.onload = 
    //createHTML(),
    runMe();
    

document.getElementById("restart").addEventListener("click", function(){
    location.reload();
});

const node = document.getElementById('inputID');
node.addEventListener('keydown', function onEvent(event) {
    if (event.key === "Enter") {
        checkInput();
    }
});

function createHTML() {
    var createdHeaderDiv = document.createElement('div');
    createdHeaderDiv.id = 'headerText';
    document.body.appendChild(createdHeaderDiv);

    var firstHeader = document.createElement('h1');
    firstHeader.innerHTML = 'Swift Access';

    var firstP = document.createElement('p');
    firstP.innerHTML = "Type out the words shown on screen to gain access to the bank account.";
    document.getElementById('headerText').appendChild(firstP);

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

    var timerDiv = document.createElement('div');
    document.body.appendChild(timerDiv);

    var timerP = document.createElement('p');
    timerP.id = "timerText";
    timerP.innerHTML = "Time remaining: "
    timerDiv.appendChild(timerP);

    var timer2 = document.createElement('p');
    timer2.id = "timer";
    timer2.innerHTML = "30";
    timerDiv.appendChild(timer2);

    var printResultDiv = document.createElement('div');
    printResultDiv.id = 'printResult';
    document.body.appendChild(printResultDiv);
};

function runMe() {
    var newDiv = document.createElement('div');
    newDiv.id = 'newDiv';
    var rand = myVars[Math.floor(Math.random() * myVars.length)];
    newDiv.innerHTML = rand;
    document.getElementById('printVars').appendChild(newDiv);

    var userInput = document.createElement('input');
    userInput.id = 'inputID';
    document.getElementById('printVars').appendChild(userInput);
}
function checkInput() {
    var input = document.getElementById("inputID").value.toLowerCase();
    var displayVal = document.getElementById('newDiv').innerHTML.toLowerCase();
    console.log(input + " " + displayVal);

    if(wordCount == 10) {
        document.getElementById('printResult').innerHTML = "Completed: Access granted!  \n <br><br> 700 exp and 30 bitcoins awarded!";
        document.getElementById('inputID').disabled = true;
        myStopFunction();
        document.getElementById("checkout").disabled = false;
    }
    else if (input == displayVal) {
        wordCount++;
        document.getElementById('printResult').innerHTML = "Success: One step closer to gain access!<br><br>" + ' Words Completed: ' + wordCount;
        console.log(wordCount);
        generateNewWord();
    }
    else {
        document.getElementById('printResult').innerHTML = "Failure: The word didn't match.";
    }
}
function generateNewWord() {
    var rand = myVars[Math.floor(Math.random() * myVars.length)];
    newDiv.innerHTML = rand;
    document.getElementById('inputID').value ="";
}

var currentdate = new Date();
var datetime = "Last sync " + 
    currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

console.log(datetime);

Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

//1
var myInterval = setInterval(function(){ countDown() }, 1000);
//2
function countDown() {
    document.getElementById("timer").innerHTML -= 1;
    if (document.getElementById("timer").innerHTML == 0) {
        myStopFunction();
        document.getElementById('printResult').innerHTML = "You lost..";
        document.getElementById('inputID').disabled = true;
        document.getElementById("restart").disabled = false;
    }
};
//3
function myStopFunction() {
    clearInterval(myInterval);
}