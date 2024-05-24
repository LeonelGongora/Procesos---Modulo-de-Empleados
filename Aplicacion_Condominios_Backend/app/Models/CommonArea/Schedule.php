<?php

namespace App\Models\CommonArea;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_schedule';

    protected $fillable = [
        'schedule_day',
        'start_hour',
        'end_hour',
        'id_common_area'
    ];

    public function commonArea()
    {
        return $this->belongsTo(CommonArea::class, 'id_common_area');
    }
}
