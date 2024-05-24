<?php

namespace App\Models\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class edificio extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'nombre_edificio',
        'descripcion_edificio',
        'imagen_edificio',
        'cantidad_pisos',
        'bloque_id'
    ];
    public function departamentos()
    {
        return $this->hasMany(departamento::class);
    }
    public function bloques()
    {
        return $this->belongsTo(bloque::class);
    }
}
