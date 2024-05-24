<?php

namespace App\Http\Requests\CommonArea;

use App\Rules\CommonArea\UniqueNameCommonArea;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Http\FormRequest;

class CommonAreaRequest extends FormRequest
{
    public function authorize(){
       return true;
    }

    public function rules()
    {
        return [
            'name' => ['required', 'string', 'min:5' ,'max:255', new UniqueNameCommonArea()],
            'description' => 'string',
            'capacity' => 'required|integer|min:10',
            'file' => 'required|string',
            'schedule' => 'required|array',
            'schedule.*.day' => 'required|integer|between:1,7',
            'schedule.*.startHour' => 'required|string|date_format:H:i',
            'schedule.*.endHour' => 'required|string|date_format:H:i|after:schedule.*.startHour',
            'policies' => 'required|array',
            'policies.*' => 'string',
        ];
    }

    public function messages(){
        return [
            'name.required' => 'El nombre es requerido',
            'name.string' => 'El nombre debe ser una cadena de texto',
            'name.min' => 'El nombre debe tener al menos 5 caracteres',
            'name.max' => 'El nombre no debe exceder los 255 caracteres',
            'file.required' => 'La imagen es requerida',
            'description.string' => 'La descripción debe ser una cadena de texto',
            'capacity.required' => 'La capacidad es requerida',
            'capacity.integer' => 'La capacidad debe ser un número entero',
            'capacity.min' => 'La capacidad debe ser mínimo 10',
            'schedule.required' => 'El horario es requerido',
            'schedule.array' => 'El horario debe ser un arreglo',
            'schedule.*.day.required' => 'El día es requerido',
            'schedule.*.day.integer' => 'El día debe ser un número entero',
            'schedule.*.day.between' => 'El día debe estar entre 0 y 6',
            'schedule.*.startHour.required' => 'La hora de inicio es requerida',
            'schedule.*.startHour.string' => 'La hora de inicio debe ser una cadena de texto',
            'schedule.*.startHour.date_format' => 'La hora de inicio debe tener el formato H:i',
            'schedule.*.endHour.required' => 'La hora de fin es requerida',
            'schedule.*.endHour.string' => 'La hora de fin debe ser una cadena de texto',
            'schedule.*.endHour.date_format' => 'La hora de fin debe tener el formato H:i',
            'schedule.*.endHour.after' => 'La hora de fin debe ser posterior a la hora de inicio',
            'policies.required' => 'Las políticas son requeridas',
            'policies.array' => 'Las políticas deben ser un arreglo',
            'policies.*.string' => 'Las políticas deben ser cadenas de texto',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->all();

        $response = response()->json([
            'message' => 'Los datos enviados no son válidos',
            'errors' => $errors
        ], 422);
        throw new ValidationException($validator, $response);
    }
}
