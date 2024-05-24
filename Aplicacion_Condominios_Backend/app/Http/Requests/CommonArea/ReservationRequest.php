<?php

namespace App\Http\Requests\CommonArea;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class ReservationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'idResident' => ['required', 'integer', 'exists:residentes,id'],
            'idCommonArea' => ['required', 'integer', 'exists:common_areas,id_common_area'],
            'reservationDate' => ['required', 'date'],
            'startTime' => ['required', 'date_format:H:i', 'before:endTime'],
            'endTime' => ['required', 'date_format:H:i', 'after:startTime'],
            'numberPeople' => ['required', 'integer', 'min:1'],
            'reason' => ['required', 'string'],
            'title' => ['required', 'string']
        ];
    }

    public function messages() {
        return [
            'idResident.required' => 'El id del residente es requerido',
            'reservationDate.required' => 'La fecha de la reservación es requerida',
            'reservationDate.date' => 'La fecha de la reservación debe ser una fecha',
            'startTime.required' => 'La hora de inicio es requerida',
            'startTime.date_format' => 'La hora de inicio debe ser una hora',
            'endTime.required' => 'La hora de fin es requerida',
            'endTime.date_format' => 'La hora de fin debe ser una hora',
            'idCommonArea.required' => 'El id del área común es requerido',
            'idCommonArea.integer' => 'El id del área común debe ser un número entero',
            'idCommonArea.exists' => 'El área común no existe',
            'reason.required' => 'La razón de la reservación es requerida',
            'reason.string' => 'La razón de la reservación debe ser una cadena de texto',
            'numberPeople.required' => 'El número de personas es requerido',
            'numberPeople.integer' => 'El número de personas debe ser un número entero',
            'numberPeople.min' => 'El número de personas debe ser al menos 1',
            'title.required' => 'El título de la reservación es requerido',
            'title.string' => 'El título de la reservación debe ser una cadena de texto',
            'startTime.before' => 'La hora de inicio debe ser antes de la hora de fin',
            'endTime.after' => 'La hora de fin debe ser después de la hora de inicio'
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
