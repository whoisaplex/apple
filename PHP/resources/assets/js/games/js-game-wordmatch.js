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
    createButtons(),
    showInstructions();

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
    document.getElementById('printResult').innerHTML = "Click a word to see how many unique letters match the correct password. ";
    printToPage();
};
function onWordNotMatch(numOfMatches) {
    document.getElementById('printResult').innerHTML = "<p class='alert alert-warning'><strong>Alert:</strong> The word has " + numOfMatches + " matching letters</p>";
    printToPage();
};
function printToPage() {
        document.getElementById('printResult').innerHTML += "You have " + clicksRemain + " tries left. <br><br>";
        
};
function onMissionSuccess() {
    document.getElementById('printResult').innerHTML = "<p class='alert alert-success'><strong>Success</strong>: You gained 10 exp and 100 bitcoins!</p>";
    disableButtons();

    axios.patch('https://development.test/api/me', { quest_type: 3 })
      .then(response => {
        globalUser = response.data.user;
        axios.post('https://development.test/api/position', {name: localStorage.getItem("questName"), user_id:globalUser.id});
          console.log(globalUser);
        
          localStorage.removeItem("questName");

    
          setTimeout(() => {
          window.frameElement.remove()
        },3000);
      }).catch(err => {
          console.log(err);
      });

};
function onMissionFail() {
    document.getElementById('printResult').innerHTML = "You lost the game..";
    disableButtons();
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
