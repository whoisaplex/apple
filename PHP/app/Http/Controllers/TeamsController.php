<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Team;
use Auth;

class TeamsController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::User();
        return view('teams.teams', compact('user'));
    }


    public function API_Teams()
    {
      $teams = Team::take(12)->get();

      foreach($teams as $team){

        $team->xp = 0;
        $team->currency = 0;

        foreach($team->members as $member ){

          $team->xp += $member->xp;
          $team->currency += $member->currency;
      }
      //$sortedTeams = arsort($teams->team->xp);
      //dd($sortedTeams);
      $teamsByXp = $teams->sortByDesc('xp')->values();



    }
    return response()->json($teamsByXp);

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

        $team = Team::create([
          'name' => request('name'),
          'owner_id' => Auth()->id(),
        ]);

        $user = Auth::user();
        $user->team()->associate($team);
        $user->save();



        // Redirect to home page
        return redirect('/home');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($team)
    {
      $team = Team::where('name', $team)->firstOrFail();
      return view('teams.show', compact('team'));

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
