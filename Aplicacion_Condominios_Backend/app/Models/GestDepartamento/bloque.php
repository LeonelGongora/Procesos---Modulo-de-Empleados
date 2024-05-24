<?php

namespace App\Models\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class bloque extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'nombre_bloque',
        'direccion_bloque',
        'descripcion_bloque',
        'imagen_bloque',
    ];
    public function bloques()
    {
        return $this->hasMany(edificio::class);
    }
}