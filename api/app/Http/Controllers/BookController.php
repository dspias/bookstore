<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Resources\BookResource;
use OpenApi\Annotations as OA;

class BookController extends Controller
{
    /**
    * @OA\Info(
    *      version="1.0.0",
    *      title="Bookstore",
    *      description="Bookstore api description"
    * )
    *
    * @OA\Get(
    *     path="/api/books",
    *     summary="Get a list of books",
    *     tags={"Books"},
    *     @OA\Response(response=200, description="Successful operation"),
    *     @OA\Response(response=400, description="Invalid request")
    * )
    */
    public function index(Request $request)
    {
        // $searchingFor = $request->input('q');
        
        $books = Book::with(['tags', 'writers'])->paginate();
        return BookResource::collection($books);
    }

    /**
    * @OA\Get(
    *     path="/api/books/{book}",
    *     summary="Get details of a book",
    *     tags={"Books"},
    *     @OA\Parameter(
    *         name="book",
    *         in="path",
    *         required=true,
    *         description="Unique identifier of the book",
    *         @OA\Schema(
    *             type="integer"
    *         )
    *     ),
    *     @OA\Response(response=200, description="Successful operation"),
    *     @OA\Response(response=400, description="Invalid request")
    * )
    */
    public function show(Book $book)
    {
        $book->load(['tags', 'writers']);
        return BookResource::make($book);
    }
}
