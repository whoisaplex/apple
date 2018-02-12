<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InvitesController extends Controller
{
    public function sendInvite(array $data)
    {
      dd($data);
      return Invite::create([
        'team_id' => $data['team_id'],
        'user_id' => $data['user_id'],
        'sender_id' => $data['sender_id']
      ]);
    }
}
