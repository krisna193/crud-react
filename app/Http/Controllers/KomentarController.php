<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Komentar;

class KomentarController extends Controller
{
    public function index()
    {
    	$komentars = Komentar::all();

    	//return json response
    	return response()->json([
    		'results' => $komentars
    	],200);
    }
   public function store(Request $request)
{
    try {
        // create komentar
        Komentar::create([
            'id_foto' => $request->id_foto,
            'id_user' => $request->id_user,
            'isi_komentar' => $request->isi_komentar,
            'tanggal_komentar' => $request->tanggal_komentar
        ]);

        // return success JSON response
        return response()->json([
            'message' => 'Successfully created komentar.'
        ], 200);

    } catch (\Exception $e) {
        // return JSON response with error message
        return response()->json([
            'message' => 'Something went wrong! ',
             'error' =>$e->getMessage()
        ], 500);
    }
}




    public function show($id)
    {
    	//komentar detail
    	$komentars = Komentar::find($id);
    	if(!$komentars){
    		return response()->json([
    			'message'=>'Komentar Not Found.'
    		],404);
    	}

    	//Return Json Response
    	return response()->json([
    		'komentars' => $komentars
    	],200);
    }

    public function update(Request $request, $id)
    {
        try{
            //find komentar
            $komentars = Komentar::find($id);
             if(!$komentars){
            return $komentars()->json([
                'message'=>'Komentar Not Found.'
            ],404);
        }

        $komentars->id_foto = $request->id_foto;
        $komentars->id_user = $request->id_user;
        $komentars->isi_komentar = $request->isi_komentar;
        $komentars->tanggal_komentar = $request->tanggal_komentar;

        //update
        $komentars->save();

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
        $komentars = Komentar::find($id);
        if(!$komentars){
            return response()->json([
                'message' => 'komentar not found'
            ],404);
        }

        //delete
        $komentars->delete();

        //return json
        return response()->json([
            'message' => "succes"
        ],200);
    }
}
