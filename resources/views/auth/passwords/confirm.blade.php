@extends('layouts.auth')
@section('title', 'Forgot Password')
@section('content')
    <div class="flex flex-col flex-1 w-full lg:w-1/2">
        <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
                <div class="mb-5 sm:mb-8">
                    <h1 class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                        Forgot Password
                    </h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>
                <div>
                    @if (session('status'))
                        <div class="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('password.email') }}">
                        @csrf
                        <div class="space-y-5">
                            <!-- Email -->
                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Email<span class="text-error-500">*</span>
                                </label>
                                <input type="email" name="email" value="{{ old('email') }}" required autofocus
                                    placeholder="info@example.com"
                                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">

                                @error('email')
                                    <span class="text-sm text-error-500">{{ $message }}</span>
                                @enderror
                            </div>

                            <!-- Submit Button -->
                            <div>
                                <x-button class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition">
                                    Email Password Reset Link
                                </x-button>
                            </div>

                            <div class="text-sm text-center text-gray-600 dark:text-gray-400">
                                <a href="{{ route('login') }}" class="text-brand-600 hover:underline">Back to login</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
