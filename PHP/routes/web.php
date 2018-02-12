<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

//Only for logged in users
Route::middleware('auth')->group(function () {
  Route::get('/teams', 'TeamsController@index')->name('teams');
  Route::get('/teams/{team}', 'TeamsController@show');
  Route::post('/teams', 'TeamsController@store');
  Route::get('/home', 'HomeController@index')->name('home');
  Route::get('/users', 'UsersController@index')->name('users');
  Route::get('/users/{user}', 'UsersController@show');
  Route::get('/game', 'GameController@index');
  Route::get('/colormatch', 'QuestsController@colormatch');
  Route::get('/swiftwrite', 'QuestsController@swiftwrite');
  Route::get('/wordmatch', 'QuestsController@wordmatch');
  Route::post('/invite', 'InvitesController@sendInvite');
});
