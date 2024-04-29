<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    
    /**
     * Get all tags under the book
     * A Many to Many relationships
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
    
    /**
     * Get all writers under the book
     * A Many to Many relationships
     */
    public function writers()
    {
        return $this->belongsToMany(Writer::class);
    }


    /**
     * Get all orders under the book
     * A Many to Many relationships
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
