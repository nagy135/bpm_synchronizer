<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    // relations {{{

    public function variants(){
        return $this->hasMany(Variant::class);
    }

    public function likes(){
        return $this->hasMany(Like::class);
    }

    // }}}
}
