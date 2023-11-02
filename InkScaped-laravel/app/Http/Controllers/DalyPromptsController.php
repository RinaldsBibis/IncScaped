<?php

namespace App\Http\Controllers;

use App\Http\Requests\dalyPromptsRequest;
use App\Models\dalyPrompts;
use Illuminate\Support\Facades\Auth;

class DalyPromptsController extends Controller
{
    public function index()
    {

        $prompts = DalyPrompts::all();
    
         return response()->json($prompts);
    }

    public function create(dalyPromptsRequest $request)
    {
        $currentser = Auth::user();
        if($currentser->role == 0){
            return response([
                'error' => 'You dont have permisions'
            ],422);
        }
        $data = $request->validated();

        dalyPrompts::create([            
            'prompt_text' => $data['prompt_text'],
            'show_date' => $data['show_date']
        ]);
    }

    public function latest()
    {
        $currentDate = date('Y-m-d');

        $latestPrompt = DalyPrompts::where('show_date', $currentDate)
            ->latest('created_at')
            ->first();

        if ($latestPrompt) {
            return response()->json($latestPrompt);
        } else {
            return response()->json(['message' => 'No prompts available for the current date'], 404);
        }
    }
     
    // public function show(dalyPrompts $dalyPrompts)
    // {
      
    // }
    public function show($id)
    {
        $prompt = DalyPrompts::find($id);

        if (!$prompt) {
            return response()->json(['message' => 'Prompt not found'], 404);
        }
        return response()->json($prompt);
    }

    public function destroy($id)
    {
        $prompt = DalyPrompts::find($id);
        if (!$prompt) {
            return response()->json(['error' => 'Story not found'], 404);
        }
        $prompt->delete();    
        return response()->json(['message' => 'Story deleted successfully']);
    }

}
