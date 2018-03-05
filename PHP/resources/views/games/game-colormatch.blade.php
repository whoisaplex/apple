<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="{{ URL::asset('css/games/css-game-colormatch.css') }}">
        <link rel="stylesheet" href="{{ URL::asset('css/bootstrap.min.css') }}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body>
        <div class="container-fluid">

            <div class="container">
                <div class="page-header">
                    <h1 class="text-danger">Memory Hack</h1>
                    <p>Click the squares to show a color. Match each color with its sibling to complete the hack.</p>
                </div>
            </div>

            <div id="printVars" class="container row">
            </div>

            <div id="printResult" class="container">
            </div>

        </div>

        <script src="{{ mix('js/app.js') }}"></script>
        <script src="{{ URL::asset( 'js/games/js-game-colormatch.js') }}"></script>
    </body>
</html>
