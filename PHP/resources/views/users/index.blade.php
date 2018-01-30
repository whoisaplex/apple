@extends('layouts.app')
@section('content')
    <main id="main-content">
        <section>

            <div class="grid-flex space width-100 text-align-center">

                <div class="col-flex-1">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3>
                                <i class="fa fa-user" aria-hidden="true"></i> Top players </h3>
                        </div>
                        <div class="panel-body">
                            <ol id="user-positions">
                              @foreach($users as $user)
                                <li><a href="http://testing.test/users/{{$user->username}}">{{$user->username}}</a><span class="cooldown"> <button class="btn-sm btn-danger" id="user-id">Invite to team</button></span>
                                </li>
                              @endforeach
                            </ol>
                        </div>
                    </div>
                </div>
        </section>
    </main>
@endsection
