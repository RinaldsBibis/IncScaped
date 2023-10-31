<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'stories_id',
        'comment_text',
        'rating',
    ];

    public function story()
    {
        return $this->belongsTo(stories::class, 'stories_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
