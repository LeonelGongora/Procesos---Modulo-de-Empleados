<?php
namespace Database\Factories\CommonArea;

use App\Models\CommonArea\CommonArea;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommonAreaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = CommonArea::class;
    public function definition()
    {
        $directory = public_path('common-areas/images/common-area');
        $ruta = 'common-areas/images/common-area';
        
        if (!\File::isDirectory($directory)) {
            \File::makeDirectory($directory, 0755, true, true);
        }
        $imageName = $this->faker->image($directory, 500, 512, null, false);
        $imagePath = $imageName ? $ruta . '/' . $imageName : 'common-areas/images/common-area/common-area_default.jpg';
        return [
            'common_area_name' => $this->faker->name,
            'description' => $this->faker->text(200),
            'capacity' => $this->faker->numberBetween(1, 10),
            'url_image' => $imagePath
        ];
    }

    public function withoutTimestamps()
    {
        return $this->state(function (array $attributes) {
            return [];
        });
    }
}
