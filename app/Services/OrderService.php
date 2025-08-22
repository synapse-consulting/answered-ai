<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Menu;
use Illuminate\Support\Str;

class OrderService
{
    public function createOrder(array $data)
    {
        $orderData = [
            'order_id' => $this->generateUniqueOrderId(),
            'customer_name' => $data['customer_name'],
            'customer_email' => $data['customer_email'],
            'customer_phone' => $data['customer_phone'] ?? null,
            'notes' => $data['notes'] ?? null,
            'total_amount' => 0,
            'status' => 'pending'
        ];

        $order = Order::create($orderData);
        
        $totalAmount = 0;
        foreach ($data['items'] as $item) {
            $menu = Menu::findOrFail($item['menu_id']);
            $subtotal = $menu->price * $item['quantity'];
            $totalAmount += $subtotal;

            $order->orderDetails()->create([
                'menu_id' => $item['menu_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $menu->price,
                'subtotal' => $subtotal
            ]);
        }

        $order->update(['total_amount' => $totalAmount]);
        
        return $this->getOrderById($order->order_id);
    }

    public function getOrderById(string $orderId)
    {
        return Order::with(['orderDetails.menu'])
            ->where('order_id', $orderId)
            ->firstOrFail();
    }

    private function generateUniqueOrderId(): string
    {
        $orderPrefix = 'ORD-';
        do {
            $orderId = $orderPrefix . strtoupper(Str::random(8));
        } while (Order::where('order_id', $orderId)->exists());

        return $orderId;
    }
}
