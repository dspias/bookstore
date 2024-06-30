<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Registered all auth related routes
// require __DIR__.'/auth.php';

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::get('/test', function (Request $request) {
    return response()->json([
        'status' => 'success',
        'data' => [
            'id' => 1,
            'name' => "Pias",
            'email' => "pias@mail.com",
        ]
    ]);
});
