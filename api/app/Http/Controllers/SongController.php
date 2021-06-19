<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Models\Song;

class SongController extends Controller
{
    public function upload()
    {
        request()->validate([
            'name' => 'required',
        ]);

        $uploadedFile = request()->file('song');

        $filename = time() . '-' . $uploadedFile->getClientOriginalName();

        Storage::disk('public')->putFileAs(
            'songs/',
            $uploadedFile,
            $filename
        );

        $song = Song::create([
            'path' => 'files/' . $filename,
            'name' => request('name')
        ]);

        return response()->json([
            'id' => $song->id
        ]);
        return response()->json([
            'status' => 'successful'
        ]);
    }
}
