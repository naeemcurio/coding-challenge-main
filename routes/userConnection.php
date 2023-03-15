<?php

use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {

Route::get('/getSuggestions', [UserController::class,'index']);
Route::post('/sendRequest', [RequestController::class,'store']);
Route::get('/requests/{mode}', [RequestController::class,'index']);
Route::get('/requests/delete/{id}', [RequestController::class,'destroy']);
Route::get('/requests/accept/{id}', [RequestController::class,'update']);
Route::get('/getConnections', [ConnectionController::class,'index']);
Route::get('/connections/delete/{id}', [ConnectionController::class,'destroy']);
Route::get('/getCommonConnections/{id}', [ConnectionController::class,'show']);

});
