<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Taxpayer extends Model
{
    use HasFactory;

    protected $table = 'contribuyente';

    public function payments()
    {
        return $this->hasMany(Payment::class, 'contribuyente_id');
    }
}
