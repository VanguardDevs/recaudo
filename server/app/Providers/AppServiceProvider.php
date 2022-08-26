<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Builder;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Builder::macro('whereLike', function (string $attribute, string $searchTerm) {
            return $this->where($attribute, 'ILIKE', "%{$searchTerm}%");
        });

        Builder::macro('orWhereLike', function (string $attribute, string $searchTerm) {
            return $this->orWhere($attribute, 'ILIKE', "%{$searchTerm}%");
        });
    }
}
