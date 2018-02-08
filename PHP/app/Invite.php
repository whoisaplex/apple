<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    protected $fillable = ['name', 'user_id', 'sender_id'];

    public function user()
    {
      return $this->belongsTo(User::class);
    }
    public function from()
    {
      return $this->belongsTo(User::class, 'sender_id');
    }
    public function team()
    {
      return $this->belongsTo(Team::class);
    }
}
