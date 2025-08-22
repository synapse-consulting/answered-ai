<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::where('is_available', true)
            ->orderBy('category')
            ->get();

        return view('menu.index', compact('menus'));
    }

    /**
     * Get all available menus
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        $menus = Menu::query()
            ->when(request()->has('category'), function($query) {
                return $query->where('category', request('category'));
            })
            ->when(request()->has('is_available'), function($query) {
                return $query->where('is_available', request('is_available'));
            })
            ->orderBy('category')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $menus
        ]);
    }
}
