<?php

namespace App\Rules\CommonArea;

use Illuminate\Contracts\Validation\Rule;

class ValidateStartTimeReservation implements Rule
{
    public function __construct()
    {
        //
    }

    public function passes($attribute, $value)
    {
        //
    }

    public function message()
    {
        return 'The validation error message.';
    }
}
