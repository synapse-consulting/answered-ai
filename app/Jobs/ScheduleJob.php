<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use App\DTOs\ScheduleDTO;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ScheduleJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(protected ScheduleDTO $schedule) {}

    public function handle(): void
    {
       
        $response = Http::post('https://httpbin.org/post', [
            'nodeId' => $this->schedule->action,
        ]);

        // 🔹 Log response status and body
        Log::info('ScheduleJob executed', [
            'nodeId' => $this->schedule->action,
            'status' => $response->status(),
            'body'   => $response->json(),
        ]);

        if ($this->schedule->isRecurring) {
            $nextDate = Carbon::parse($this->schedule->initialDate)
                ->add($this->schedule->durationBetween, $this->schedule->interval);

            Log::info('Rescheduling next job', [
                'next_run' => $nextDate->toDateTimeString(),
                'interval' => $this->schedule->interval,
                'duration' => $this->schedule->durationBetween,
            ]);

            dispatch(new ScheduleJob(new ScheduleDTO(
                $nextDate->toDateTimeString(),
                $this->schedule->interval,
                $this->schedule->durationBetween,
                $this->schedule->isRecurring,
                $this->schedule->action,
            )))->delay($nextDate);
        }
    }

}
