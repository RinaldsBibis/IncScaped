<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function index()
    {
        $user = User::all();
    
        return response()->json($user);
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'user not found'], 404);
        }
        return response()->json($user);
    }

    public function addUser(SignupRequest $request)
    {
        $data = $request->validated();

        $currentser = Auth::user();
        if($currentser->role == 0){
            return response([
                'error' => 'You dont have permisions'
            ],422);
        }
        /** @var \App\Models\User $user */
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => $data['role']
        ]);
        return response([
            'user' => $user,
        ]);
    }

    public function destroy($id)
    {
        $currentuser = Auth::user();
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'uesr not found'], 404);
        } else if($currentuser->id==$user->id){
            return response()->json(['message' => 'TAS ESI TU'], 404);
        } else if($user->role==1){
            return response()->json(['message' => 'cant delete admin'], 404);
        }else if($currentuser->role == 0){
            return response()->json(['message' => 'you dont have permision'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'user deleted'], 200);
    }


}
