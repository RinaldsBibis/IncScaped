<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class stories extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'prompt_id',
        'title',
        'content'
    ];
    public function dalyPrompts()
    {
        return $this->belongsTo(dalyPrompts::class, 'prompt_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function comments()
    {
        return $this->hasMany(Comments::class);
    }
    
}
