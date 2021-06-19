<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    use HasFactory;

    // relations {{{

    public function song(){
        return $this->belongsTo(Song::class);
    }

    // }}}
}
