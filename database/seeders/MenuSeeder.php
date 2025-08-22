<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Menu; 

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menuItems = [
            // Appetizers
            [
                'name' => 'Crispy Spring Rolls',
                'description' => 'Vegetable filled crispy rolls served with sweet chili sauce',
                'price' => 6.99,
                'category' => 'Appetizers',
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'Buffalo Wings',
                'description' => 'Spicy chicken wings served with blue cheese dip',
                'price' => 9.99,
                'category' => 'Appetizers',
                'is_available' => true,
                'image_url' => null,
            ],
            // Main Courses
            [
                'name' => 'Classic Cheeseburger',
                'description' => 'Angus beef patty with cheddar cheese, lettuce, tomato, and special sauce',
                'price' => 12.99,
                'category' => 'Main Course',
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'Grilled Salmon',
                'description' => 'Fresh Atlantic salmon with lemon herb butter',
                'price' => 24.99,
                'category' => 'Main Course',
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'Chicken Alfredo',
                'description' => 'Fettuccine pasta in creamy sauce with grilled chicken',
                'price' => 16.99,
                'category' => 'Main Course',
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'Vegetable Stir Fry',
                'description' => 'Mixed vegetables in garlic sauce with tofu',
                'price' => 14.99,
                'category' => 'Main Course',
                'is_available' => true,
                'image_url' => null,
            ],
            // Pizzas
            [
                'name' => 'Margherita Pizza',
                'description' => 'Fresh tomatoes, mozzarella, and basil',
                'price' => 15.99,
                'category' => 'Pizza',
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'Pepperoni Pizza',
                'description' => 'Classic pepperoni with mozzarella cheese',
                'price' => 16.99,
                'category' => 'Pizza',
                'is_available' => true,
                'image_url' => null,
            ],
            // Salads
            [
                'name' => 'Caesar Salad',
                'description' => 'Romaine lettuce, croutons, parmesan with caesar dressing',
                'price' => 10.99,
                'category' => 'Salads',
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'Greek Salad',
                'description' => 'Mixed greens, feta, olives, and Greek dressing',
                'price' => 11.99,
                'category' => 'Salads',
                'is_available' => true,
                'image_url' => null,
            ],
            // Seafood
            [
                'name' => 'Shrimp Scampi',
                'description' => 'Garlic butter shrimp with linguine',
                'price' => 22.99,
                'category' => 'Seafood',
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'Fish and Chips',
                'description' => 'Beer battered cod with tartar sauce',
                'price' => 18.99,
                'category' => 'Seafood',
                'is_available' => true,
                'image_url' => null,
            ],
            // Steaks
            [
                'name' => 'Ribeye Steak',
                'description' => '12oz ribeye with garlic mashed potatoes',
                'price' => 32.99,
                'category' => 'Steaks',
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'Filet Mignon',
                'description' => '8oz tender filet with seasonal vegetables',
                'price' => 34.99,
                'category' => 'Steaks',
                'is_available' => true,
                'image_url' => null,
            ],
            // Desserts
            [
                'name' => 'Chocolate Lava Cake',
                'description' => 'Warm chocolate cake with vanilla ice cream',
                'price' => 8.99,
                'category' => 'Desserts',
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'New York Cheesecake',
                'description' => 'Classic cheesecake with berry compote',
                'price' => 7.99,
                'category' => 'Desserts',
                'is_available' => true,
                'image_url' => null,
            ],
            // Beverages
            [
                'name' => 'Fresh Lemonade',
                'description' => 'House-made lemonade with mint',
                'price' => 3.99,
                'category' => 'Beverages',
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'Iced Tea',
                'description' => 'Fresh brewed unsweetened iced tea',
                'price' => 2.99,
                'category' => 'Beverages',
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'Craft Beer',
                'description' => 'Selection of local craft beers',
                'price' => 6.99,
                'category' => 'Beverages',
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'House Wine',
                'description' => 'Red or white house wine',
                'price' => 7.99,
                'category' => 'Beverages',
                'is_available' => true,
                'image_url' => null,
            ],
        ];

        foreach ($menuItems as $item) {
            Menu::create($item);
        }
    }
}