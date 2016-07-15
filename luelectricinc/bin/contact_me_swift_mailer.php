<?php

// check if fields passed are empty
if(empty($_POST['name'])  		||
    empty($_POST['phone']) 		||
    empty($_POST['email']) 		||
    empty($_POST['message'])	||
    !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
{
    echo "No arguments Provided!";
    return false;
}

$name = $_POST['name'];
$phone = $_POST['phone'];
$email_address = $_POST['email'];
$message = $_POST['message'];

$date = date("Y-m-d h:i a");
$signature = "<br><i>Sent on: $date</i>";

//include the library
require_once 'swiftmailer-5.x/lib/swift_required.php';

// Create the message
$message = Swift_Message::newInstance()

    // Give the message a subject
    ->setSubject("LUE Contact Form - Message From:  $name")

    // Set the From address with an associative array
    ->setFrom(array('noreply@luelectricinc.com' => 'LUE Website Contact form'))

    //set the sender
    ->setSender('webmaster@luelectricinc.com')

    // Set the To addresses with an associative array
    ->setTo(array('Brett@luelectricinc.com' => 'Services Department'))

    // Give it a body
    ->setBody("You have received a new message from your contact form on <a href='www.luelectricinc.com'>www.luelectricinc.com</a>.<br><br>"."Here are the details:<br><br><b>Name:</b> $name<br><b>Phone:</b> $phone<br><b>Email:</b> $email_address<br><br><b>Message:</b><br>$message <br>$signature", 'text/html')

    // And optionally an alternative body
    ->addPart('<q>Sent from the contact form on <a href="http://luelectricinc.com/contact.html" >luelecticinc.com/contact.html</a> </q>', 'text/html')
;


$transport = Swift_SmtpTransport::newInstance('relay-hosting.secureserver.net', 587)
    ->setUsername('webmaster@luelectricinc.com')
    ->setPassword('Seasaltjasmine@85!')
    ->setEncryption('tls');
$mailer = Swift_Mailer::newInstance($transport);
if ($mailer->send($message))  {
    echo "Sent\n";
    return true;
}
else  {
    echo "Failed\n";
    return false;
}
