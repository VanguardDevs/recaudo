<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use Illuminate\Http\Request;

class PagoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Pago::with('contribuyente')->orderBy('id', 'desc');
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
            if (array_key_exists('contribuyente_id', $filters)) {
                $query->whereContribuyenteId($filters['contribuyente_id']);
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
}
