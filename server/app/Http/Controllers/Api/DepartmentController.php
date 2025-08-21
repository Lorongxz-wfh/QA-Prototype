<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Department;
use Illuminate\Support\Facades\Storage;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::where('is_deleted', false)->get();
        return response()->json($departments);
    }

    public function show($id)
    {
        $department = Department::findOrFail($id);
        return response()->json($department);
    }

    public function store(Request $request)
    {
        $request->validate([
            'department' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048', // Max 2MB
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('departments', 'public');
        }

        $department = Department::create([
            'department' => $request->department,
            'image' => $imagePath,
        ]);

        return response()->json($department, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'department' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $department = Department::findOrFail($id);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($department->image) {
                Storage::disk('public')->delete($department->image);
            }
            $department->image = $request->file('image')->store('departments', 'public');
        }

        $department->department = $request->department;
        $department->save();

        return response()->json($department);
    }

    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $department->is_deleted = true;
        $department->save();

        return response()->json(['message' => 'Department deleted successfully']);
    }
}
