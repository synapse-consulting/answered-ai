@extends('layouts.app')
@section('content')
    <div class="p-4 mt-4 card">
        
        <!-- Heading with Icon and Button -->
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Workflows</h2>
            </div>
            <x-button href="{{ route('workflows.index') }}">
                + Create Workflow
            </x-button>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Intent
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($workflows as $workflow)
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                       <td class="px-6 py-4"> {{ $workflow->name }} </td>
                       <td class="px-6 py-4"> {{ $workflow?->intent?->name ?? 'No Intent Attached' }} </td>
                       <td class="px-6 py-4"> {{ $workflow->status == true ? 'Active' : 'In-Active' }} </td>
                       <td class="px-6 py-4">
                            <x-button href="{{ route('workflows.edit', $workflow->id) }}"><i class="fa fa-edit"></i></x-button>
                            <form action="{{ route('workflows.destroy', $workflow->id) }}" method="POST" class="inline">
                                @csrf
                                @method('DELETE')
                                <x-button type="submit" btntype="btn-danger" onclick="return confirm('Are you sure you want to delete this workflow?')">
                                    <i class="fa fa-trash"></i>
                                </x-button>
                            </form>
                       </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
