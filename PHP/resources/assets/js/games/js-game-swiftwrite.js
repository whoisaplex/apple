var myVars = ['backdoor', 'black hat', 'botnet', 'bug', 'cracking', 'crypto', 'chip-off', 'dark web', 'ddos', 'deep web',
'defcon', 'digital dertificate', 'encryption', 'evil maid attack', 'exploit', 'forensics', 'gchq', 'hacker', 'hacktivist',
'hashing', 'https', 'infosec', 'jailbreak', 'keys', 'malware', 'nist', 'nonce', 'opsec', 'otr', 'pentesting', 'pgp', 'phishing',
'plaintext', 'rat', 'ransomware', 'rainbow table', 'red team', 'root', 'rootkit', 'salting', 'script kiddies', 'shodan',
'signature', 'side channel', 'sniffing', 'social engineering', 'spearphishing', 'spoofing', 'spyware', 'state actor',
'threat model', 'token', 'tor', 'tails', 'vpn', 'virus', 'vuln', 'warez', 'white hat', 'worm', 'zero-day'];

var wordCount = 0;

window.onload =
    runMe();

const node = document.getElementById('inputID');
node.addEventListener('keydown', function onEvent(event) {
    if (event.key === "Enter") {
        checkInput();
    }
});

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

    if(wordCount == 6) {
        document.getElementById('printResult').innerHTML = "<p class='alert alert-success'><strong>Success</strong>: You gained 20 exp and 200 bitcoins!</p>";
        document.getElementById('inputID').disabled = true;
        myStopFunction();

        //update user and post to positions table
        axios.patch('https://' + window.location.hostname + '/api/me', { quest_type: 2 })
          .then(response => {
            globalUser = response.data.user;
            axios.post('https://' + window.location.hostname + '/api/position', {name: localStorage.getItem("questName"), user_id:globalUser.id});
            console.log(globalUser);



                /* Robbin Was Here 2018/02/26 kl 16:48 */
                setTimeout(function () {
                    parent.document.querySelector('#questTimerMenu').classList.remove('show'); 
                    parent.postMessage('', 'https://' + window.location.hostname + '');
                    window.frameElement.remove()        
                }, 2000)
                /* Robbin Was Here 2018/02/26 kl 16:48 */
                        
              
        }).catch(err => {
            console.log(err);
        });
    }
    else if (input == displayVal) {
        wordCount++;
        document.getElementById('printResult').innerHTML = "<p class='alert alert-info'>Words Completed: " + wordCount + "</p>";
        generateNewWord();


        /* Robbin Was Here 2018/02/26 kl 16:48 */
        /* setTimeout(function () {
            parent.document.querySelector('#questTimerMenu').classList.remove('show'); 
            parent.postMessage('', 'https://' + window.location.hostname + '');
            window.frameElement.remove()        
        }, 2000) */
        /* Robbin Was Here 2018/02/26 kl 16:48 */
            
    }
    else {
        document.getElementById('printResult').innerHTML = "<p class='alert alert-danger'>The word didn't match..</p>";

        /* Robbin Was Here 2018/02/26 kl 16:48 */
        /* setTimeout(function () {
            parent.document.querySelector('#questTimerMenu').classList.remove('show'); 
            parent.postMessage('', 'https://' + window.location.hostname + '');
            window.frameElement.remove()        
        }, 2000) */
        /* Robbin Was Here 2018/02/26 kl 16:48 */
            
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
