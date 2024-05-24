<?php

namespace App\Models\CommonArea;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_equipment';

    public function commonArea() 
    {
        $this->belongsTo(CommonArea::class, 'id_common_area');
    }
}
