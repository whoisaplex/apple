@extends('layouts.app')

@section('content')
<div class="container">



@unless($user->team_id)
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Create Team</div>

                <div class="panel-body">
                    <form class="form-horizontal" method="POST" action="/teams">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Name</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" required autofocus>

                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Create Team
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
              </div>
            </div>
            
            @endunless
            @isset($user->team_id)

<h1 style="color:red;text-align:center; font-size: 5em">
        {{$user->team->name}}
    </h1>
    
    @if($user->id == $user->team->owner_id)
        <button id="remove-team" class="btn-sm btn-danger">Ta bort laget {{$user->team->name}}</button>
    @endif
                <div class="grid-flex space width-100 text-align-center">
                    <div class="col-flex-2">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3>
                                    <i class="fa fa-globe" aria-hidden="true"></i> Team hacking history</h3>
                            </div>
                            <div class="panel-body">
                                <ol id="user-positions">

                                  @foreach($positions as $position)

                                    <li>{{ $position->name }} hacked by {{ $position->user->username }}<span class="cooldown">{{ $position->created_at}}</span></li>

                                  @endforeach

                                </ol>
                            </div>
                        </div>
                    </div>
                    <div class="col-flex-2">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3>
                                    <i class="fa fa-users" aria-hidden="true"></i> Team members</h3>
                            </div>
                            <div class="panel-body">
                                <ol id="user-positions">
                                  @foreach($team->members as $member)

                                    <li><a href="/users/{{ $member->username }}">{{ $member->username }}</a>
                                        
                                        @if($user->id == $user->team->owner_id)
                                            
                                                
                                            @if($user->id != $member->id)
                                            <span class="cooldown"><button name="button"  class="btn-sm btn-danger" onclick="return kickThisUser({{$member->id}})")>Kick</button></span>
                                            @endif
                                        @endif
                                    </li>
                                  @endforeach
                                </ol>
                            </div>
                        </div>
                    </div>

                </div>

              @endisset

    <script>
        function kickThisUser(data) {
    
        axios.get('https://' + window.location.hostname + '/api/kick?id=' + data)
            .then(response => {
            console.log(response.data);
            console.log("-----------------");
            console.log(data)
            }).catch(err => {
                console.log(err);
            });

            location.reload();
        }
    </script>
</div>
@endsection
