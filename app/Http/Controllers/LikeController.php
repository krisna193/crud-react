<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;

class LikeController extends Controller
{
    public function index()
    {
    	$likes = Like::all();

    	//return json response
    	return response()->json([
    		'results' => $likes
    	],200);
    }
   public function store(Request $request)
{
    try {
        // create like
        Like::create([
            'id_foto' => $request->id_foto,
            'id_user' => $request->id_user,
            'tanggal_like' => $request->tanggal_like
        ]);

        // return success JSON response
        return response()->json([
            'message' => 'Successfully created like.'
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
    	//like detail
    	$likes = Like::find($id);
    	if(!$likes){
    		return response()->json([
    			'message'=>'Like Not Found.'
    		],404);
    	}

    	//Return Json Response
    	return response()->json([
    		'likes' => $likes
    	],200);
    }

    public function update(Request $request, $id)
    {
        try{
            //find like
            $likes = Like::find($id);
             if(!$likes){
            return $likes()->json([
                'message'=>'Like Not Found.'
            ],404);
        }

        $likes->id_foto = $request->id_foto;
        $likes->id_user = $request->id_user;
        $likes->tanggal_like = $request->tanggal_like;

        //update
        $likes->save();

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
        $likes = Like::find($id);
        if(!$likes){
            return response()->json([
                'message' => 'like not found'
            ],404);
        }

        //delete
        $likes->delete();

        //return json
        return response()->json([
            'message' => "succes"
        ],200);
    }
}
