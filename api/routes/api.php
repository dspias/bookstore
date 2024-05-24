<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Registered all auth related routes
// require __DIR__.'/auth.php';

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');
