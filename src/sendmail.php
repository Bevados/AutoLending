<?php
  // несколько получателей
  $to .= 'Boromirchik@gmail.com';

  // тема письма
  $subject .= 'To order part';

  // текст письма
  $message = 'Year: '.$_POST['year']."\r\n";
  $message .= 'Make: '.$_POST['make']."\r\n";
  $message .= 'Model: '.$_POST['model']."\r\n";
  $message .= 'Part name: '.$_POST['part']."\r\n";
  $message .= 'Vin Number: '.$_POST['vin']."\r\n";
  $message .= 'Your Name: '.$_POST['name']."\r\n";
  $message .= 'Your phone number: '.$_POST['phone']."\r\n";

  // Для отправки HTML-письма должен быть установлен заголовок Content-type
  // $headers  = 'MIME-Version: 1.0' . "\r\n";
  // $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

  // Отправляем
  mail($to, $subject, $message);
?>