<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\IntentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MetaIntegrationController;


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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/recieve-message', [MetaIntegrationController::class, 'webhookPost'])->name('api.recieve.message');
Route::post('/compose-message', [ChatController::class, 'composeMessage'])->name('api.compose.message');

// Intent API Routes
Route::post('/intents', [IntentController::class, 'store'])->name('api.intents.store');
Route::put('/intents/{id}', [IntentController::class, 'update'])->name('api.intents.update');
Route::delete('/intents/{id}', [IntentController::class, 'destroy'])->name('api.intents.destroy');
