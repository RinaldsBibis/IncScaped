<?php

namespace App\Http\Controllers;

use App\Http\Requests\storieRequest;
use App\Http\Resources\StorieResource;
use App\Models\stories;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stories = stories::with('user')->get();

        return StorieResource::collection($stories);
    }

    

    /**
     * Store a newly created resource in storage.
     */
    public function create(storieRequest $request)
    {
        $data = $request->validated();
        $user = Auth::user();
        stories::create([            
            'prompt_id' => $data['prompt_id'],
            'user_id' => $user->id,
            'title' => $data['title'],
            'content' => $data['content']
        ]);
    }

    public function show($id)
    {
        $story = stories::with('user')->find($id);

        if (!$story) {
            return response()->json(['error' => 'Story not found'], 404);
        }

        // Transform the story using the StorieResource
        $storyResource = new StorieResource($story);

        return $storyResource;
    }

    public function getStoriesByCurrentUser()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $stories = stories::where('user_id', $user->id)->with('user')->get();

        return StorieResource::collection($stories);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $story = stories::find($id);
        if($user->role == 0){
            if (!$story) {
                return response()->json(['error' => 'Story not found'], 404);
            }
            if(!$story->user_id ==  $user->id){
                return response()->json(['error' => 'You are not logged in'], 404);                
            }
            $story->delete();    
            return response()->json(['message' => 'Story deleted successfully']);
        }        
        if (!$story) {
            return response()->json(['error' => 'Story not found'], 404);
        }
       
        $story->delete();    
        return response()->json(['message' => 'Story deleted successfully']);
    }
    

    public function indexByRatingAsc()
    {
        $stories = stories::with('comments') 
        ->withAvg('comments', 'rating') 
        ->orderBy('comments_avg_rating') 
        ->get();

        $stories = StorieResource::collection($stories);

        return response()->json($stories);
    }

    public function indexByRatingDesc()
    {
        $stories = stories::with('comments')
        ->withAvg('comments', 'rating')
        ->orderByDesc('comments_avg_rating')
        ->get();

        $stories = StorieResource::collection($stories);

        return response()->json($stories);
    }

    public function todaysStories()
    {
        $today = Carbon::today();
        
        // Query the stories created today and order them by rating in descending order
        $stories = stories::with(['comments', 'user', 'dalyPrompts'])
            ->whereDate('created_at', $today)
            ->withAvg('comments', 'rating')
            ->orderByDesc('comments_avg_rating')
            ->get();

        // Pass the sorted stories to the resource
        $stories = StorieResource::collection($stories);

        return response()->json($stories);
    }
}
