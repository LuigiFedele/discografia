<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\TrackController;

Route::apiResource('albums', AlbumController::class);
Route::apiResource('albums.tracks', TrackController::class)->shallow();