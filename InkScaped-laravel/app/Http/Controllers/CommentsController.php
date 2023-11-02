<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comments;
use Illuminate\Support\Facades\Auth;

class CommentsController extends Controller
{
    
    public function create(CommentRequest $request)
    {
        $data = $request->validated();
        $user = Auth::user();
        Comments::create([            
            'comment_text' => $data['comment_text'],
            'user_id' => $user->id,
            'stories_id' => $data['stories_id'],
            'rating' => $data['rating']
        ]);
    }
    public function getCommentsByStory($storyId)
    {
        $comments = Comments::where('stories_id', $storyId)->get();

        return CommentResource::collection($comments);

    }
    public function destroy($id)
    {
        $user = Auth::user();
        $comment = Comments::find($id);
        if($user->role == 0){
            if (!$comment) {
                return response()->json(['error' => 'Comment not found'], 404);
            }else if(!$comment->user_id ==  $user->id){
                return response()->json(['error' => 'You are not logged in'], 404);
            }
            $comment->delete();    
            return response()->json(['message' => 'Comment deleted successfully']);
        }
        if (!$comment) {
            return response()->json(['error' => 'Comment not found'], 404);
        }
        $comment->delete();    
        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
