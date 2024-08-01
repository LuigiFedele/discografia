<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tracks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('album_id');
            $table->string('name');

            $table->foreign('album_id')->references('id')->on('albums')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tracks');
    }
};