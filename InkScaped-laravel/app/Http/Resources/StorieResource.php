<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StorieResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        $averageRating = $this->comments->avg('rating');
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'author' => $this->user->username,
            'prompt' => $this->dalyPrompts->prompt_text,
            'created_at' => $this->created_at->format('Y-m-d'),
            'rating' => $averageRating,
        ];
    }
}
