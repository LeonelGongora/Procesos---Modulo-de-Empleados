<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipment', function (Blueprint $table) {
            $table->id('id_equipment')->unique();
            $table->string('equipment_name')->unique();
            $table->date('admission_date')->useCurrent();
            $table->text('description');

            $table->unsignedBigInteger('id_common_area');

            $table->foreign('id_common_area')->references('id_common_area')->on('common_areas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('equipment');
    }
}
