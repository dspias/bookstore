<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    /**
     * Get all books under the tag
     * A Many to Many relationships
     */
    public function books()
    {
        return $this->belongsToMany(Book::class);
    }
}
