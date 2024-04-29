<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Helpers\FactoryHelper;
use App\Models\Book;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->words(3, true),
            'points' => rand(1, 50),
        ];
    }

    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Book $book) {
            $items = function (int $limit, int $range): array {
                $list = [];
                while (count($list) < $limit) {
                    $randomNumber = rand(1, $range);
                    if (!in_array($randomNumber, $list)) {
                        $list[] = $randomNumber;
                    }
                }
                return $list;
            };

            $book->tags()->attach($items(rand(2, 4), 4));
            $book->writers()->attach($items(rand(1, 3), 20));
        });
    }


}
