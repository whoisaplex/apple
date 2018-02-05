<?php

use Illuminate\Database\Seeder;
use App\Team;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 9)->create()->each(function ($user) {
          $team = factory(Team::class)->create(['owner_id' => $user->id]);
          $user->team()->associate($team);
          $user->save();
        });
    }
}
