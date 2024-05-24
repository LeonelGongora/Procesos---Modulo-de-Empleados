<?php

namespace App\Http\Controllers\Mantenimiento;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mantenimiento\Estado;

class EstadoController extends Controller
{
    public function getEstado() {
        return response()->json(Estado::all(), 200);
    }
    
    public function getEstadoId($id) {
        $estado = Estado::find($id);
        
        if(is_null($estado)) {
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $response = $estado;
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
}
