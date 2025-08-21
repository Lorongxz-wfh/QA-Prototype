<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tbl_users', function (Blueprint $table) {
            $table->id("user_id");
            $table->string("first_name", 55);
            $table->string("middle_name", 55)->nullable();
            $table->string("last_name", 55);
            $table->string("suffix_name")->nullable();
            $table->unsignedBigInteger("department_id");
            $table->date("birth_date");
            $table->integer("age");
            $table->string("username", 55)->unique(); // ✅ Unique username
            // $table->string("password", 255);
            $table->tinyInteger("is_deleted")->default(false);
            $table->timestamps();

            // Foreign key
            $table->foreign('department_id')
                ->references('department_id')
                ->on('tbl_departments')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('tbl_users');
        Schema::enableForeignKeyConstraints();
    }
};
