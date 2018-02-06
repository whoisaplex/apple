<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>StreetHack - Profilepage</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/font-awesome.css">
    <link rel="stylesheet" href="css/profile.css">

</head>

<body>

    <main id="main-content">

        <section id="profile-header">
            <div id="user-avatar">
                <img src="img/user-avatar.jpg">
            </div>

            <div id="user-id-container">
                <div id="user-id">
                  Username
                </div>
                <div id="user-level">
                    <div>10</div>
                </div>
                <div id="user-cash">0
                    <i class="fa fa-bitcoin"></i>
                </div>
            </div>


            <div id="user-xp">
                <progress value="22" max="100"></progress>
            </div>

        </section>

        <section>

            <div class="grid-flex space width-100 text-align-center">

                <div class="col-flex-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3>
                                <i class="fa fa-globe" aria-hidden="true"></i> Hacked position</h3>
                        </div>
                        <div class="panel-body">
                            <ol id="user-positions">
                                <li>Positon #1 <span class="cooldown">11 min</span></li>
                                <li>Positon #2 <span class="cooldown">13 min</span></li>
                                <li>Positon #3 <span class="cooldown">7 min</span></li>
                                <li>Positon #4 <span class="cooldown">6 min</span></li>
                                <li>Positon #5 <span class="cooldown"><button class="btn-sm btn-danger" id="user-id">Remove deprecated</button></span></li>
                                <li>Positon #6 <span class="cooldown">7 min</span></li>
                                <li>Positon #7 <span class="cooldown">15 min</span></li>
                                <li>Positon #8 <span class="cooldown">14 min</span></li>
                                <li>Positon #9 <span class="cooldown">1 min</span></li>
                                <li>Positon #10 <span class="cooldown"> <button class="btn-sm btn-danger" id="user-id">Remove deprecated</button></span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div class="col-flex-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3><i class="fa fa-users" aria-hidden="true"></i> My group</h3>
                        </div>
                        <div class="panel-body">

                            <ol id="group-members">
                                <li class="list danger">Group Member (Username) #1
                                    <span class="delete">
                                        <button class="btn-sm btn-danger" id="user-id">Kick</button>
                                    </span>
                                </li>
                                <li>Group Member (Username) #2
                                    <span class="delete">
                                        <button class="btn-sm btn-danger" id="user-id">Kick</button>
                                    </span>
                                </li>
                                <li>Group Member (Username) #3
                                    <span class="delete">
                                        <button class="btn-sm btn-danger" id="user-id">Kick</button>
                                    </span>
                                </li>
                                <li>Group Member (Username) #4
                                    <span class="delete">
                                        <button class="btn-sm btn-danger" id="user-id">Kick</button>
                                    </span>
                                </li>
                                <li>Group Member (Username) #5
                                    <span class="delete">
                                        <button class="btn-sm btn-danger" id="user-id">Kick</button>
                                    </span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>



        </section>
    </main>

</body>

</html>
