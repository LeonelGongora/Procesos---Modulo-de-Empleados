<?php

namespace App\Models\CommonArea;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Policy extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_policy';

    protected $fillable = [
        'description',
        'id_common_area'
    ];

    public function commonArea()
    {
        return $this->belongsTo(CommonArea::class, 'id_common_area');
    }
}
