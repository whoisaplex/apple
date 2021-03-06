<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>StreetHack</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <link rel="stylesheet" href="{{ URL::asset('css/startPageAnimation.css') }}">
        <link rel="stylesheet" href="{{ URL::asset('css/style.css') }}">

    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                        <a href="{{ route('logout') }}"onclick="event.preventDefault();document.getElementById('logout-form').submit();">Log out</a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    @else
                        <a href="{{ route('login') }}">Login</a>
                        <a href="{{ route('register') }}">Register</a>
                    @endauth
                </div>
            @endif

            <div class="content">
              <video src="img/blackandwhite.mp4" autoplay loop id="video" playsinline muted>
              </video>

              <div class="title m-b-md"><a href="/">StreetHack</a></div>

            </div>
        </div>


        <div class="movie">

</div>

<div class="workspace">

  <div id="faux-terminal">
    <div class="layer"></div>
    <div class="overlay"></div>
  </div>
</div>



    </body>
</html>
