<?php

namespace App\Http\Controllers;

use App\Models\Taxpayer;
use Illuminate\Http\Request;

class TaxpayerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Taxpayer::orderBy('id', 'desc');
        $results = $request->perPage;
        $sort = $request->sort;
        $order = $request->order;

        if ($request->has('filter')) {
            $filters = $request->filter;

            if (array_key_exists('global', $filters)) {
                $query->whereLike('rif', $filters['global'])
                    ->orWhereLike('razonsocialdenominacioncomercial', $filters['global']);
            }
        }

        if ($sort && $order) {
            $query->orderBy($sort, $order);
        }

        if ($request->type == 'pdf') {
            return $this->report($query);
        }

        return $query->paginate($results);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Taxpayer  $Taxpayer
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Taxpayer::find($id);
    }
}
