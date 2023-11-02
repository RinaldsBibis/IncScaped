<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\DalyPromptsController;
use App\Http\Controllers\StoriesController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

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

Route::post('/signup',[AuthController::class, 'signup']);
Route::post('/login',[AuthController::class, 'login']);

Route::get('/users_all',[UsersController::class, 'index']);
Route::get('/users/{id}',[UsersController::class, 'show']);



Route::get('/promptALL',[DalyPromptsController::class, 'index']);
Route::get('/prompts/{id}',[DalyPromptsController::class, 'show']);
Route::get('/latest_prompt',[DalyPromptsController::class, 'latest']);
Route::delete('/prompt/{id}', [DalyPromptsController::class, 'destroy']);
Route::post('/prompt',[DalyPromptsController::class, 'create']);    


Route::get('/storyAll',[StoriesController::class, 'index']);
Route::get('/stoiesAsc',[StoriesController::class, 'indexByRatingAsc']);
Route::get('/stoiesDesc',[StoriesController::class, 'indexByRatingDesc']);
Route::get('/story/{id}', [StoriesController::class, 'show']);


Route::delete('/comments/{id}', [CommentsController::class, 'destroy']);
Route::get('comments/{stories_id}', [CommentsController::class, 'getCommentsByStory']);

Route::post('/prompt',[DalyPromptsController::class, 'create']);

Route::middleware('auth:sanctum')->group(function(){
    Route::delete('/users/{id}',[UsersController::class, 'destroy']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout',[AuthController::class, 'logout']);    
    Route::post('/story',[StoriesController::class, 'create']);    
    Route::post('/comment',[CommentsController::class, 'create']); 
});
