<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contribuyente extends Model
{
    use HasFactory;

    protected $table = 'contribuyente';

    public function pagos()
    {
        return $this->hasMany(Pago::class, 'contribuyente_id');
    }
}
