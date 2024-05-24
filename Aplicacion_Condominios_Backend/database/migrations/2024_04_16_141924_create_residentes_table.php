<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResidentesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('residentes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_residente');
            $table->string('apellidos_residente');
            $table->string('cedula_residente');
            $table->string('telefono_residente');
            $table->date('fecha_nacimiento_residente');
            $table->string('tipo_residente');
            $table->string('nacionalidad_residente');
            $table->string('email_residente')->unique();
            $table->string('genero_residente');
            $table->boolean('estado_residente');
            $table->string('imagen_residente');
            $table->unsignedBigInteger('contrato_id')->nullable(); //todavia no se si va a ser nullable
            $table->unsignedInteger('monto_pagar')->nullable();
            $table->foreign('contrato_id')->references('id')->on('contratos')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('residentes');
    }
}
