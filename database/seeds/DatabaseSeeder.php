<?php

use App\Comment;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		$this->call('UserTableSeeder');
//		$this->call('BusScheduleTableSeeder');
	}
}

class UserTableSeeder extends Seeder {

	public function run()
	{
		DB::table('users')->delete();

		User::create(array(
			'first_name'    => 'Francesco',
			'last_name'     => 'Santagati',
			'email'         => 'francesco.santagati@edu.unito.it',
			'username'      => 'admin',
			'password'      => Hash::make('qweasd') //hashes our password nicely for us
		));

	}
}