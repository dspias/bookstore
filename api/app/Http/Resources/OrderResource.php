<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'oid' => $this->oid,
            'status' => $this->status,
            'quantity' => $this->quantity,
            'points' => $this->points,
            'book' => $this->when($this->book, BookResource::make($this->book)),

            'createdAt' => $this->created_at,
            'caneledAt' => $this->caneled_at,
        ];
    }
}
