<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistroSolicitudTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('registro_solicitud', function (Blueprint $table) {
            $table->id('idRegistroSolicitud');
            $table->bigInteger('idCategoria');
            $table->bigInteger('idEstado')->nullable();
            $table->string('descripcion')->nullable();
            $table->string('nombrePropietario', 45)->nullable();
            $table->string('ubicacion', 45)->nullable();
            $table->string('numerReferencia', 20)->nullable();
            $table->string('encargado', 45)->nullable();
            $table->date('fechaSolicitud')->nullable();
            $table->date('fechaFinalizado')->nullable();
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
        Schema::dropIfExists('registro_solicitud');
    }
}
