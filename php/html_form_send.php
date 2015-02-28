<?php
if(isset($_POST['email'])) {

	// CHANGE THE TWO LINES BELOW
	$email_to = "fabian@fabz.tv";

	$email_subject = "Contact from Fabz.tv";


	function died($error) {
		// your error code can go here
		echo "<h2>We are very sorry</h2><p class='description-text'> But we found error(s) with the form you submitted.</p>";
		echo "<p class='description-text'>These errors appear below.</p>";
		echo $error."<br />";
		echo "<p class='description-text'>Please go back and fix these errors.</p>";
		die();
	}

	// validation expected data exists
	if(!isset($_POST['first_name']) ||
	   !isset($_POST['last_name']) ||
	   !isset($_POST['email']) ||
	   !isset($_POST['comments'])) {
		died("<h2>We are really sorry</h2><p class='description-text'> but there appears to be a problem with the form you submitted.</p>");
	}

	$first_name = $_POST['first_name']; // required
	$last_name = $_POST['last_name']; // required
	$email_from = $_POST['email']; // required
	$comments = $_POST['comments']; // required

	$error_message = "";
	$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
	if(!preg_match($email_exp,$email_from)) {
		$error_message .= "<p class='description-text'>The Email Address you entered does not appear to be valid.</p>";
	}
	$string_exp = "/^[A-Za-z .'-]+$/";
	if(!preg_match($string_exp,$first_name)) {
		$error_message .= "<p class='description-text'>The First Name you entered does not appear to be valid.</p>";
	}
	if(!preg_match($string_exp,$last_name)) {
		$error_message .= "<p class='description-text'>The Last Name you entered does not appear to be valid.</p>";
	}
	if(strlen($comments) < 2) {
		$error_message .= "<p class='description-text'>The Comments you entered do not appear to be valid.</p>";
	}
	if(strlen($error_message) > 0) {
		died($error_message);
	}
	$email_message = "Form details below.\n\n";

	function clean_string($string) {
		$bad = array("content-type","bcc:","to:","cc:","href");
		return str_replace($bad,"",$string);
	}

	$email_message .= "First Name: ".clean_string($first_name)."\n";
	$email_message .= "Last Name: ".clean_string($last_name)."\n";
	$email_message .= "Email: ".clean_string($email_from)."\n";
	$email_message .= "Comments: ".clean_string($comments)."\n";


// create email headers
	$headers = 'From: '.$email_from."\r\n".
	           'Reply-To: '.$email_from."\r\n" .
	           'X-Mailer: PHP/' . phpversion();
	$sent = mail($email_to, $email_subject, $email_message, $headers);

// check if mail function was executed without errors
	if($sent) { ?>
		<h2>Thank you for contacting us</h2>
		<p class='description-text'>Your message was successfully delivered.</p>
		<p class='description-text'>We will be in touch with you very soon.</p>
		<p class='description-text'>Kind regards</p>
	<?php
	} else {
		// otherwise deliver error message
		echo "<p class='description-text'>There was an error to deliver your message, please try again!</p>";
	} 
}
