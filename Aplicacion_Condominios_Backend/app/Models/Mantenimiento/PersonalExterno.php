<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalExterno extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "personal_externo";
    protected $primaryKey = "idPersonalExterno";
    protected $fillable = ['nombre', 'telefono', 'direccion', 'idCategoria'];
    
    public function categoria() {
        return $this -> belongsTo(CategoriaServicio::class, 'idCategoria');
    }
}
