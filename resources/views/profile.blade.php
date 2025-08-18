@extends('layouts.app')
@section('title', 'Profile')
@section('content')
    <div class="grid grid-cols-12">
        <div class="col-span-12">
            <div class="flex h-screen text-white">
                <x-profile-sidebar />
                
                <div class="flex-1 overflow-y-auto dark-scrollbar bg-white">
                    <div class="flex items-center p-4 justify-between pb-6 border-b border-gray-200">
                        <div>
                            <h1 class="text-xl font-semibold text-gray-800">Profile Settings</h1>
                            <p class="text-sm text-gray-500">Manage your account preferences and personal information</p>
                        </div>
                        <x-button>
                            Save changes
                        </x-button>
                    </div>
                    <div class="bg-white rounded-md shadow p-6 mb-6">
                        <h2 class="text-lg font-semibold text-[#1F2937] mb-4">Personal Information</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="flex items-center space-x-4">
                                <div
                                    class="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-3xl text-gray-300">
                                    JD</div>
                                <div>
                                    <button class="text-sm text-blue-400 hover:text-blue-300 focus:outline-none">Change
                                        photo</button>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>

                                    <x-input label="First name" type="text" name="first_name" id="first_name"
                                        value="{{ request()->user()->name }}" />
                                </div>
                                <div>
                                    <x-input type="text" name="last_name" label="Last name" id="last_name" />
                                </div>
                            </div>
                            <div>
                                <x-input type="email" label="Email" name="email" id="email"
                                    value="{{ request()->user()->name }}" />
                            </div>
                            <div>
                                <x-input type="text" name="phone" label="Phone" id="phone" />
                            </div>
                            <div class="md:col-span-2">
                                <x-textarea id="bio" label="Bio" name="bio" rows="3"></x-textarea>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-md shadow p-6 mb-6">
                        <h2 class="text-lg font-semibold mb-4 text-[#1F2937]">Preferences</h2>
                        <div>
                            <x-select name="language" label="Language" :options="[
                                'english' => 'English',
                                'french' => 'French',
                                'dutch' => 'Dutch',
                            ]" />

                        </div>
                        <div class="mt-4">
                            <div class="relative">
                                <x-select name="timezone" label="Timezone" :options="collect(getGmtTimezones())->pluck('label', 'timezone')->toArray()" />
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="block text-[#1F2937] text-sm font-medium mb-1">Date format</label>
                            <div class="flex items-center space-x-4">
                                <div class="relative">
                                    <x-radio name="date_format" label="MM/DD/YYYY" />
                                </div>
                                <div class="relative">
                                    <x-radio name="date_format" label="DD/MM/YYYY" />
                                </div>
                                <div class="relative">
                                    <x-radio name="date_format" label="YYYY-MM-DD" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-md shadow p-6 mb-6">
                        <h2 class="text-lg font-semibold mb-4 text-[#1F2937]">Notification Settings</h2>
                        <div class="py-4 border-b border-gray-400 flex items-center justify-between">
                            <div>
                                <h3 class="text-md font-semibold text-[#1F2937]">New message notifications</h3>
                                <p class="text-sm text-gray-600">Get notified when you receive a new message</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer" checked>
                                <div
                                    class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                </div>
                            </label>
                        </div>
                        <div class="py-4 border-b border-gray-400 flex items-center justify-between">
                            <div>
                                <h3 class="text-md font-semibold text-[#1F2937]">Chat assignment notifications</h3>
                                <p class="text-sm text-gray-600">Get notified when a chat is assigned to you</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer" checked>
                                <div
                                    class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                </div>
                            </label>
                        </div>
                        <div class="py-4 border-b border-gray-400 flex items-center justify-between">
                            <div>
                                <h3 class="text-md font-semibold text-[#1F2937]">Email notifications</h3>
                                <p class="text-sm text-gray-600">Receive email summaries of unread messages</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer">
                                <div
                                    class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                </div>
                            </label>
                        </div>
                        <div class="py-4 flex items-center justify-between">
                            <div>
                                <h3 class="text-md font-semibold text-[#1F2937]">Desktop notifications</h3>
                                <p class="text-sm text-gray-600">Show notifications on your desktop</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer" checked>
                                <div
                                    class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection