<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('usuario', $request->login)->first();

        if (!$user) {
            return response()->json([
                'errors' => [
                    'login' => ['Login incorrecto.']
                ]
            ], 422);
        }
        if (!$user->activo) {
            return response()->json([
                'errors' => [
                    'login' => ['Usuario desactivado.']
                ]
            ], 422);
        }

        // Check password
        if (md5($request->password) != $user->clave) {
            return response()->json([
                'errors' => [
                    'password' => ['Contraseña incorrecta']
                ]
            ], 422);
        }

        $token = $user->createToken('qwerty123');

        $user->nivel = $user->nivel->nombre;

        return [
            'token' => $token->plainTextToken,
            'user' => $user
        ];
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'data' => 'Logged out!'
        ], 200);
    }
}
