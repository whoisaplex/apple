<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="{{ URL::asset('css/games/css-game-swiftwrite.css') }}">
        <link rel="stylesheet" href="{{ URL::asset('css/bootstrap.min.css') }}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body>
        
        <div class="container-fluid">

            <div class="container">
                <div class="page-header">
                    <h1 class="text-danger">Swift Access</h1>
                    <p>Type out the words shown on screen to gain access to the bank account.</p>
                </div>
            </div>

            <div id="printVars" class="container row">

            </div>

            <div>
                <p id="timerText">Time remaining: </p>
                <p id="timer">38</p>
            </div>

            <div id="printResult" class="container">
            </div>

        </div>

        <script src="{{ mix('js/app.js') }}"></script>
        <script src="{{ URL::asset( 'js/games/js-game-swiftwrite.js') }}"></script>
    </body>
</html>
