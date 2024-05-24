<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GestDepartamento\Contrato;
class ContratoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        /* $contratoData = [
            [
                'fecha_inicio_contrato' => '2023-01-01',
                'fecha_fin_contrato' => '2024-12-31',
                'precio_contrato' => 1500.00,
                'tipo_contrato' => 'Venta',
                'vigente_contrato' => true,
                'departamento_id' => 1, // ID del departamento asociado
            ],
            [
                'fecha_inicio_contrato' => '2023-01-01',
                'fecha_fin_contrato' => '2024-10-23',
                'precio_contrato' => 1400.00,
                'tipo_contrato' => 'Alquiler',
                'vigente_contrato' => true,
                'departamento_id' => 1, // ID del departamento asociado
            ],
            [
                'fecha_inicio_contrato' => '2023-02-01',
                'fecha_fin_contrato' => '2024-07-30',
                'precio_contrato' => 2000.00,
                'tipo_contrato' => 'Venta',
                'vigente_contrato' => true,
                'departamento_id' => 2, // ID del departamento asociado
            ],
            [
                'fecha_inicio_contrato' => '2023-03-01',
                'fecha_fin_contrato' => '2024-06-30',
                'precio_contrato' => 1800.00,
                'tipo_contrato' => 'Alquiler',
                'vigente_contrato' => true,
                'departamento_id' => 3, // ID del departamento asociado
            ],
            [
                'fecha_inicio_contrato' => '2023-04-01',
                'fecha_fin_contrato' => '2024-09-30',
                'precio_contrato' => 2200.00,
                'tipo_contrato' => 'Venta',
                'vigente_contrato' => true,
                'departamento_id' => 4, // ID del departamento asociado
            ],
            [
                'fecha_inicio_contrato' => '2023-05-01',
                'fecha_fin_contrato' => '2024-10-31',
                'precio_contrato' => 1700.00,
                'tipo_contrato' => 'Alquiler',
                'vigente_contrato' => true,
                'departamento_id' => 5, // ID del departamento asociado
            ],
            // Puedes seguir agregando más filas según sea necesario
        ];
        // Crear los contratos utilizando createMany()
        //Contrato::createMany($contratoData);
        foreach($contratoData as $contrato){
            Contrato::create($contrato);
        } */
        Contrato::factory()->count(10)->create();

        //$this->call(ResidenteSeeder::class);

    }
}
