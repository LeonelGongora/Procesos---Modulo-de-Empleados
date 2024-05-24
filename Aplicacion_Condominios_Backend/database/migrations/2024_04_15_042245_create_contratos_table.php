<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContratosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contratos', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_inicio_contrato');
            $table->date('fecha_fin_contrato')->nullable();
            $table->decimal('precio_contrato', 8, 2);
            $table->string('tipo_contrato');
            $table->boolean('vigente_contrato');
            $table->unsignedBigInteger('departamento_id')->nullable();  //haciendo departamento_id nullable nose si sea necesario aqui
            $table->foreign('departamento_id')->references('id')->on('departamentos')->onDelete('cascade');
            
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
        Schema::dropIfExists('contratos');
    }
}
