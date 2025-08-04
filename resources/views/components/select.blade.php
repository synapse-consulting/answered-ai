@props([
    'name',
    'label' => '',
    'placeholder' => '',
    'required' => false,
    'class' => '',
    'options' => [],
    'selected' => null, 
    'validate' => null, 
    'id' => null,
])

@if ($label)
    <label for="{{ $id ?? $name }}" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {{ $label }}
        @if ($required)
            <span class="text-red-500">*</span>
        @endif
    </label>
@endif

<select
    id="{{ $id ?? $name }}"
    name="{{ $name }}"
    @if ($required) required @endif
    {{ $attributes->merge(['class' => 'dark:bg-dark-900 shadow-theme-xs  focus:ring-black  h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30' . $class]) }}
>
    @if($placeholder)
        <option value="" disabled {{ $selected === null || $selected === '' ? 'selected' : '' }}>
            {{ $placeholder }}
        </option>
    @endif

    @foreach ($options as $value => $label)
        <option 
            class="text-black dark:text-white dark:bg-gray-800 bg-white"
            value="{{ $value }}" 
            {{ (string) $selected === (string) $value ? 'selected' : '' }}
        >
            {{ $label }}
        </option>
    @endforeach
</select>

@if($validate)
    @error($validate)
        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
    @enderror
@endif
