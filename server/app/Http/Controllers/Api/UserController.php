<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Department;
use App\Models\User;

class UserController extends Controller
{
    // Get all users
    public function index()
    {
        $users = User::with('department')->where('is_deleted', false)->get();
        return response()->json($users);
    }

    // Get single user for editing
    public function show($id)
    {
        $user = User::with('department')->where('user_id', $id)->where('is_deleted', false)->firstOrFail();
        return response()->json($user);
    }

    // Add new user
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:55',
            'middle_name' => 'nullable|string|max:55',
            'last_name' => 'required|string|max:55',
            'suffix_name' => 'nullable|string|max:55',
            'department_id' => 'required|exists:tbl_departments,department_id',
            'birth_date' => 'required|date',
            'username' => 'required|string|max:55|unique:tbl_users,username',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'suffix_name' => $request->suffix_name,
            'department_id' => $request->department_id,
            'birth_date' => $request->birth_date,
            'age' => \Carbon\Carbon::parse($request->birth_date)->age,
            'username' => $request->username,
        ]);

        return response()->json($user, 201);
    }

    // Update existing user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'first_name' => 'required|string|max:55',
            'middle_name' => 'nullable|string|max:55',
            'last_name' => 'required|string|max:55',
            'suffix_name' => 'nullable|string|max:55',
            'department_id' => 'required|exists:tbl_departments,department_id',
            'birth_date' => 'required|date',
            'username' => 'required|string|max:55|unique:tbl_users,username,' . $user->user_id . ',user_id',
        ]);

        $user->update([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'suffix_name' => $request->suffix_name,
            'department_id' => $request->department_id,
            'birth_date' => $request->birth_date,
            'age' => \Carbon\Carbon::parse($request->birth_date)->age,
            'username' => $request->username,
        ]);

        return response()->json($user);
    }

    // Soft-delete user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->update(['is_deleted' => true]);
        return response()->json(['message' => 'User deleted successfully']);
    }
}
