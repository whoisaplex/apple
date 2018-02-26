<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $fillable = ['name', 'user_id'];

    public function positions()
    {
      return $this->associate(User::class);
    }
}
