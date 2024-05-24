<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDepartamentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('departamentos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_departamento');
            $table->integer('numero_habitaciones');
            $table->integer('numero_personas');
            $table->integer('superficie');
            $table->boolean('disponibilidad');
            $table->boolean('amoblado');
            $table->boolean('ofertado_venta');
            $table->boolean('ofertado_alquiler');
            $table->boolean('ofertado_anticretico');
            $table->string('descripcion_departamento');
            $table->integer('piso');
            $table->string('imagen_departamento')->nullable();

            $table->foreignId('edificio_id')
                ->constrained('edificios')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('departamentos');
    }
}
