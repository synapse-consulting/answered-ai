<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MetaIntegrationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\WorkflowController;
use App\Http\Controllers\IntentController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\KnowledgeBaseController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', [MenuController::class, 'index'])->name('menu.index');

Auth::routes(); 

Route::get('/webhook', [MetaIntegrationController::class, 'webhook'])->name('webhook');
Route::post('/webhook', [MetaIntegrationController::class, 'webhookPost'])->name('webhook.post');

Route::middleware(['auth'])->group(function () {
    
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::middleware(['verify_meta'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/chat', [ChatController::class, 'index'])->name('chat');
        Route::get('/chats/{id}', [ChatController::class, 'getMessages'])->name('chats');

        Route::resource('workflows', WorkflowController::class);
        Route::resource('knowledge-base', KnowledgeBaseController::class);
        
    });
    
    Route::group(['prefix' => 'meta'], function () {
        Route::get('/', [DashboardController::class, 'meta'])->name('meta.integration');
        Route::get('/whatsapp-integration', [MetaIntegrationController::class, 'redirectToMeta'])->name('whatsapp.integration');
        Route::get('/whatsapp-callback', [MetaIntegrationController::class, 'handleMetaCallback'])->name('whatsapp.callback');
    });

    Route::group(['prefix' => 'profile'], function () {
        Route::get('/', [ProfileController::class, 'index'])->name('profile');
        
        
        Route::group(['prefix' => 'workspace'], function () {
            Route::resource('intents', IntentController::class);
        });
    });
});