@extends('layouts.app')
@section('content')
    <main id="main-content">

        <section id="profile-header">
            <div id="user-avatar">
                <img src="../img/user-avatar.jpg">
            </div>

            <div id="user-id-container">
                <div id="user-id">

                  {{ $user->username }}

                </div>
                @isset($user->team)
                <div id="user-team">

                  {{ $user->team->name }}

                </div>
                @endisset
                <div id="user-level">
                    <div>{{ $user->level}}</div>
                </div>
                <div id="user-cash">{{ $user->currency }}
                    <i class="fa fa-bitcoin"></i>
                </div>
            </div>


            <div id="user-xp">
                <progress value={{ $user->xp}} max="100"></progress>
            </div>

        </section>

        <section>

            <div class="grid-flex space width-100 text-align-center">

                <div class="col-flex-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3>
                                <i class="fa fa-globe" aria-hidden="true"></i> Hacked position</h3>
                        </div>
                        <div class="panel-body">
                            <ol id="user-positions">
                              @foreach($user->position as $position)
                                <li>{{ $position->name }} <span class="cooldown">{{ $position->created_at }}</span></li>
                              @endforeach
                            </ol>
                        </div>
                    </div>
                </div>

                <div class="col-flex-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                          @if($user->team)
                            <h3><i class="fa fa-users" aria-hidden="true"></i> {{$user->team->name}}</h3>
                        </div>
                        <div class="panel-body">
                            <ol id="group-members">
                              @foreach($user->team->members as $member)
                                <li>{{ $member->username }}
                                    <span class="delete">
                                        <button class="btn-sm btn-danger" id="user-id">Kick</button>
                                    </span>
                                </li>
                                @endforeach
                            </ol>
                        </div>
                        @else
                        <h3>Riding Solo {{$user->id}} {{$auth->id}} {{$auth->team_id}}
                          <span class="delete">
                            <button id="invite" name="button">Invite</button>
                          </span>
                        </h3>
                        @endif
                    </div>
                </div>


        </section>
        <script type="text/javascript">
        document.querySelector('#invite').addEventListener('click', function(){
        axios.post('https://development.test/api/invite', { team_id:{{ $auth->team_id}},user_id:{{$user->id}}, sender_id:{{$auth->id}} })
          .then(response => {
            console.log(response);
          }).catch(err => {
              console.log(err);
          });
        });
        </script>
    </main>
@endsection
