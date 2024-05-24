<?php
namespace App\Services\CommonArea;
use App\Models\CommonArea\Reservation;

class CommonAreaService {
  public function getReservationsInDateByIdCommonArea($idCommonArea, $date) {
    return Reservation::where('id_common_area', $idCommonArea)
      ->where('reserved_date', $date)
      ->get();
  }

  public function validateTimeReservation($idCommonArea, $date, $startTime, $endTime) {
    $reservations = $this->getReservationsInDateByIdCommonArea($idCommonArea, $date);

    $reservations = $reservations->filter(function ($reservation) use ($startTime, $endTime) {
      return $this->isTimeBetween($startTime, $reservation->start_time, $reservation->end_time) ||
        $this->isTimeBetween($endTime, $reservation->start_time, $reservation->end_time) ||
        $this->isTimeBetween($reservation->start_time, $startTime, $endTime) ||
        $this->isTimeBetween($reservation->end_time, $startTime, $endTime);
    });
    return $reservations->isEmpty();
  }

  private function isTimeBetween($time, $startTime, $endTime) {
    return $time >= $startTime && $time <= $endTime;
  }
}