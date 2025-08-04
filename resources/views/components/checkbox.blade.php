<div class="flex items-center space-x-2">
@props([
    'id' => '',
    'name' => '',
    'label' => '',
    'value' => '1',
    'checked' => false,
    'validate' => null,
    
])

<input type="checkbox"
        id="{{ $id }}"
        name="{{ $name }}"
        value="{{ $value }}"
        {{ $checked ? 'checked' : '' }}
        {{ $attributes->merge(['class' => 'item-checkbox form-checkbox changeid rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ']) }}
/>

@if ($label)
    <label for="{{ $id }}" class="text-sm text-gray-700">{{ $label }}</label>
@endif

@if ($validate)
    @error($validate)
        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
    @enderror
@endif
</div>
