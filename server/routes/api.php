<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\UserController;

// Departments routes
Route::prefix('departments')->group(function () {
    Route::get('/', [DepartmentController::class, 'index']);         // Get all departments
    Route::post('/', [DepartmentController::class, 'store']);        // Add new department
    Route::put('/{id}', [DepartmentController::class, 'update']);    // Update department
    Route::delete('/{id}', [DepartmentController::class, 'destroy']); // Soft delete department
});

// Users routes
Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);               // Get all users
    Route::get('/{id}', [UserController::class, 'show']);            // Get single user for editing
    Route::post('/', [UserController::class, 'store']);              // Add new user
    Route::put('/{id}', [UserController::class, 'update']);          // Update user
    Route::delete('/{id}', [UserController::class, 'destroy']);      // Soft delete user
});
