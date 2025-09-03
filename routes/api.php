<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MetaIntegrationController;
use App\Http\Controllers\Api\V1\Integrations\ShopifyController;
use App\Http\Controllers\Api\V1\CredentialController;
use App\Http\Controllers\Api\V1\IntegrationController;
use App\Http\Controllers\Api\V1\WorkflowController;
use App\Http\Controllers\HomeController;

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

Route::post('/recieve-message', [MetaIntegrationController::class, 'webhookPost'])->name('api.recieve.message');
Route::post('/compose-message', [ChatController::class, 'composeMessage'])->name('api.compose.message');

Route::get('/menus', [MenuController::class, 'list'])->name('api.menus.list');

// Order Routes
Route::post('/orders', [OrderController::class, 'store'])->name('api.orders.store');
Route::get('/orders/{orderId}', [OrderController::class, 'show'])->name('api.orders.show');
Route::resource('credentials', CredentialController::class);  
Route::resource('workflow', WorkflowController::class);  

Route::post('/integration', [IntegrationController::class, 'integrate'])->name('api.integration');

Route::group(['prefix' => 'integrations'], function () {
    Route::group(['prefix' => 'shopify'], function () {
        Route::post('/create-order', [ShopifyController::class, 'createOrder'])->name('api.shopify.create.order');
        Route::get('/orders/{id}', [ShopifyController::class, 'getOrder'])->name('api.shopify.get.order');
        Route::get('/products', [ShopifyController::class, 'getProducts'])->name('api.shopify.get.products');
        Route::get('/sales', [ShopifyController::class, 'getSales'])->name('api.shopify.get.sales');
    });    
});