var myVars = ['backdoor', 'black hat', 'botnet', 'bug', 'cracking', 'crypto', 'chip-off', 'dark web', 'ddos', 'deep web',
'defcon', 'digital dertificate', 'encryption', 'evil maid attack', 'exploit', 'forensics', 'gchq', 'hacker', 'hacktivist',
'hashing', 'https', 'infosec', 'jailbreak', 'keys', 'malware', 'nist', 'nonce', 'opsec', 'otr', 'pentesting', 'pgp', 'phishing',
'plaintext', 'rat', 'ransomware', 'rainbow table', 'red team', 'root', 'rootkit', 'salting', 'script kiddies', 'shodan',
'signature', 'side channel', 'sniffing', 'social engineering', 'spearphishing', 'spoofing', 'spyware', 'state actor',
'threat model', 'token', 'tor', 'tails', 'vpn', 'virus', 'vuln', 'warez', 'white hat', 'worm', 'zero-day'];

var wordCount = 0;

window.onload =
    createElements();


const node = document.getElementById('inputID');
node.addEventListener('keydown', function onEvent(event) {
    if (event.key === "Enter") {
        checkInput();
    }
});

function createElements() {
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

    if(wordCount == 5) {
        document.getElementById('printResult').innerHTML = "Completed: Access granted!  \n <br><br> 20 xp and 200 bitcoins awarded!";
        document.getElementById('inputID').disabled = true;
        myStopFunction();

        //update user and post to positions table
        axios.patch('https://development.test/api/me', { quest_type: 2 })
          .then(response => {
            globalUser = response.data.user;
            axios.post('https://development.test/api/position', {name: localStorage.getItem("questName"), user_id:globalUser.id});
            console.log(globalUser);


            setTimeout( () => {
                parent.document.querySelector('#questTimerMenu').classList.remove('show'); 
                window.frameElement.remove(),3000);
            }).catch(err => {
              console.log(err);
          });
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
    }
};
//3
function myStopFunction() {
    clearInterval(myInterval);
}
