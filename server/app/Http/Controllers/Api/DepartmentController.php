<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    // Get all departments (excluding soft-deleted ones)
    public function index()
    {
        $departments = Department::where('is_deleted', false)->get();
        return response()->json($departments);
    }

    // Store new department
    public function store(Request $request)
    {
        $request->validate([
            'department' => 'required|string|max:255'
        ]);

        $department = Department::create([
            'department' => $request->department,
        ]);

        return response()->json($department, 201);
    }

    // Update existing department
    public function update(Request $request, $id)
    {
        $request->validate([
            'department' => 'required|string|max:255'
        ]);

        $department = Department::findOrFail($id);
        $department->update([
            'department' => $request->department,
        ]);

        return response()->json($department);
    }

    // Soft delete department
    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $department->update(['is_deleted' => true]);

        return response()->json(['message' => 'Department deleted successfully']);
    }
}
