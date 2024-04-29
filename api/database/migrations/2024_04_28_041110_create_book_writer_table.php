<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('book_writer', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('writer_id');
            $table->unsignedBiginteger('book_id');

            $table->foreign('writer_id')->references('id')
                ->on('writers')->onDelete('cascade');
            $table->foreign('book_id')->references('id')
                ->on('books')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_writer');
    }
};
