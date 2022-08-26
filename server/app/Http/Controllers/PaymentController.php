<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Payment::with('taxpayer')->orderBy('id', 'desc');
        $results = $request->perPage;
        $sort = $request->sort;
        $order = $request->order;

        if ($request->has('filter')) {
            $filters = $request->filter;

            if (array_key_exists('global', $filters)) {
                $query->whereHas('taxpayer', function ($query) use ($filters) {
                        $query->whereLike('rif', $filters['global'])
                            ->orWhereLike('razonsocialdenominacioncomercial', $filters['global']);
                    })
                    ->orWhereLike('numpago', $filters['global']);
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
