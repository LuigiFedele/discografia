<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;

class AlbumController extends Controller
{
    public function index(Request $request)
    {
        $name = $request->query('name');
        if ($name) {
            return Album::where('name', 'like', '%' . $name . '%')->with('tracks')->get();
        } else {
            return Album::with('tracks')->get();
        }
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string']);
        $album = Album::create($request->all());
        return response($album, 201);
    }

    public function show($id)
    {
        return Album::with('tracks')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $album = Album::findOrFail($id);
        $album->update($request->all());
        return response($album, 200);
    }

    public function destroy($id)
    {
        Album::findOrFail($id)->delete();
        return response(null, 204);
    }
}