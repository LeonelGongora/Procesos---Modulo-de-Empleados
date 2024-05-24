<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "estado";
    protected $primaryKey = "idEstado";
    protected $fillable = ['nombreEstado'];
}
