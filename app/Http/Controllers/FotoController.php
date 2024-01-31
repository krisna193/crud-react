<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Foto;

class FotoController extends Controller
{
    public function index()
    {
    	$fotos = Foto::all();

    	//return json response
    	return response()->json([
    		'results' => $fotos
    	],200);
    }

public function store(Request $request)
{
    try {
        // Mengambil file gambar dari request
        $gambar = $request->file('lokasi_file');

// Periksa apakah file gambar diunggah
if ($gambar) {
    // Mendapatkan nama unik untuk file
    $nama_file = uniqid() . '.' . $gambar->getClientOriginalExtension();

    // Menyimpan file ke folder 'img' di folder 'public'
    // $gambar->storeAs('img', $nama_file, 'public');
    $gambar->storeAs('public/img', $nama_file);

    // Membuat record Foto di database
    Foto::create([
        'judul_foto' => $request->judul_foto,
        'tanggal_unggah' => $request->tanggal_unggah,
        'deskripsi_foto' => $request->deskripsi_foto,
        'lokasi_file' =>  $nama_file, // Path ke file di folder 'public'
        'id_album' => $request->id_album,
        'id_user' => $request->id_user,
    ]);

    // Return success JSON response
    return response()->json([
        'message' => 'Successfully created foto.'
    ], 200);
} else {
    // Jika file tidak diunggah, berikan tanggapan yang sesuai
    return response()->json([
        'message' => 'No image uploaded.'
    ], 400);
}


    } catch (\Exception $e) {
        // Return JSON response with error message
        return response()->json([
            'message' => 'Something went wrong! ' . $e->getMessage()
        ], 500);
    }
}




    public function show($nama_file)
    {
        // Mengambil foto dari penyimpanan
        $path = 'public/img/' . $nama_file;
        if (Storage::exists($path)) {
            $file = Storage::get($path);
            $type = Storage::mimeType($path);

            // Mengirimkan respons HTTP dengan foto
            return response($file, 200)->header('Content-Type', $type);
        }

        // Jika foto tidak ditemukan, berikan respons dengan kode 404
        return response()->json(['message' => 'Foto not found.'], 404);
    }



    public function update(Request $request, $id)
    {
        try{
            //find foto
            $fotos = Foto::find($id);
             if(!$fotos){
            return $fotos()->json([
                'message'=>'Komentar Not Found.'
            ],404);
        }

        $fotos->judul_foto = $request->judul_foto;
        $fotos->tanggal_unggah = $request->tanggal_unggah;
        $fotos->deskripsi_foto = $request->deskripsi_foto;
        $fotos->lokasi_file = $request->lokasi_file;
        $fotos->id_album = $request->id_album;
        $fotos->id_user = $request->id_user;

        //update
        $fotos->save();

        //return json response
        return response()->json([
                'message'=>"succes"
        ],200);
            
        } catch (\Exception $e) {
            return response()->json([
                'message'=>"cobalagi."
            ],500);
        }
    }

    public function destroy($id)
    {
        //detail
        $fotos = Foto::find($id);
        if(!$fotos){
            return response()->json([
                'message' => 'foto not found'
            ],404);
        }

        //delete
        $fotos->delete();

        //return json
        return response()->json([
            'message' => "succes"
        ],200);
    }
}
