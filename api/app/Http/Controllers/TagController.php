<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use App\Http\Resources\TagResource;
use OpenApi\Annotations as OA;

class TagController extends Controller
{
    /**
    * @OA\Get(
    *     path="/api/Tags",
    *     summary="Get a list of Tags",
    *     tags={"Tags"},
    *     @OA\Response(response=200, description="Successful operation"),
    *     @OA\Response(response=400, description="Invalid request")
    * )
    */
    public function index(Request $request)
    {
        return TagResource::collection(Tag::all());
    }
}
