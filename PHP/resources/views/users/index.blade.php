@extends('layouts.app')
@section('content')
    <script type="text/javascript">
        globalAuthUser = {!! json_encode($auth) !!}
    </script>

    <main id="main-content"></main>
@endsection

@section('scripts')
    <!-- <script>
        let teamRelations = 
    </script> -->
    <script src={{ mix('js/react-app.js') }}></script>
@endsection
