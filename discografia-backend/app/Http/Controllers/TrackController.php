<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;
use App\Models\Track;

class TrackController extends Controller
{
    public function store(Request $request, $albumId)
    {
        $request->validate(['name' => 'required|string']);
        $album = Album::findOrFail($albumId);
        $track = $album->tracks()->create($request->all());
        return response($track, 201);
    }

    public function destroy($id)
    {
        Track::findOrFail($id)->delete();
        return response(null, 204);
    }
}
