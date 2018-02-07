<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="{{ URL::asset('css/games/css-game-swiftwrite.css') }}">
        <!-- <link rel="stylesheet" type="text/css" href="reset.css"> -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div id="headerText">
            <h1>Swift Access</h1>
            <p>Type out the words shown on screen to gain access to the bank account.</p>
        </div>

        <div id="printVars">

        </div>

        <div id="flexContainer">
            <button id="restart" disabled="true">Restart</button>
            <button id="checkout" disabled="true">Checkout</button>
        </div>

        <div>
            <p id="timerText">Time remaining: </p>
            <p id="timer">30</p>
        </div>

        <div id="printResult">

        </div>
        <script src="{{ URL::asset( 'js/games/js-game-swiftwrite.js') }}"></script>
    </body>
</html>
