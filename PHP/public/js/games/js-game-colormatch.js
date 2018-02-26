var myVars = ["red", "blue", "green", "purple", "yellow", "orange"];

var first;
var second;

shuffleArray(myVars);
createTable(myVars);
addNewListeners();
shuffleArray(myVars);
createTable(myVars);

function createTable(list) {
    for (var i = 0; i<(list.length); i++) {
        var newBtn = document.createElement('button');
        newBtn.className = 'newBtn include col-sm-4 btn btn-default';
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
            document.getElementById('printResult').innerHTML = '<p class="alert alert-warning"><strong>Alert</strong>: The colors matched!</p>';
            if (isEmpty.item(0) == null) {
                allBtns.disabled = true;
                document.getElementById('printResult').innerHTML = "<p class='alert alert-success'><strong>Success</strong>: You gained 30 exp and 300 bitcoins!</p>";

                //update user and post to positions table
                axios.patch('https://development.test/api/me', { quest_type: 1 })
                  .then(response => {
                    globalUser = response.data.user;
                    axios.post('https://development.test/api/position', { name: localStorage.getItem("questName"), user_id: globalUser.id });
                    console.log(globalUser);


                    setTimeout( () => {
                        parent.document.querySelector('#questTimerMenu').classList.remove('show'); 
                        window.frameElement.remove(),3000);
                  }).catch(err => {
                      console.log(err);
                  });
            }
            else {

            }
        }
        else {
            document.getElementById('printResult').innerHTML = "<p class='alert alert-danger'><strong>Alert</strong>: The colors did not match..</p>";

            for (k=0; k<allBtns.length; k++) {
                allBtns[k].disabled = true;
            }

            setTimeout(function () {
                for (var j= 0; j< allBtns.length; j++) {
                    allBtns[j].disabled = false;
                }
                first.style.backgroundColor = "#424242";
                second.style.backgroundColor = "#424242";
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
