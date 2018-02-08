<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="{{ URL::asset('css/games/css-game-wordmatch.css') }}">
        <!-- <link rel="stylesheet" type="text/css" href="reset.css"> -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript">
            const globalUser = '{{$user->id}}'
        </script>
    </head>
    <body>
        <div id="headerText">
            <h1>Word Quiz</h1>
            <p>Find the right password to hack the terminal.</p>
        </div>

        <div id="printVars">

        </div>

        <div id="flexContainer">
            <button id="restart" disabled="true">Restart</button>
            <button id="checkout" disabled="true">Checkout</button>
        </div>

        <div id="printResult">

        </div>
        <script src="{{ URL::asset( 'js/games/js-game-wordmatch.js') }}"></script>

    </body>
</html>
