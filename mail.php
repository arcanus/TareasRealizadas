<?php
require 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output
$mail->CharSet = 'UTF-8';
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = '172.16.30.8';  // Specify main and backup SMTP servers
$mail->SMTPAuth = false;                               // Enable SMTP authentication
// $mail->Username = 'user@example.com';                 // SMTP username
// $mail->Password = 'secret';                           // SMTP password
// $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 25;                                    // TCP port to connect to

$mail->setFrom($_GET['mailTecnico'], $_GET['nombreTecnico']);
$mail->addAddress('sistemas@lmneuquen.com.ar', 'Sistemas');     // Add a recipient

$mail->addReplyTo($_GET['mailTecnico'], $_GET['nombreTecnico']);
// $mail->addCC('cc@example.com');
// $mail->addBCC('bcc@example.com');

// $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Novedades - ' . $_GET['fecha'];
$mail->Body    = $_GET['cuerpoMail'];
// $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    echo 'Message could not be sent.';    
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
	echo 'Mail enviado correctamente!';
}
?>
