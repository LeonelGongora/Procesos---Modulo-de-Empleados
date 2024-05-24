<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonalExternoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personal_externo', function (Blueprint $table) {
            $table->id('idPersonalExterno');
            $table->string('nombre', 45);
            $table->string('telefono', 20);
            $table->string('direccion');
            $table->bigInteger('idCategoria');
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
        Schema::dropIfExists('personal_externo');
    }
}
