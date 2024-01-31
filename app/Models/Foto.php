<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foto extends Model
{
    use HasFactory;
    protected $table = 'foto';
     protected $primaryKey = 'id_foto';
     public $timestamps = false;

     protected $fillable = [
    	'judul_foto',
    	'tanggal_unggah',
    	'deskripsi_foto',
    	'lokasi_file',
    	'id_album',
    	'id_user'
    ];
}
