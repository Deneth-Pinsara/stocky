<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

// use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    // JsonResponse
    {
        // $products = Product::all();
        // Log::info('retrieved successfully', ['count' => $products->count()]);
        // dd($products);

        $products = Product::all();
        // $products = Product::orderBy('id')->paginate('2');

        return response()->json([
            'message' => 'All Products retrieved successfully',
            'data' => $products,
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'sku' => 'required|string|max:50|unique:products,sku',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0|decimal:0,2',
            'quantity' => 'required|integer|min:0',
        ]);

        $product = Product::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => $product,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        $product = Product::findOrFail($id);

        return response()->json([
            'message' => 'Product retrieved successfully!',
            'data' => $product,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:150',
            'sku' => [
                'sometimes',
                'required',
                'string',
                'max:50',
                Rule::unique('products', 'sku')->ignore($product),
            ],
            'description' => 'sometimes|nullable|string',
            'price' => 'sometimes|required|numeric|min:0|decimal:0,2',
            'quantity' => 'sometimes|required|integer|min:0',
        ]);

        $product->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => $product->refresh(),
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $product = Product::findOrFail($id);

        $product->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'The product has deleted successfully!',
        ], 200);
    }
}
