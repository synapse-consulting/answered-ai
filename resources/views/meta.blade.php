@extends('layouts.app')
@section('title', 'Meta Integration')
@section('content')
<div class="min-h-screen flex items-center justify-center bg-gray-50">
  <div class="max-w-md w-full p-6 bg-white rounded-2xl shadow-lg text-center space-y-6">
    <!-- Meta Icon -->
    <div class="flex justify-center">
      <img src="{{ asset('system/images/meta.png') }}" style="max-width: 50%" />
    </div>

    <!-- Heading -->
    <h2 class="text-2xl font-semibold text-gray-800">
      Connect your Meta Account
    </h2>

    <!-- Description -->
    <p class="text-gray-600 text-sm">
      Please connect your Meta account to continue using AI-based customer support.
    </p>

    <!-- Button -->
    <x-button href="{{ route('whatsapp.integration') }}">
      Connect with Meta
    </x-button>
  </div>
</div>
@endsection
