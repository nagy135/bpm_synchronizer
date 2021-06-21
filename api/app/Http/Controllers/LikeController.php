<?php

namespace App\Http\Controllers;

use App\Models\Like;

class LikeController extends Controller
{
    public function get(){
        request()->validate([
            'user_id' => 'required'
        ]);

        return Like::whereUserId(request('user_id'));
    }

    public function create(){
        request()->validate([
            'song_id' => 'required',
            'user_id' => 'required'
        ]);

        Like::create([
            'user_id' => request('user_id'),
            'song_id' => request('song_id'),
        ]);

        return response()->json([
            'status' => 'successful'
        ]);
    }
}
