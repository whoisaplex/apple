<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsersInfo extends Model
{
    protected $fillable = ['user_id','team_id','xp','level','currency'];
    public $timestamps = false;
}
