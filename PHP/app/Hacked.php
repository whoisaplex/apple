<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Hacked extends Model
{
    protected $fillable = ['name', 'owner_id'];

    public function members(){
      return $this->hasMany(User::class);
    }
}
