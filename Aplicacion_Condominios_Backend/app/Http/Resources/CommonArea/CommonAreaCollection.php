<?php

namespace App\Http\Resources\CommonArea;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CommonAreaCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($commonArea) {
            return [
                'id' => $commonArea->id_common_area,
                'name' => $commonArea->common_area_name,
                'description' => $commonArea->description,
                'capacity' => $commonArea->capacity,
                'urlImage' => $commonArea->url_image,
                'created_at' => $commonArea->created_at,
                'updated_at' => $commonArea->updated_at,
            ];
        });
    }
}
