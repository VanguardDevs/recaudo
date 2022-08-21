<?php

namespace App\Http\Controllers;

use App\Models\Contribuyente;
use Illuminate\Http\Request;

class ContribuyenteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Contribuyente::orderBy('id', 'desc');
        $results = $request->perPage;
        $sort = $request->sort;
        $order = $request->order;

        if ($request->has('filter')) {
            $filters = $request->filter;

            if (array_key_exists('rif', $filters)) {
                $query->whereLike('rif', $filters['rif']);
            }
            if (array_key_exists('name', $filters)) {
                $query->whereLike('name', $filters['name']);
            }
            if (array_key_exists('phone', $filters)) {
                $query->whereLike('phone', $filters['phone']);
            }
            if (array_key_exists('email', $filters)) {
                $query->whereLike('email', $filters['email']);
            }
            if (array_key_exists('address', $filters)) {
                $query->whereLike('address', $filters['address']);
            }
            if (array_key_exists('id', $filters)) {
                $query->find($filters['id']);
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
     * @param  \App\Models\Contribuyente  $contribuyente
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Contribuyente::find($id);
    }
}
