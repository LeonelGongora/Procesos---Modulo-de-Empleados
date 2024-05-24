<?php

namespace Database\Factories\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\Factory;

class BloqueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    //protected $model = Bloque::class;
    public function definition()
    {
        $nombres = ['Bloque A', 'Bloque B', 'Bloque C', 'Bloque D', 'Bloque E', 'Bloque F', 'Bloque G', 'Bloque H', 'Bloque I', 'Bloque J', 'Bloque K', 'Bloque L', 'Bloque M', 'Bloque N', 'Bloque O', 'Bloque P', 'Bloque Q', 'Bloque R', 'Bloque S', 'Bloque T', 'Bloque U', 'Bloque V', 'Bloque W', 'Bloque X', 'Bloque Y', 'Bloque Z'];
        return [
            //
            'nombre_bloque' => $this->faker->randomElement($nombres),
            'direccion_bloque' => $this->faker->address,
            'descripcion_bloque' => $this->faker->text(200),
            'imagen_bloque' => $this->faker->imageUrl(640, 480, 'animals', true)
        ];
    }

    public function withoutTimestamps()
    {
        return $this->state(function (array $attributes) {
            return [];
        });
    }
}
