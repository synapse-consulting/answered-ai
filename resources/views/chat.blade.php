@extends('layouts.app')
@section('title', 'Chat')
@section('content')
    <div x-data="chatComponent()" x-init="startPolling()">
        <!-- Breadcrumb Start -->
        <div x-data="{ pageName: `Chat` }">
        </div>
        <!-- Breadcrumb End -->

        <div class="h-screen overflow-hidden sm:h-screen">
            <div class="flex h-full flex-col xl:flex-row">
                <!-- Chat Sidebar Start -->
                <div @click.outside="isMobile = !isMobile"
                    class="flex-col border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:flex xl:w-1/4">
                    <!-- ====== Chat List Start -->
                    <div class="sticky px-4 pb-4 pt-4 sm:px-5 sm:pt-5 xl:pb-0">


                        @php
                            $selectedApp = null;
                            $appIdFromRequest = request()->get('app_id');

                            if ($apps->isNotEmpty()) {
                                // Try to match requested app_id
                                $selectedApp = $apps->firstWhere('id', $appIdFromRequest) ?? $apps->first();
                            }
                        @endphp

                        <div class="flex items-start justify-between">
                            <div>
                                <h3 class="text-theme-xl font-semibold text-gray-800 dark:text-white/90 sm:text-2xl">
                                    Chats
                                </h3>
                            </div>

                            <div x-data="{ openDropDown: false }" class="relative mt-2">
                                <button @click="openDropDown = !openDropDown"
                                    :class="openDropDown ? 'text-gray-700 dark:text-white' :
                                        'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'"
                                    class="text-xs flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
                                    {{ $selectedApp->name ?? 'No App Available' }}
                                    <svg :class="openDropDown ? 'rotate-180' : ''"
                                        class="h-4 w-4 transition-transform duration-200" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div x-show="openDropDown" @click.outside="openDropDown = false"
                                    class="absolute right-0 top-full z-40 w-40 space-y-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
                                    x-cloak>
                                    @forelse($apps as $app)
                                        <a href="{{ route('chat', ['app_id' => $app->id]) }}"
                                            class="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                            {{ $app->name }}
                                        </a>
                                    @empty
                                        <span class="block px-3 py-2 text-sm text-gray-400">No apps found</span>
                                    @endforelse
                                </div>
                            </div>
                        </div>


                        <div class="mt-4 flex items-center gap-3">
                            <button @click="isMobile = !isMobile"
                                class="flex h-11 w-full max-w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-400 xl:hidden">
                                <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M3.25 6C3.25 5.58579 3.58579 5.25 4 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75L4 6.75C3.58579 6.75 3.25 6.41422 3.25 6ZM3.25 18C3.25 17.5858 3.58579 17.25 4 17.25L20 17.25C20.4142 17.25 20.75 17.5858 20.75 18C20.75 18.4142 20.4142 18.75 20 18.75L4 18.75C3.58579 18.75 3.25 18.4142 3.25 18ZM4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75L20 12.75C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25L4 11.25Z"
                                        fill=""></path>
                                </svg>
                            </button>

                            <div class="relative my-2 w-full">
                                <form>
                                    <button class="absolute left-4 top-1/2 -translate-y-1/2">
                                        <svg class="fill-gray-500 dark:fill-gray-400" width="20" height="20"
                                            viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z"
                                                fill=""></path>
                                        </svg>
                                    </button>

                                    <input type="text" placeholder="Search..."
                                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-[42px] pr-3.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="no-scrollbar flex-col overflow-auto hidden xl:flex"
                        :class="isMobile ? 'flex fixed xl:static top-0 left-0 z-999999 h-screen bg-white dark:bg-gray-900' :
                            'hidden xl:flex'">
                        <div
                            class="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-800 xl:hidden">
                            <div>
                                <h3 class="text-theme-xl font-semibold text-gray-800 dark:text-white/90 sm:text-2xl">
                                    Chat
                                </h3>
                            </div>

                            <div class="flex items-center gap-1">
                                <div x-data="{ openDropDown: false }" class="relative -mb-1.5">
                                    <button @click="openDropDown = !openDropDown"
                                        :class="openDropDown ? 'text-gray-700 dark:text-white' :
                                            'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'"
                                        class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
                                        <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                                                fill=""></path>
                                        </svg>
                                    </button>
                                    <div x-show="openDropDown" @click.outside="openDropDown = false"
                                        class="absolute right-0 top-full z-40 w-40 space-y-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
                                        style="display: none;">
                                        <button
                                            class="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                            View More
                                        </button>
                                        <button
                                            class="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <button @click="isMobile = !isMobile"
                                    class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-400">
                                    <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                                            fill=""></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="flex max-h-full flex-col overflow-auto px-4 sm:px-5">
                            <div class="custom-scrollbar max-h-full space-y-1 overflow-auto">

                                @foreach ($contacts as $contact)
                                    <div @click="selectContact({{ $contact->id }})"
                                        class="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-white/[0.03]">
                                        <div class="relative h-12 w-full max-w-[48px] rounded-full">
                                            <img src="{{ asset('system/images/icons/chat-image.png') }}" alt="profile"
                                                class="h-full w-full overflow-hidden rounded-full object-cover object-center">
                                        </div>
                                        <div class="w-full">
                                            <h5 class="text-sm font-medium text-gray-800 dark:text-white/90">
                                                {{ $contact->contact->name }}
                                            </h5>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>

                    <!-- ====== Chat List End -->
                </div>
                <!-- Chat Sidebar End -->

                <!-- Chat Box Start -->
                <div
                    class="flex h-full flex-col overflow-hidden border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:w-3/4">
                    <!-- ====== Chat Box Start -->
                    <div
                        class="sticky flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800 xl:px-6">
                        <div class="flex items-center gap-3">
                            <div class="relative h-12 w-full max-w-[48px] rounded-full">
                                <img src="{{ asset('system') }}/images/icons/chat-image.png" alt="profile"
                                    class="h-full w-full overflow-hidden rounded-full object-cover object-center">
                                <span
                                    class="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900"></span>
                            </div>

                            <h5 x-text="contactName" class="text-sm font-medium text-gray-500 dark:text-gray-400">
                                
                            </h5>
                        </div>

                        <div class="flex items-center gap-3">
                            {{-- <div x-data="{ openDropDown: false }" class="relative -mb-1.5">
                                <button @click="openDropDown = !openDropDown"
                                    :class="openDropDown ? 'text-gray-800 dark:text-white/90' :
                                        'text-gray-700 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white/90'"
                                    class="text-gray-700 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white/90">
                                    <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                                            fill=""></path>
                                    </svg>
                                </button>
                                <div x-show="openDropDown" @click.outside="openDropDown = false"
                                    class="absolute right-0 top-full z-40 w-40 space-y-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
                                    style="display: none;">
                                    <button
                                        class="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                        View More
                                    </button>
                                    <button
                                        class="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                        Delete
                                    </button>
                                </div>
                            </div> --}}
                        </div>
                    </div>

                    <div class="custom-scrollbar max-h-full flex-1 space-y-6 overflow-auto p-5 xl:space-y-8 xl:p-6">


                        <div class="w-full flex flex-col p-4 space-y-4 overflow-auto" id="chatContainer">
                            <template x-for="message in messages" :key="message.message_id">
                                <div :class="message.direction === 'inbound' ? 'text-left' : 'text-right ml-auto'">
                                    <div :class="message.direction === 'inbound' ? 'bg-gray-100 text-gray-800 dark:bg-white/5' :
                                        'bg-brand-500 text-white dark:bg-brand-500'"
                                        class="inline-block rounded-lg px-3 py-2 max-w-[350px]">
                                        <p class="text-sm" x-text="message.message_text"></p>
                                    </div>
                                    <p class="mt-1 text-xs text-gray-500" x-text="timeAgo(message.timestamp)"></p>
                                </div>
                            </template>
                        </div>

                    </div>
                    <!-- compose -->
                    <div class="sticky bottom-0 border-t border-gray-200 p-3 dark:border-gray-800 hidden">
                        <form class="flex items-center justify-between">
                            <div class="relative w-full">
                                <button
                                    class="absolute left-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90 sm:left-3">
                                    <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12ZM10.0001 9.23256C10.0001 8.5422 9.44042 7.98256 8.75007 7.98256C8.05971 7.98256 7.50007 8.5422 7.50007 9.23256V9.23266C7.50007 9.92301 8.05971 10.4827 8.75007 10.4827C9.44042 10.4827 10.0001 9.92301 10.0001 9.23266V9.23256ZM15.2499 7.98256C15.9403 7.98256 16.4999 8.5422 16.4999 9.23256V9.23266C16.4999 9.92301 15.9403 10.4827 15.2499 10.4827C14.5596 10.4827 13.9999 9.92301 13.9999 9.23266V9.23256C13.9999 8.5422 14.5596 7.98256 15.2499 7.98256ZM9.23014 13.7116C8.97215 13.3876 8.5003 13.334 8.17625 13.592C7.8522 13.85 7.79865 14.3219 8.05665 14.6459C8.97846 15.8037 10.4026 16.5481 12 16.5481C13.5975 16.5481 15.0216 15.8037 15.9434 14.6459C16.2014 14.3219 16.1479 13.85 15.8238 13.592C15.4998 13.334 15.0279 13.3876 14.7699 13.7116C14.1205 14.5274 13.1213 15.0481 12 15.0481C10.8788 15.0481 9.87961 14.5274 9.23014 13.7116Z"
                                            fill=""></path>
                                    </svg>
                                </button>

                                <input type="text" placeholder="Type a message"
                                    class="h-9 w-full border-none bg-transparent pl-12 pr-5 text-sm text-gray-800 outline-hidden placeholder:text-gray-400 focus:border-0 focus:ring-0 dark:text-white/90">
                            </div>

                            <div class="flex items-center">
                                <button
                                    class="mr-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                                    <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M12.9522 14.4422C12.9522 14.452 12.9524 14.4618 12.9527 14.4714V16.1442C12.9527 16.6699 12.5265 17.0961 12.0008 17.0961C11.475 17.0961 11.0488 16.6699 11.0488 16.1442V6.15388C11.0488 5.73966 10.7131 5.40388 10.2988 5.40388C9.88463 5.40388 9.54885 5.73966 9.54885 6.15388V16.1442C9.54885 17.4984 10.6466 18.5961 12.0008 18.5961C13.355 18.5961 14.4527 17.4983 14.4527 16.1442V6.15388C14.4527 6.14308 14.4525 6.13235 14.452 6.12166C14.4347 3.84237 12.5817 2 10.2983 2C8.00416 2 6.14441 3.85976 6.14441 6.15388V14.4422C6.14441 14.4492 6.1445 14.4561 6.14469 14.463V16.1442C6.14469 19.3783 8.76643 22 12.0005 22C15.2346 22 17.8563 19.3783 17.8563 16.1442V9.55775C17.8563 9.14354 17.5205 8.80775 17.1063 8.80775C16.6921 8.80775 16.3563 9.14354 16.3563 9.55775V16.1442C16.3563 18.5498 14.4062 20.5 12.0005 20.5C9.59485 20.5 7.64469 18.5498 7.64469 16.1442V9.55775C7.64469 9.55083 7.6446 9.54393 7.64441 9.53706L7.64441 6.15388C7.64441 4.68818 8.83259 3.5 10.2983 3.5C11.764 3.5 12.9522 4.68818 12.9522 6.15388L12.9522 14.4422Z"
                                            fill=""></path>
                                    </svg>
                                </button>

                                <button
                                    class="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                                    <svg class="stroke-current" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="7" y="2.75" width="10" height="12.5" rx="5" stroke=""
                                            stroke-width="1.5"></rect>
                                        <path
                                            d="M20 10.25C20 14.6683 16.4183 18.25 12 18.25C7.58172 18.25 4 14.6683 4 10.25"
                                            stroke="" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path d="M10 21.25H14" stroke="" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                        <path d="M12 18.25L12 21.25" stroke="" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M12 7.5L12 10.5" stroke="" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M14.5 8.25L14.5 9.75" stroke="" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M9.5 8.25L9.5 9.75" stroke="" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>

                                <button
                                    class="ml-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white hover:bg-brand-600 xl:ml-5">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M4.98481 2.44399C3.11333 1.57147 1.15325 3.46979 1.96543 5.36824L3.82086 9.70527C3.90146 9.89367 3.90146 10.1069 3.82086 10.2953L1.96543 14.6323C1.15326 16.5307 3.11332 18.4291 4.98481 17.5565L16.8184 12.0395C18.5508 11.2319 18.5508 8.76865 16.8184 7.961L4.98481 2.44399ZM3.34453 4.77824C3.0738 4.14543 3.72716 3.51266 4.35099 3.80349L16.1846 9.32051C16.762 9.58973 16.762 10.4108 16.1846 10.68L4.35098 16.197C3.72716 16.4879 3.0738 15.8551 3.34453 15.2223L5.19996 10.8853C5.21944 10.8397 5.23735 10.7937 5.2537 10.7473L9.11784 10.7473C9.53206 10.7473 9.86784 10.4115 9.86784 9.99726C9.86784 9.58304 9.53206 9.24726 9.11784 9.24726L5.25157 9.24726C5.2358 9.20287 5.2186 9.15885 5.19996 9.11528L3.34453 4.77824Z"
                                            fill="white"></path>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                    <!-- ====== Chat Box End -->
                </div>
                <!-- Chat Box End -->
            </div>
        </div>
    </div>
@endsection
<script>
    function chatComponent() {
        return {
            selectedContactId: null,
            messages: [],
            pollingInterval: null,
            contactName:null,
            isMobile:false, 
            
            selectContact(id) {
                this.selectedContactId = id;
                this.loadMessages();
                console.log(window.appUrl)
            },

            loadMessages() {
                if (!this.selectedContactId) return;
                fetch(window.appUrl + `/chats/${this.selectedContactId}`)
                    .then(res => res.json())
                    .then(data => {
                        this.messages = data.chats;
                        this.contactName = data.contact.contact.name;
                        this.scrollToBottom();
                    });
            },

            startPolling() {
                this.pollingInterval = setInterval(() => {
                    this.loadMessages();
                }, 3000);
            },

            scrollToBottom() {
                this.$nextTick(() => {
                    const container = document.getElementById('chatContainer');
                    container.scrollTop = container.scrollHeight;
                });
            },

            timeAgo(datetime) {
                const now = new Date();
                const time = new Date(datetime);
                const diff = Math.floor((now - time) / 60000); // minutes

                if (diff < 1) return 'just now';
                if (diff < 60) return `${diff} mins ago`;
                const hours = Math.floor(diff / 60);
                return `${hours} hours ago`;
            }
        }
    }
</script>
