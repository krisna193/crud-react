<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;
     protected $table = 'like_foto';
     protected $primaryKey = 'id_like';
     public $timestamps = false;

     protected $fillable = [
    	'id_foto',
    	'id_user',
    	'tanggal_like'
    ];

}
