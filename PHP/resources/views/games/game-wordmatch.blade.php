<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="{{ URL::asset('css/games/css-game-wordmatch.css') }}">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{ URL::asset('css/bootstrap.min.css') }}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>

        <div class="container-fluid">

            <div class="container">
                <div class="page-header">
                    <h1 class="text-danger">Word Quiz</h1>
                    <p>Find the right password. # of matching unique letters with the answer is shown.</p>
                </div>
            </div>

            <div id="printVars" class="container row">

            </div>

            <div id="printResult" class="container">
            </div>

        </div>

        <script src="{{ mix('js/app.js') }}"></script>
        <script src="{{ URL::asset( 'js/games/js-game-wordmatch.js') }}"></script>

    </body>
</html>
