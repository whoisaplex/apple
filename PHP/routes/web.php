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
Route::get('/profile', function() {
    //$user = DB::table('users')->get('name')
    return view('profile/profile');
});
Route::get('/teams', function() {
    return view('profile/teams');
});
Route::post('/teams', 'TeamsController@store');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
