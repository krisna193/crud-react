<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\KomentarController;
use App\Http\Controllers\FotoController;
use App\Http\Controllers\AlbumController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    
    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post ('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);
});

Route::post ('/signup', [AuthController::class, 'signup']);
Route::post ('/login', [AuthController::class, 'login']);

Route::get('likes', [LikeController::class, 'index']);
Route::get('likes/{id}', [LikeController::class, 'show']);
Route::post('likesaddnew', [LikeController::class, 'store']);
Route::put('likesupdate/{id}', [LikeController::class, 'update']);
Route::delete('likesdelete/{id}', [LikeController::class, 'destroy']);

Route::get('komentars', [KomentarController::class, 'index']);
Route::get('komentars/{id}', [KomentarController::class, 'show']);
Route::post('komentarsaddnew', [KomentarController::class, 'store']);
Route::put('komentarsupdate/{id}', [KomentarController::class, 'update']);
Route::delete('komentarsdelete/{id}', [KomentarController::class, 'destroy']);

Route::get('albums', [AlbumController::class, 'index']);
Route::get('albums/{id}', [AlbumController::class, 'show']);
Route::post('albumsaddnew', [AlbumController::class, 'store']);
Route::put('albumsupdate/{id}', [AlbumController::class, 'update']);
Route::delete('albumsdelete/{id}', [AlbumController::class, 'destroy']);

Route::get('fotos', [FotoController::class, 'index']);
Route::get('fotos/{id}', [FotoController::class, 'show']);
Route::post('fotosaddnew', [FotoController::class, 'store']);
Route::put('fotosupdate/{id}', [FotoController::class, 'update']);
Route::delete('fotosdelete/{id}', [FotoController::class, 'destroy']);