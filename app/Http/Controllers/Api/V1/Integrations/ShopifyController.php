<?php

namespace App\Http\Controllers\Api\V1\Integrations;

use App\Http\Controllers\Controller;
use App\Services\Integrations\ShopifyService;
use Illuminate\Http\Request;

class ShopifyController extends Controller
{
    protected ShopifyService $shopify;

    public function __construct(ShopifyService $shopify)
    {
        $this->shopify = $shopify;
    }

    /**
     * Create an order
     */
    public function createOrder(Request $request)
    {
        $data = $request->validate([
            'lineItems' => 'required|array',
            'customer'  => 'required|array',
        ]);

        try {
            $order = $this->shopify->createOrder($data);
            return response()->json($order);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get order details
     */
    public function getOrder($id)
    {
        try {
            $gid = "gid://shopify/Order/{$id}";
            $order = $this->shopify->getOrder($gid);
            return response()->json($order);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get products
     */
    public function getProducts(Request $request)
    {
        $first = $request->input('first', 10);

        try {
            $products = $this->shopify->getProducts($first);
            return response()->json($products);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get sales data
     */
    public function getSales(Request $request)
    {
        $data = $request->validate([
            'from'  => 'required|date',
            'to'    => 'required|date',
            'first' => 'integer|min:1|max:100',
        ]);

        try {
            $sales = $this->shopify->getSalesData(
                $data['from'],
                $data['to'],
                $data['first'] ?? 10
            );
            return response()->json($sales);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
