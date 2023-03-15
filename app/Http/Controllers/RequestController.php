<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\ConnectRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($mode)
    {
        if ($mode == 'sent') {
            $sendRequestsUsers = Auth::user()->sendRequests()->pluck('receiver_id');
            return User::whereIn('id', $sendRequestsUsers)->paginate(10);
        }
        $sendRequestsUsers = Auth::user()->receivedRequests()->pluck('sender_id');
        return User::whereIn('id', $sendRequestsUsers)->paginate(10);


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required'
        ]);

        try {
            ConnectRequest::create([
                'sender_id' => Auth::user()->id,
                'receiver_id' => $request->user_id
            ]);
            return response([
                'success' => 'true'
            ]);
        } catch (\Exception $e) {
            return response([
                'error' => 'true',
                'message' => $e->getMessage()
            ]);
        }


    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\ConnectRequest $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\ConnectRequest $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\ConnectRequest $request
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        try {
            ConnectRequest::whereSenderId($id)->delete();
            Connection::create([
                'user_id' => Auth::user()->id,
                'connected_user_id' => $id
            ]);
            return response([
                'success' => 'true'
            ]);
        } catch (\Exception $e) {
            return response([
                'error' => 'true',
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\ConnectRequest $request
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            ConnectRequest::whereReceiverId($id)->delete();
            return response([
                'success' => 'true'
            ]);
        } catch (\Exception $e) {
            return response([
                'error' => 'true',
                'message' => $e->getMessage()
            ]);
        }

    }
}
