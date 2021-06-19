<?php

namespace App\Http\Controllers;

class SongController extends Controller
{
    public function upload(){
        return response()->json([
            'haha' => 'hoho'
        ]);
    }
}
