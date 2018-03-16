var myVars = ["red", "blue", "green", "purple", "yellow", "violet"];

var first;
var second;

shuffleArray(myVars);
createTable(myVars);
addNewListeners();
shuffleArray(myVars);
createTable(myVars);

function createTable(list) {
    for (var i = 0; i < (list.length); i++) {
        var newBtn = document.createElement('button');
        newBtn.className = 'newBtn include';
        document.getElementById('printVars').appendChild(newBtn);
        newBtn.dataset.color = list[i];
    }
}

function addNewListeners() {
    document.getElementById('printVars').addEventListener('click', function (e) {
        if (e.target.classList.contains('newBtn')) {
            questClickFunction(e.target);
        }
    }, false);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function questClickFunction(param) {
    var allBtns = document.getElementsByClassName('newBtn');

    if (first == null) {
        first = param;
        param.style.backgroundColor = param.dataset.color;
        first.disabled = true;
    } else if (second == null) {

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
            document.getElementById('printResult').innerHTML = '<p class="alert alert-warning">The colors matched!</p>';


            if (isEmpty.item(0) == null) {
                allBtns.disabled = true;
                document.getElementById('printResult').innerHTML = "<p class='alert alert-success'><strong>Success!</strong>: You gained 30 exp and 300 bitcoins!</p>";

                //update user and post to positions table
                axios.patch('https://' + window.location.hostname + '/api/me', { quest_type: 1 })
                    .then(response => {
                        globalUser = response.data.user;
                        axios.post('https://' + window.location.hostname + '/api/position', { name: localStorage.getItem("questName"), user_id: globalUser.id });
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

        } else {
            document.getElementById('printResult').innerHTML = "<p class='alert alert-danger'>The colors did not match..</p>";

            for (k = 0; k < allBtns.length; k++) {
                allBtns[k].disabled = true;
            }

            setTimeout(function () {
                for (var j = 0; j < allBtns.length; j++) {
                    allBtns[j].disabled = false;
                }
                first.style.backgroundColor = "white";
                second.style.backgroundColor = "white";
                first = null;
                second = null;
            }, 500);

            var allIncludes = document.getElementsByClassName('include');

            for (var j = 0; j < allIncludes.length; j++) {
                allIncludes[j].disabled = false;
            }
        }
    }
}