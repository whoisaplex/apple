<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;
use App\Library\Quest;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $auth = Auth::user();
        $users = User::take(10)->orderBy('xp','desc')->get();
        return view('users.index', ['users' => $users, 'auth' => $auth]);
    }

    public function API_Users()
    {
      $users = User::take(200)->orderBy('xp', 'desc')->get();

      foreach ($users as $user) {
        $team = $user->team()->value('name');
        $user->team_name = $team;
      }
        return response()->json($users);
    }

    public function API_SearchUsers(Request $request)
    {
        $name = $request->input('username');
        $searchQuery = User::where('username', 'LIKE', '%'.$name.'%')->get();
        foreach ($searchQuery as $user) {
          $team = $user->team()->value('name');
          $user->team_name = $team;
        }
        return response()->json($searchQuery);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($username)
    {
        $user = User::whereUsername($username)->firstOrFail();
        $auth = \Auth::user();
        return view('users.show', compact('user', 'auth'));

    }

    public function API_Show()
    {
        if (! \Auth::check()) {
          return response()->json('Not logged in', 401);
        }
        $user = \Auth::user();

        //$user = User::where('id', $id)->firstOrFail();
        return response()->json($user, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }
    public function API_Update(Request $request)
    {
        if (! \Auth::check()) {
          return response()->json('Not logged in', 401);
        }
        if ($request->input('quest_type'))
        {
        $quest = new Quest($request->input('quest_type'));
        $user = \Auth::user();

        $user->currency += $quest->currency;
        $user->xp += $quest->xp;
        $user->save();

        return response()->json([
          'user' => $user,
          'quest' => $quest,
        ]);
      }
      else
      {
        $user = \Auth::user();
        $user->team_id = $request->team_id;
        $user->save();

        return response()->json($request);
    }
  }

  public function API_KickUser(Request $request)
    {
        $id = $request->input('id');
        $user = User::findOrFail($id);
        // $user = \Auth::user();
        $user->team_id = null;
        $user->save();
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
