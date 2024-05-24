<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GestDepartamento\Residente;

class ResidenteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        //Residente::truncate();
        Residente::factory()->count(8)->create();
        /* $residenteData = [
            [
                'nombre_residente' => 'Juan',
                'apellidos_residente' => 'Pérez',
                'cedula_residente' => '72845678',
                'telefono_residente' => '555-1234',
                'fecha_nacimiento_residente' => '1990-05-15',
                'tipo_residente' => 'Propietario', // O 'inquilino' o 'titular'
                'nacionalidad_residente' => 'Mexicana',
                'email_residente' => 'jua123n@example.com',
                'genero_residente' => 'masculino',
                'estado_residente' => true,
                'imagen_residente' => 'departamento/images/residentes/residente_default.png',
                'contrato_id' => 1, // ID del contrato asociado
            ],
            [
                'nombre_residente' => 'María',
                'apellidos_residente' => 'López',
                'cedula_residente' => '87654321',
                'telefono_residente' => '555-5678',
                'fecha_nacimiento_residente' => '1985-08-20',
                'tipo_residente' => 'Titular', // O 'propietario' o 'titular'
                'nacionalidad_residente' => 'Colombiana',
                'email_residente' => 'mar21ia@example.com',
                'genero_residente' => 'femenino',
                'estado_residente' => true,
                'imagen_residente' => 'departamento/images/residentes/residente_default.png',
                'contrato_id' => 1, // ID del contrato asociado
            ],
            [
                'nombre_residente' => 'Ana',
                'apellidos_residente' => 'García',
                'cedula_residente' => '23456789',
                'telefono_residente' => '555-9876',
                'fecha_nacimiento_residente' => '1982-03-10',
                'tipo_residente' => 'Propietario', // O 'propietario' o 'inquilino'
                'nacionalidad_residente' => 'Española',
                'email_residente' => 'ana2752@example.com',
                'genero_residente' => 'femenino',
                'estado_residente' => true,
                'imagen_residente' => 'departamento/images/residentes/residente_default.png',
                'contrato_id' => 3, // ID del contrato asociado
            ],
            [
                'nombre_residente' => 'Carlos',
                'apellidos_residente' => 'Martínez',
                'cedula_residente' => '34567890',
                'telefono_residente' => '555-5432',
                'fecha_nacimiento_residente' => '1975-11-25',
                'tipo_residente' => 'Titular', // O 'titular' o 'inquilino'
                'nacionalidad_residente' => 'Argentino',
                'email_residente' => 'c195arlos@example.com',
                'genero_residente' => 'masculino',
                'estado_residente' => true,
                'imagen_residente' => 'departamento/images/residentes/residente_default.png',
                'contrato_id' => 4, // ID del contrato asociado
            ],
            [
                'nombre_residente' => 'Laura',
                'apellidos_residente' => 'Gutiérrez',
                'cedula_residente' => '98765432',
                'telefono_residente' => '555-6789',
                'fecha_nacimiento_residente' => '1988-09-22',
                'tipo_residente' => 'Propietario',
                'nacionalidad_residente' => 'Chilena',
                'email_residente' => 'lau184ra@example.com',
                'genero_residente' => 'femenino',
                'estado_residente' => true,
                'imagen_residente' => 'departamento/images/residentes/residente_default.png',
                'contrato_id' => 5,
            ],
            [
                'nombre_residente' => 'Pedro',
                'apellidos_residente' => 'Ramírez',
                'cedula_residente' => '87654321',
                'telefono_residente' => '555-5432',
                'fecha_nacimiento_residente' => '1992-11-10',
                'tipo_residente' => 'Titular',
                'nacionalidad_residente' => 'Uruguaya',
                'email_residente' => 'p21edro@example.com',
                'genero_residente' => 'masculino',
                'estado_residente' => true,
                'imagen_residente' => 'departamento/images/residentes/residente_default.png',
                'contrato_id' => 6,
            ],
            // Agrega más filas según sea necesario
        ];
        foreach($residenteData as $residente){
            Residente::create($residente);
        } */
        // Crear los residentes utilizando createMany()
        //Residente::createMany($residenteData);
    }
}
