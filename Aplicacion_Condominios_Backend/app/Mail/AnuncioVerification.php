<?php
namespace App\Mail;

use App\Models\Notificaciones\AnuncioEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AnuncioVerification extends Mailable
{
    use Queueable, SerializesModels;

    public $anuncioEmail;

    public function __construct(AnuncioEmail $anuncioEmail)
    {
        $this->anuncioEmail = $anuncioEmail;
    }

    public function build()
    {
        return $this->from(env('MAIL_USERNAME'))
            ->view('name')
            ->subject('Notificaciones Condominio');
    }
}
