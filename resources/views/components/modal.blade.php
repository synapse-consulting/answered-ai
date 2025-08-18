@props([
    'id' => 'default-modal',
])

<div 
    id="{{ $id }}" 
    x-cloak
    x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in duration-200"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0"
    class="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center p-4"
>
    <div class="fixed inset-0 bg-black opacity-30"></div>
    <div class="relative w-full max-w-2xl max-h-full z-50">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            
            @isset($header)
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
                {{ $header }}
                <button 
                    type="button" 
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                    @click="$el.closest('[x-data]').showCreateModal = false; $el.closest('[x-data]').showEditModal = false;"
                >
                    <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            @endisset
            
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
                {{ $slot }}
            </div>
            
            @isset($footer)
            <!-- Modal footer -->
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                {{ $footer }}
            </div>
            @endisset
        </div>
    </div>
</div>