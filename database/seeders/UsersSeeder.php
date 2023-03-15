<?php

namespace Database\Seeders;

use App\Models\Connection;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->times(50)->create()->each(function ($user) {
            for ($k = 0; $k < 12; $k++) {
                $user->sendRequests()->create(['receiver_id' => rand(1, 20)]);
                Connection::create(['user_id' => $user->id, 'connected_user_id' => rand(1, 20)]);

            }

        });
    }
}
