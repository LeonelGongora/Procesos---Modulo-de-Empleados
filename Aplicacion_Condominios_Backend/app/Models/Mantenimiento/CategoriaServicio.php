<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriaServicio extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['id', 'catnombre', 'catdescripcion'];
}
