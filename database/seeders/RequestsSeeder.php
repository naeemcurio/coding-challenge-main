<?php

namespace Database\Seeders;

use App\Models\ConnectRequest;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RequestsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ConnectRequest::factory()->times(20)->create();

    }
}
