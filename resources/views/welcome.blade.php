@extends('layouts.app')

@section('content')
<div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Main Content -->
    <main class="flex-1 p-8">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back!</h1>
                <button class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <i class="fas fa-plus"></i>
                    New Project
                </button>
            </div>

            <!-- Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <!-- AI Integration Card -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-3">
                        <div class="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                            <i class="fas fa-robot text-primary text-2xl"></i>
                        </div>
                        <div>
                            <h2 class="font-semibold text-lg text-gray-900 dark:text-white">AI Integrations</h2>
                            <p class="text-gray-500 dark:text-gray-400 text-sm">Connect your favorite AI tools</p>
                        </div>
                    </div>
                </div>

                <!-- Wallet Card -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-3">
                        <div class="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg">
                            <i class="fas fa-wallet text-amber-500 text-2xl"></i>
                        </div>
                        <div>
                            <h2 class="font-semibold text-lg text-gray-900 dark:text-white">Wallet</h2>
                            <p class="text-gray-500 dark:text-gray-400 text-sm">Manage your balance and transactions</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 class="font-semibold text-lg text-gray-900 dark:text-white mb-4">Recent Activity</h2>
                <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li class="py-3 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full bg-primary"></div>
                            <span class="text-gray-700 dark:text-gray-300">Connected OpenAI API</span>
                        </div>
                        <span class="text-xs text-gray-400">2 hours ago</span>
                    </li>
                    <li class="py-3 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full bg-amber-500"></div>
                            <span class="text-gray-700 dark:text-gray-300">Added funds to wallet</span>
                        </div>
                        <span class="text-xs text-gray-400">1 day ago</span>
                    </li>
                    <li class="py-3 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full bg-green-500"></div>
                            <span class="text-gray-700 dark:text-gray-300">Created new project</span>
                        </div>
                        <span class="text-xs text-gray-400">2 days ago</span>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</div>
@endsection
