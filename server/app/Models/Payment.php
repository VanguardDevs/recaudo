<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'pago';

    public function taxpayer()
    {
        return $this->belongsTo(Taxpayer::class, 'contribuyente_id', 'id');
    }
}
