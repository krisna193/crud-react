<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;

class AlbumController extends Controller
{
    public function index()
    {
    	$users = Album::all();

    	//return json response
    	return response()->json([
    		'results' => $users
    	],200);
    }
   public function store(Request $request)
{
    try {
        // create user
        Album::create([
            'nama_album' => $request->nama_album,
            'deskripsi' => $request->deskripsi,
            'tanggal_dibuat' => $request->tanggal_dibuat,
            'id_user' => $request->id_user
        ]);

        // return success JSON response
        return response()->json([
            'message' => 'Successfully created user.'
        ], 200);

    } catch (\Exception $e) {
        // return JSON response with error message
        return response()->json([
            'message' => 'Something went wrong! ',
             $e->getMessage()
        ], 500);
    }
}




    public function show($id)
    {
    	//user detail
    	$users = Album::find($id);
    	if(!$users){
    		return response()->json([
    			'message'=>'Album Not Found.'
    		],404);
    	}

    	//Return Json Response
    	return response()->json([
    		'users' => $users
    	],200);
    }

    public function update(Request $request, $id)
    {
        try{
            //find user
            $users = Album::find($id);
             if(!$users){
            return $users()->json([
                'message'=>'Album Not Found.'
            ],404);
        }

        $users->nama_album = $request->nama_album;
        $users->deskripsi = $request->deskripsi;
        $users->tanggal_dibuat = $request->tanggal_dibuat;
        $users->id_user = $request->id_user;

        //update
        $users->save();

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
        $users = Album::find($id);
        if(!$users){
            return response()->json([
                'message' => 'user not found'
            ],404);
        }

        //delete
        $users->delete();

        //return json
        return response()->json([
            'message' => "succes"
        ],200);
    }
}
