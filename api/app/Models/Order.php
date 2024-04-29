<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'book_id',
        'oid',
        'status',
        'quantity',
        'points',
    ];

    /**
     * Get the book under the order
     * A one to Many relationships
     */
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    /**
     * Get user user under the order
     * A one to Many relationships
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
