<?php

namespace App\Rules\CommonArea;

use App\Models\CommonArea\CommonArea;
use Illuminate\Contracts\Validation\Rule;

class UniqueNameCommonArea implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $commonArea = CommonArea::where('common_area_name', $value)->first();   
        return !$commonArea;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'El nombre del área común ya está en uso.';
    }
}
