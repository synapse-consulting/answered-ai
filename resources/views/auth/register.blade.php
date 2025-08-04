@extends('layouts.auth')
@section('title', 'Register')
@section('content')
<div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
    <div class="flex flex-col justify-center flex-1 w-full max-w-2xl px-4 mx-auto sm:px-0">
        <div>
            <div class="mb-5 sm:mb-8">
                <h1 class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                    Create Account
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Sign up to get started!
                </p>
            </div>

            <form method="POST" action="{{ route('register') }}">
                @csrf
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <!-- Name -->
                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Name<span class="text-error-500">*</span>
                        </label>
                        <input type="text" name="name" value="{{ old('name') }}" required
                            class="w-full h-11 px-4 py-2.5 text-sm rounded-lg border bg-transparent shadow-theme-xs border-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                        @error('name')
                            <span class="text-sm text-error-500">{{ $message }}</span>
                        @enderror
                    </div>

                    <!-- Company Name -->
                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Company Name<span class="text-error-500">*</span>
                        </label>
                        <input type="text" name="company_name" value="{{ old('company_name') }}" required
                            class="w-full h-11 px-4 py-2.5 text-sm rounded-lg border bg-transparent shadow-theme-xs border-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                        @error('company_name')
                            <span class="text-sm text-error-500">{{ $message }}</span>
                        @enderror
                    </div>

                    <!-- Email -->
                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Email<span class="text-error-500">*</span>
                        </label>
                        <input type="email" name="email" value="{{ old('email') }}" required
                            class="w-full h-11 px-4 py-2.5 text-sm rounded-lg border bg-transparent shadow-theme-xs border-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                        @error('email')
                            <span class="text-sm text-error-500">{{ $message }}</span>
                        @enderror
                    </div>

                    <!-- Business WhatsApp -->
                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Business WhatsApp<span class="text-error-500">*</span>
                        </label>
                        <input type="text" name="business_whatsapp" value="{{ old('business_whatsapp') }}" required
                            class="w-full h-11 px-4 py-2.5 text-sm rounded-lg border bg-transparent shadow-theme-xs border-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                        @error('business_whatsapp')
                            <span class="text-sm text-error-500">{{ $message }}</span>
                        @enderror
                    </div>

                    <!-- Password -->
                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Password<span class="text-error-500">*</span>
                        </label>
                        <input type="password" name="password" required
                            class="w-full h-11 px-4 py-2.5 text-sm rounded-lg border bg-transparent shadow-theme-xs border-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                        @error('password')
                            <span class="text-sm text-error-500">{{ $message }}</span>
                        @enderror
                    </div>

                    <!-- Confirm Password -->
                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Confirm Password<span class="text-error-500">*</span>
                        </label>
                        <input type="password" name="password_confirmation" required
                            class="w-full h-11 px-4 py-2.5 text-sm rounded-lg border bg-transparent shadow-theme-xs border-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                    </div>
                </div>

                <!-- Button -->
                <div class="mt-6">
                    <x-button class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition">
                        Sign Up
                    </x-button>
                </div>
            </form>

            <div class="mt-5">
                <p class="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                    Already have an account?
                    <a href="{{ route('login') }}"
                        class="text-gray-800 hover:text-brand-600 dark:text-brand-400">Sign In</a>
                </p>
            </div>
        </div>
    </div>
</div>
@endsection
