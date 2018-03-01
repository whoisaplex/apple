<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Invite;
use App\User;

class HomeController extends Controller
{
    /** 
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $user = Auth::user();
        $positions = User::find($user->id)->position()->orderBy('created_at', 'desc')->take(10)->get();
        $hasInvites = $user->invite->count();


        return view('home', ['user' => $user, 'hasInvites' => $hasInvites, 'positions' => $positions]);
    }
}
