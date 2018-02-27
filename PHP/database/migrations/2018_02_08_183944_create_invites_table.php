<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invites', function (Blueprint $table) {
          $table->increments('id');
          $table->integer('team_id')->nullable();
          $table->integer('user_id')->unsigned();
          $table->integer('sender_id')->unsigned();
          $table->unique(['user_id', 'sender_id']);
          $table->timestamps();
          $table->foreign('user_id')->references('id')->on('users');
          $table->foreign('sender_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invites');
    }
}
