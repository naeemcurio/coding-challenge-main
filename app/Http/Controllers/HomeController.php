<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $connections = Auth::user()->connections()->count();
        $sendRequests = Auth::user()->sendRequests()->count();
        $receivedRequests = Auth::user()->receivedRequests()->count();
        return view('home', compact('connections', 'sendRequests', 'receivedRequests'));
    }
}
