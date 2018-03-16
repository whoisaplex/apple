@extends('layouts.app')
@section('content')
    <script type="text/javascript">
        globalUser = {!! json_encode($auth) !!}
    </script>

    <main id="main-content"></main>
@endsection

@section('scripts')
    <!-- <script>
        let teamRelations = 
    </script> -->
    <script src={{ mix('js/react-leaderboard.js') }}></script>
@endsection
