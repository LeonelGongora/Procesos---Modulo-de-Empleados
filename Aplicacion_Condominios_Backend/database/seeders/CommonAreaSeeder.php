<?php

namespace Database\Seeders;

use App\Models\CommonArea\CommonArea;
use Illuminate\Database\Seeder;

class CommonAreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CommonArea::factory()->withoutTimestamps()->count(5)->create();
    }
}
