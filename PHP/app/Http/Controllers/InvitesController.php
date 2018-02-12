<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Invite;
class InvitesController extends Controller
{
    public function sendInvite(Request $request)
    {
      return Invite::create([
        'team_id' => $request['team_id'],
        'user_id' => $request['user_id'],
        'sender_id' => $request['sender_id']
      ]);
    }



    public function deleteInvite(Request $request)

    {
      
      $invite = Invite::find($request->input('id'))->delete();
    }
}
