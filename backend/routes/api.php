<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\AuthController;


Route::post('/login', [AuthController::class, 'login']);
Route::get('/users', [AuthController::class, 'getUser']);
Route::post('/register', [AuthController::class, 'register']);
Route::delete('/users/{id}', [AuthController::class, 'deleteUser']);
Route::put('/users/{id}', [AuthController::class, 'updateUser']);