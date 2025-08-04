<div class="flex items-center space-x-2">
@props([
    'id' => '',
    'name' => '',
    'label' => '',
    'value' => '',
    'checked' => false,
    'validate' => null,
])

<input type="radio"
       id="{{ $id }}"
       name="{{ $name }}"
       value="{{ $value }}"
       {{ $checked ? 'checked' : '' }}
       {{ $attributes->merge(['class' => 'custom-radio checked:bg-[#1F2937] checked:border-[#1F2937]  hover:border-[#1F2937] dark:hover:border-[#1F2937] mr-3 flex h-4 w-4 items-center justify-center rounded-full border-[1.25px] border-[#1F2937] bg-[#1F2937] ']) }}
/>

@if ($label)
    <label for="{{ $id }}" class="text-[#1F2937] text-sm flex items-center cursor-pointer">{{ $label }}</label>
@endif

@if ($validate)
    @error($validate)
        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
    @enderror
@endif
</div>
