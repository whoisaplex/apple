var myVars = ['backdoor', 'black hat', 'botnet', 'bug', 'cracking', 'crypto', 'chip-off', 'dark web', 'ddos', 'deep web',
'defcon', 'digital dertificate', 'encryption', 'evil maid attack', 'exploit', 'forensics', 'gchq', 'hacker', 'hacktivist',
'hashing', 'https', 'infosec', 'jailbreak', 'keys', 'malware', 'nist', 'nonce', 'opsec', 'otr', 'pentesting', 'pgp', 'phishing',
'plaintext', 'rat', 'ransomware', 'rainbow table', 'red team', 'root', 'rootkit', 'salting', 'script kiddies', 'shodan',
'signature', 'side channel', 'sniffing', 'social engineering', 'spearphishing', 'spoofing', 'spyware', 'state actor',
'threat model', 'token', 'tor', 'tails', 'vpn', 'virus', 'vuln', 'warez', 'white hat', 'worm', 'zero-day'];

var addedVarsList = [];
var answer = "";
var userClicks = 0;
var clicksRemain = 5;
var count = 0;

window.onload =
    //createHTML(),
    createButtons(),
    showInstructions(),
    document.getElementById("restart").addEventListener("click", function(){
    location.reload();
});

function createHTML() {
    var createdHeaderDiv = document.createElement('div');
    createdHeaderDiv.id = 'headerText';
    document.body.appendChild(createdHeaderDiv);

    var createdHeaderDivH1 = document.createElement('h1');
    var createdHeaderDivP = document.createElement('p');
    createdHeaderDivH1.innerHTML = "Word Quiz";
    createdHeaderDivP.innerHTML = "Find the right password to hack the terminal.";
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

function createButtons() {
    for(i=0; i<8;i++) {

        var newBtn = document.createElement('button');
        newBtn.className = 'newBtnClass';
        document.getElementById('printVars').appendChild(newBtn);
        var randomVar = myVars[Math.floor(Math.random() * myVars.length)];
        addedVarsList.push(randomVar);
        var index = myVars.indexOf(randomVar);
        if (index > -1) {
            myVars.splice(index, 1);
        }
        newBtn.innerHTML = randomVar;
        newBtn.addEventListener("click", questClickFunction);
    }
    answer = addedVarsList[Math.floor(Math.random() * addedVarsList.length)];
    console.log(answer);
};
function questClickFunction() {
    clearMessages();
    decrementClicksRemain();
    checkIfWordMatchesAnswer(this);
    incrementUserClicks();
    disableCurrentButton(this);
};
function checkIfWordMatchesAnswer(clickedBtn) {
    var btnStr = clickedBtn.innerHTML;
    var result1 = comparison(btnStr, answer);
    var strLength = result1.length;
    var resultAnswer = makeUnique(answer);

    if (result1 == resultAnswer) {
        disableButtons();
        onMissionSuccess();
        clickedBtn.style.color = "red";
    }
    else if(clicksRemain == 0) {
        onMissionFail();
    }
    else {
        onWordNotMatch(strLength);
    }
};
function comparison(str1, str2) {
    var combined = "";
    for (i=0;i<str1.length;i++) {
        for (j=0; j<str2.length;j++) {
            if(str1[i] == str2[j]) {
                combined += str1[i];
            }
        }
    }
    var complete = makeUnique(combined);
    return complete;
};
function makeUnique(str) {
    var uniqueChars = String.prototype.concat(...new Set(str));
    return uniqueChars
};
function showInstructions() {
    document.getElementById('printResult').innerHTML = "Click a word to see how many unique letters match the correct password<br><br>";
    printToPage();
};
function onWordNotMatch(numOfMatches) {
    document.getElementById('printResult').innerHTML = "Failure: The word has " + numOfMatches + " matching letters.<br><br>";
    printToPage();
};
function printToPage() {
        document.getElementById('printResult').innerHTML += "You have " + clicksRemain + " tries left. <br><br>";
};
function onMissionSuccess() {
    document.getElementById('printResult').innerHTML = "Success: You gained control of the system! \n <br><br> 10 exp and 100 bitcoins awarded!";
    disableButtons();
    document.getElementById("checkout").disabled = false;

    axios.patch('https://development.test/api/me', { quest_type: 3 })
      .then(response => {
        globalUser = response.data.user;
        axios.post('https://development.test/api/position', {name: localStorage.getItem("questName"), user_id:globalUser.id});
          console.log(globalUser);

          setTimeout(() => {
              parent.document.querySelector('#questTimerMenu').classList.remove('show'); 
              window.parent.clearProgressInterval();
          window.frameElement.remove()
        },3000);
      }).catch(err => {
          console.log(err);
      });

};
function onMissionFail() {
    document.getElementById('printResult').innerHTML = "You lost the game..";
    disableButtons();
    enableRestartBtn();
};
function enableRestartBtn() {
    document.getElementById("restart").disabled = false;
};
function randomizeAnswer() {
    var random = myVars[Math.floor(Math.random() * myVars.length)];
    return random;
};
function disableCurrentButton(clickedBtn) {
    clickedBtn.disabled = true;
};
function decrementClicksRemain() {
    clicksRemain--;
};
function incrementUserClicks() {
    userClicks++;
};
function disableButtons() {
    var myList = document.getElementsByClassName('newBtnClass');
    for (i=0; i< myList.length; i++) {
        myList[i].disabled = true;
    }
};
function clearMessages() {
    document.getElementById('printResult').innerHTML = "";
};
