<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Department extends Model
{
    use HasFactory;

    protected $table = 'tbl_departments';
    protected $primaryKey = 'department_id';

    protected $fillable = [
        'department',
        'image',
        'is_deleted',
    ];

    // Append the full image URL automatically
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }
}
