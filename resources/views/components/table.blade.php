<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table custom-table">
        @if(isset($header))
            <thead>
                {{ $header }}
            </thead>
        @endif

        <!-- Body Slot -->
        <tbody>
            {{ $slot }}
        </tbody>
    </table>
</div>