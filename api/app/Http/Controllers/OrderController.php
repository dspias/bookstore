<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use OpenApi\Annotations as OA;

class OrderController extends Controller
{
    /**
    * @OA\Get(
    *     path="/api/orders",
    *     summary="Get a list of orders for the auth user",
    *     tags={"Orders"},
    *     @OA\Response(response=200, description="Successful operation"),
    *     @OA\Response(response=400, description="Invalid request")
    * )
    */
    public function index()
    {
        $orders = Order::whereUser_id(auth()->user()->id)
            ->orderBy('id', 'desc')
            ->paginate(20);
            
        return OrderResource::collection($orders);
    }

    /**
    * @OA\Post(
    *     path="/api/orders",
    *     summary="Store an order for the authenticated user",
    *     tags={"Orders"},
    *     @OA\RequestBody(
    *         required=true,
    *         description="Order details",
    *         @OA\JsonContent(
    *             required={"book_id", "quantity"},
    *             @OA\Property(property="book_id", type="integer", description="ID of the book", example="1"),
    *             @OA\Property(property="quantity", type="integer", description="Quantity of books", example="2"),
    *         ),
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Successful operation",
    *         @OA\JsonContent(
    *             @OA\Property(property="id", type="integer", description="Order ID"),
    *             @OA\Property(property="user_id", type="integer", description="User ID"),
    *             @OA\Property(property="book_id", type="integer", description="Book ID"),
    *             @OA\Property(property="oid", type="string", description="Order Identifier"),
    *             @OA\Property(property="status", type="string", description="Order status"),
    *             @OA\Property(property="quantity", type="integer", description="Quantity of books"),
    *             @OA\Property(property="points", type="integer", description="Points deducted"),
    *             @OA\Property(property="created_at", type="string", format="date-time", description="Order creation timestamp"),
    *             @OA\Property(property="updated_at", type="string", format="date-time", description="Order update timestamp"),
    *         ),
    *     ),
    *     @OA\Response(
    *         response=400,
    *         description="Invalid request",
    *         @OA\JsonContent(
    *             @OA\Property(property="error", type="string", description="Error message"),
    *         ),
    *     ),
    *     @OA\Response(
    *         response=422,
    *         description="Unprocessable Entity",
    *         @OA\JsonContent(
    *             @OA\Property(property="status", type="integer", description="HTTP status code"),
    *             @OA\Property(property="message", type="string", description="Error message"),
    *         ),
    *     ),
    *     security={{"bearerAuth": {}}}
    * )
    */
    public function store(Request $request)
    {
        $request->validate([
            'book_id' => ['required', 'exists:books,id'],
            'quantity' => ['required'],
        ]);

        $user = $request->user();
        $book = Book::whereId($request->book_id)->first();
        $points = $book->points * $request->quantity;
        
        if ($user->points < $points) {
            return response()->json(["status" => 422, "message" => "You don't have enough points"]);
        }

        $order = Order::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'oid' => strval("BOOK". $user->id . rand(1111111111,9999999999) . time()),
            'status' => 'placed',
            'quantity' => $request->quantity,
            'points' => $points,
        ]);

        $user->points -= $points;
        $user->save();

        return response()->json(OrderResource::make($order));
    }


    /**
* @OA\Post(
*     path="/api/orders/cancel/{order}",
*     summary="Cancel an order for the authenticated user",
*     tags={"Orders"},
*     @OA\Parameter(
*         name="order",
*         in="path",
*         required=true,
*         description="ID of the order to cancel",
*         @OA\Schema(
*             type="integer"
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Order successfully canceled",
*         @OA\JsonContent(
*             @OA\Property(property="message", type="string", description="Success message"),
*         ),
*     ),
*     @OA\Response(
*         response=404,
*         description="Order not found",
*         @OA\JsonContent(
*             @OA\Property(property="error", type="string", description="Error message"),
*         ),
*     ),
*     @OA\Response(
*         response=403,
*         description="Forbidden",
*         @OA\JsonContent(
*             @OA\Property(property="error", type="string", description="Error message"),
*         ),
*     ),
*     security={{"bearerAuth": {}}}
* )
*/
    public function cancel(Request $request, Order $order)
    {
        $order->status = "canceled";
        $order->save();
        
        return response()->json(OrderResource::make($order));
    }

}
