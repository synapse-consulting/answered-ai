<?php

use \Illuminate\Support\Facades\Log; 

if (!function_exists('getGmtTimezones')) {
    function getGmtTimezones(): array
    {
        $timezones = DateTimeZone::listIdentifiers();
        $timezoneList = [];

        foreach ($timezones as $timezone) {
            $dt = new DateTime('now', new DateTimeZone($timezone));
            $offset = $dt->getOffset();

            $hours = intval($offset / 3600);
            $minutes = abs(intval($offset % 3600 / 60));

            $formattedOffset = sprintf("GMT%+03d:%02d", $hours, $minutes);

            // Extract the readable part of the timezone
            $prettyName = str_replace('_', ' ', basename($timezone));

            $label = "($formattedOffset) $prettyName";

            $timezoneList[] = [
                'timezone' => $timezone,
                'label'    => $label,
                'offset'   => $offset,
            ];
        }

        // Sort by offset
        usort($timezoneList, fn($a, $b) => $a['offset'] <=> $b['offset']);

        return $timezoneList;
    }
}

if (!function_exists('info')) {
    function info(string $message, array $context = [])
    {
        Log::info($message, $context); 
    }
}

if (!function_exists('error')) {
    function error(string $message, array $context = [], $exception = null)
    {
        if ($exception) {
            $context['exception_message'] = $exception->getMessage();
            $context['exception_trace'] = $exception->getTraceAsString();
        }

        Log::error($message, $context);
    }
}
