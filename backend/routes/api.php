<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('products/create',[ProductController::class, 'store']);
Route::get('products/',[ProductController::class, 'index']);
Route::get('products/{id}',[ProductController::class, 'show'])->whereNumber('id');
Route::put('products/{id}',[ProductController::class, 'update'])->whereNumber('id');
Route::delete('products/{id}',[ProductController::class, 'destroy'])->whereNumber('id');

// Route::get('/greeting', function () {
//     return 'Hello Oshadhi';
// });
