@props([
    'type' => 'submit',
    'name' => null,
    'value' => null,
    'title' => null,
    'href' => null,
    'class' => '',
    'label' => '',
    'btntype' => 'btn-primary', 
    'disabled' => false,
])

    @php
        $btnTypeClass = ''; 
        switch ($btntype) {
            case 'btn-primary':
                $btnTypeClass = 'btn bg-gray-800 hover:bg-gray-900 text-white'; 
                break;

            case 'btn-danger':
                $btnTypeClass = 'btn bg-danger-600 hover:bg-danger-700 text-white'; 
                break;

            case 'btn-secondary':
                $btnTypeClass = 'btn bg-gray-600 hover:bg-gray-700 text-white'; 
                break;

            case 'btn-success':
                $btnTypeClass = 'btn bg-success-600 hover:bg-success-700 text-white'; 
                break;
            
            case 'btn-info':
                $btnTypeClass = 'btn bg-info-600 hover:bg-info-700 text-white'; 
                break;

            case 'btn-warning':
                $btnTypeClass = 'btn bg-warning-600 hover:bg-warning-700 text-white'; 
                break;

            case 'btn-dark':
                $btnTypeClass = 'btn bg-neutral-900 hover:bg-neutral-700 text-white'; 
                break;
            
            default:
                $btnTypeClass = 'btn bg-primary-600 hover:bg-primary-700 text-white '; 
                break;
        }

    @endphp

    @if ($label)
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ $label }}
        </label>
    @endif

    @if (!$href)
        <button 
            type="{{ $type }}"
            @if($name) name="{{ $name }}" @endif
            @if($value) value="{{ $value }}" @endif
            @if($title) title="{{ $title }}" @endif
            @if($disabled) disabled @endif
            {{ $attributes->merge(['class' => "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white transition rounded-lg shadow-theme-xs $btnTypeClass $class"]) }}
        >
            {!! $slot !!}
        </button>
    @else
        <a 
            href="{{ $href }}"
            @if($title) title="{{ $title }}" @endif
            {{ $attributes->merge(['class' => "inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg shadow-theme-xs $btnTypeClass $class"]) }}
        >
            {!! $slot !!}
        </a>
    @endif
