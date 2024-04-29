<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'book_id' => rand(1, 400),
            'oid' => strval("BOOK1" . rand(1111111111,9999999999) . time()),
            'status' => 'placed',
            'quantity' => 2,
            'points' => rand(20, 50),
        ];
    }
}
