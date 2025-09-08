<?php

namespace App\Services\Integrations;

use App\DTOs\ScheduleDTO;
use App\Jobs\ScheduleJob;
use Carbon\Carbon;
use App\Services\BaseService;

class ScheduleService extends BaseService
{
    public function __construct(protected ScheduleDTO $schedule)
    {
        $this->scheduleJob($schedule);
    }

    public function scheduleJob(ScheduleDTO $schedule): void
    {
        $startDate = Carbon::parse($schedule->initialDate)
                ->add($schedule->durationBetween, $schedule->interval);
        info('fn: scheduleJob - ', [
            'startDate' => $startDate, 
        ]); 

        dispatch(new ScheduleJob($schedule))->delay($startDate);
    }
}
