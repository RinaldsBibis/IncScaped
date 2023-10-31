<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('daly_prompts', function (Blueprint $table) {
            $table->timestamp('show_date')->nullable();; // Add the 'date' column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('daly_prompts', function (Blueprint $table) {
            $table->dropColumn('show_date');
        });
    }
};
