<?php

namespace App\Http\Controllers;

use App\Models\Writer;
use Illuminate\Http\Request;
use App\Http\Resources\WriterResource;
use OpenApi\Annotations as OA;

class WriterController extends Controller
{
    /**
    * @OA\Get(
    *     path="/api/Writers",
    *     summary="Get a list of Writers",
    *     tags={"Writers"},
    *     @OA\Response(response=200, description="Successful operation"),
    *     @OA\Response(response=400, description="Invalid request")
    * )
    */
    public function index(Request $request)
    {
        return WriterResource::collection(Writer::get());
    }
}
