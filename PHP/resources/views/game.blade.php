<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
    <link href="./css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ URL::asset('css/reset.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('css/flaticon.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('css/ui.main.css') }}">
    <link rel="stylesheet" href="{{ URL('css/profile.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap.min.css') }}">
    <script type="text/javascript">
      globalUser = {!! json_encode($user) !!}
      globalPositions = {!! json_encode($positions) !!}
    </script>

    <title></title>
</head>
<body>

    <!-- MAP -->
    <div id="map">
        Loading...
        <noscript>You need to enable JavaScript to run this game.</noscript>
    </div>

    <!-- QUEST LIST -->
    <div id="menu-list">
        <div class="menu-container">
            <ul>
            <!-- Quest positions renders dynimacally -->
            <li class="error-message">
                <code>
                    :'( <br>
                    There was a problem with the connection to the server.
                </code>
            </li>
            </ul>
        </div>
    </div>

    <!-- PROFILE -->
    <div id="menu-site">
        <!-- <object data="https://' + window.location.hostname + '/home"></object> -->
    </div>

    <!-- QUEST DIALOG POPUP -->
    <div data-questid="null" id="quest-dialog">
        <div id="quest-dialog-info">
            <div id="quest-dialog-name"><h4>QUEST NAME AND TITLE</h4></div>
            <div id="quest-dialog-status"><i class="fa fa-times-circle-o red" aria-hidden="true"></i></div>
        </div>
        <div id="quest-dialog-progress">
            <progress id="quest-dialog-cooldown" value="60" max="100"></progress>
        </div>
        <div id="quest-dialog-loot">
            <div id="quest-dialog-cash">$0</div><div id="quest-dialog-xp">0 XP</div>
        </div>
        <div id="quest-dialog-buttons">
            <button id="start-quest" class="btn-sm btn-success">Kör</button>
            <button id="cancel" class="btn-sm btn-danger">Avbryt</button>
        </div>
    </div>

    <div id="quest-game"></div>

    <div id="menu-bar">
        <div id="menu" class="menu-item">
            <a href="#">
                <span class="flaticon-010-hacker menu-buttons"></span>
            </a>
        </div>
        <div id="logo">
            StreetHack
        </div>

        <div id="compass">
            <i class="fa fa-compass fa-3x menu-buttons" aria-hidden="true"></i>
        </div>

        <div id="site-menu" class="menu-item">
            <a href="#">
                <span class="flaticon-009-browser menu-buttons"></span>
            </a>
        </div>
    </div>

    <div id="questTimerMenu">
      <progress id="questProgress" value="100" max="100"></progress>
    </div>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-asKbHoJKTtGt8rWJ35ebHT3j7sVKUBA"></script>
    <script src="{{ mix('/js/app.js') }}"></script>
    <script src="{{ mix('/js/game.js') }}"></script>
    <script src="{{ mix('js/react-ingame-menu.js') }}"></script>

</body>
</html>
