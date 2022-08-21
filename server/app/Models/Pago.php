<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;

    protected $table = 'pago';

    public function contribuyente()
    {
        return $this->belongsTo(Contribuyente::class, 'contribuyente_id');
    }
}
