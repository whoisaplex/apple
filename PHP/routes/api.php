<?php

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/* Route::group(['middleware' => 'auth.basic'], function () { */
    Route::get('/users', 'UsersController@API_Users');
    Route::get('/me', 'UsersController@API_Show')->middleware('auth');
    Route::patch('/me', 'UsersController@API_Update')->middleware('auth');
    Route::post('/position', 'PositionsController@API_Create')->middleware('auth');
    Route::post('/invite', 'InvitesController@sendInvite')->middleware('auth');
    Route::patch('/invite', 'InvitesController@deleteInvite')->middleware('auth');
/* }); */
