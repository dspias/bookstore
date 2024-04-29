<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\User;
use App\Models\Book;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(User::class);
            $table->foreign('user_id')->references('id')->on('users');

            $table->foreignIdFor(Book::class);
            $table->foreign('book_id')->references('id')->on('books');

            $table->string('oid')->unique();
            $table->enum('status', ['placed', 'canceled', 'completed']);
            $table->integer('quantity');
            $table->integer('points');

            $table->timestamp('caneled_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
