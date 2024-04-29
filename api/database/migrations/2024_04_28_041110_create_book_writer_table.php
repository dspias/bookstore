<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Writer;
use App\Models\Book;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('book_writer', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Writer::class);
            $table->foreign('writer_id')->references('id')->on('writers');

            $table->foreignIdFor(Book::class);
            $table->foreign('book_id')->references('id')->on('books');
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
