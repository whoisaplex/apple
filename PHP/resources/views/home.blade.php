@extends('layouts.app')

@section('content')
    <main id="main-content">

        <section id="profile-header">
            <div id="user-avatar">
                <img src="img/user-avatar.jpg">
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
                            <h3><i class="fa fa-users" aria-hidden="true"></i>
                              @if($user->team)
                                {{$user->team->name}}
                              @else
                              Invites {{$hasInvites}}
                              @endif
                             </h3>
                        </div>
                        <div class="panel-body">
                          @if($user->team)
                            <ol id="group-members">
                              @foreach($user->team->members as $member)
                                <li>{{ $member->username }}
                                  @if($member->username != $user->username)
                                    <span class="delete">
                                        <button class="btn-sm btn-danger" id="user-id">Kick</button>
                                    </span>
                                  @endif
                                </li>
                                @endforeach
                            </ol>
                            @else
                            <ul id="group-members">
                              @foreach($user->invite as $invite)
                              <li>
                                {{$invite->from->username}}
                                Has invited you to join
                                {{$invite->team->name}}
                                <span class="delete">
                                    <button class="btn-sm btn-danger" id="accept">Accept</button>
                                </span>
                              </li>
                              @endforeach
                            </ul>
                            @endif
                        </div>
                    </div>
                </div>
                @isset ($invite)
                <script type="text/javascript">
                document.querySelector('#accept').addEventListener('click', function(){
                axios.patch('https://development.test/api/me', { team_id: {{  $invite->team->id  }} })
                  .then(response => {
                    axios.patch('https://development.test/api/invite', { id: {{  $invite->id  }} });
                    console.log(response.data);

                  }).catch(err => {
                      console.log(err);
                  });
                });
                </script>

                @endisset
        </section>
    </main>
@endsection
