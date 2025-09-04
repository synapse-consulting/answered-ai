<?php

namespace App\Services;

use App\Models\KnowledgeBase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class KnowledgeBaseService
{
    protected string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = rtrim(config('services.knowledge_base.url', 'http://64.225.124.27:8000'), '/');
    }

    public function store(array $data): KnowledgeBase
    {
        $url = null;

        // Upload to S3 if file/pdf
        if (in_array($data['type'], ['pdf', 'file']) && isset($data['file'])) {
            $path = Storage::disk('s3')->put('knowledge-base', $data['file']);
            $url  = Storage::disk('s3')->url($path);

        } elseif ($data['type'] === 'web') {
            $url = $data['url'];
        }

        $payload = [
            'type'    => $data['type'],
            'url'     => $url,
            'user_id' => (string) request()->user()->id,
        ];

        $response = Http::acceptJson()
            ->post($this->baseUrl . '/process', $payload);

        if ($response->failed()) {
            throw new RequestException($response);
        }

        $result = $response->json();

        // status should come from API response
        $status = isset($result['status']) && !empty($result['status']) ? $result['status'] : 'active'; 
        $taskId = isset($result['task_id']) && !empty($result['task_id']) ? $result['task_id'] : null; 


        return KnowledgeBase::create([
            'title'  => $data['title'],
            'type'   => $data['type'],
            'url'    => $url,
            'status' => $status,
            'task_id' => $taskId
        ]);
    }

    public function delete(KnowledgeBase $knowledgeBase): bool
    {
        if (in_array($knowledgeBase->type, ['pdf', 'file'])) {
            $parsedUrl = parse_url($knowledgeBase->url, PHP_URL_PATH);
            $path = ltrim($parsedUrl, '/');
            Storage::disk('s3')->delete($path);
        }

        return $knowledgeBase->delete();
    }

}
