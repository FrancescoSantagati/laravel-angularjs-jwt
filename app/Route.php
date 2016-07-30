<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Route extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'routes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'name', 'origin_place_id', 'origin_place_name', 'destination_place_id', 'destination_place_name', 'travel_mode', 'total'];

}
