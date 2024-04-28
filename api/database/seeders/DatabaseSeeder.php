<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Tag;
use App\Models\Writer;
use App\Models\Book;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Insert 4 tags
        Tag::factory()
            ->count(4)
            ->sequence(
                ['name' => 'fiction'],
                ['name' => 'non-fiction'],
                ['name' => 'science'],
                ['name' => 'essay'],
            )
            ->create();
        
        // Insert 40 writers
        Writer::factory()->count(20)->create();

        // Insert 400 books
        Book::factory()->count(400)->create();

        // User::factory(20)->create();
    }
}
