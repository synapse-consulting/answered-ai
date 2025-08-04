@props([
    'type' => 'text',
    'name',
    'label' => '',
    'placeholder' => '',
    'value' => '',
    'required' => false,
    'class' => '',
    'validate' => null
])

<div class="mb-4">
    @if ($label)
        <label for="{{ $name }}" class="block text-[#1F2937] text-sm font-medium mb-2">
            {{ $label }}
        </label>
    @endif

    <input 
        type="{{ $type }}" 
        name="{{ $name }}" 
        id="{{ $name }}"
        value="{{ old($name, $value) }}"
        placeholder="{{ $placeholder }}"
        {{ $required ? 'required' : '' }}
        {{ $attributes->merge(['class' => ' text-black w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:black ' . $class]) }}
    />
    @if($validate)
        @error($validate)
            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
        @enderror
    @endif
</div>
