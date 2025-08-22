<x-frontend-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">Our Menu</h1>
            
            {{-- Category sections --}}
            @php
                $groupedMenus = $menus->groupBy('category');
            @endphp

            @foreach($groupedMenus as $category => $items)
                <div class="mb-12">
                    <h2 class="text-2xl font-semibold text-gray-700 mb-6 capitalize">{{ $category }}</h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        @foreach($items as $menu)
                            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                @if($menu->image_url)
                                    <img src="{{ $menu->image_url }}" 
                                         alt="{{ $menu->name }}" 
                                         class="w-full h-48 object-cover">
                                @else
                                    <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
                                        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                @endif
                                
                                <div class="p-6">
                                    <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ $menu->name }}</h3>
                                    <p class="text-gray-600 mb-4 text-sm">{{ $menu->description }}</p>
                                    <div class="flex justify-between items-center">
                                        <span class="text-xl font-bold text-emerald-600">${{ number_format($menu->price, 2) }}</span>
                                        @if($menu->is_available)
                                            <span class="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full">Available</span>
                                        @else
                                            <span class="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">Sold Out</span>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</x-app-layout>
