<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConnectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $userConIds = Auth::user()->connections()->get();
        return Auth::user()->connections()->skip(0)->take(10)->get()->each(function ($connect) use ($userConIds) {
            $connectConnectionsIds = $connect->connections()->get()->intersect($userConIds);
            $connect->commonConnections = $connectConnectionsIds->count();
            $connect->commonConnectionsIds = $connectConnectionsIds->pluck('id');
            return $connect;
        });
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Connection $connection
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $userConIds = Auth::user()->connections()->get();
        return User::find($id)->connections()->get()->intersect($userConIds);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Connection $connection
     * @return \Illuminate\Http\Response
     */
    public function edit(Connection $connection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Connection $connection
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Connection $connection)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Connection $connection
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            Connection::where('user_id', Auth::user()->id)->where('connected_user_id', $id)->delete();
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
