<?php
if(isset($_POST['email'])) {

    // CHANGE THE TWO LINES BELOW
    $email_to = "fabian@fabz.tv";

    $email_subject = "Contact from Fabz.tv";


    function died($error) {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }

    // validation expected data exists
    if(!isset($_POST['first_name']) ||
        !isset($_POST['last_name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['comments'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');
    }

    $first_name = $_POST['first_name']; // required
    $last_name = $_POST['last_name']; // required
    $email_from = $_POST['email']; // required
    $comments = $_POST['comments']; // required

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }
    $string_exp = "/^[A-Za-z .'-]+$/";
  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'The First Name you entered does not appear to be valid.<br />';
  }
  if(!preg_match($string_exp,$last_name)) {
    $error_message .= 'The Last Name you entered does not appear to be valid.<br />';
  }
  if(strlen($comments) < 2) {
    $error_message .= 'The Comments you entered do not appear to be valid.<br />';
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
?>

<!DOCTYPE html>
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Fabz.tv </title>
    <meta name="description" content="Fabz tv portfolio - London based hotographer. Available for bookings both in the UK and abroad." />
    <meta name="keywords" content="photographer, london, fabz, design, UK, animation, coding, designer, developer" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimal-ui">
    <link rel="shortcut icon" href="/images/favicon.ico">
  <script type="text/javascript" src="/js/modernizr.custom.86080.js"></script>

    <!--[if lte IE 8]>
      <link rel="stylesheet" href="css/kickoff-old-ie.css">
    <![endif]-->
    <!--[if gt IE 8]><!-->
    <link rel="stylesheet" href="css/kickoff.css">
    <!--<![endif]-->

    <!-- For mobile icons etc, consider:
       * https://gist.github.com/mrmartineau/6403816
       * http://iconifier.net
    -->

    <script src="/js/libs/modernizr.min.js"></script>
</head>

<body>



    </header>


    <!--  ====================  -->
    <!--  === Main content ===  -->
    <!--  ====================  -->
    <div class="g-container" role="main">
      <h2>Thank you for contacting Fabz tv.</h2>

      <p>
        We will be in touch with you very soon.
        <br><br>
        Kind regards
        <br><br>
        Fabian Andrade <br>
        <a href="http://www.fabz.tv" target="_blank">Fabz.tv</a>
        <br><br>
      </p>
    </div>


    <!--  ==============  -->
    <!--  === Footer ===  -->
    <!--  ==============  -->
    <footer class="footer" role="contentinfo">
    <div class="backtotop">
        </div>
        <p>2015 &copy; Fabz tv | All rights reserved</p>
    </footer>


    <!-- JavaScript at the bottom for fast page loading -->
    <!--[if lte IE 8]>
      <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
      <script>window.jQuery || document.write('<script src="/js/libs/jquery.min.js"><\/script>')</script>
    <![endif]-->
    <!--[if gt IE 8]><!-->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
    <script>
    window.jQuery || document.write('<script src="/js/libs/jquery.2.min.js"><\/script>')
    </script>
    <!--<![endif]-->

    <script src="/js/dist/app.min.js"></script>

    <script>
    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-XXXXX-XX', 'domain', {
        //'cookieDomain': 'none' // Use if debugging on localhost
    });
    ga('send', 'pageview');
    </script>

</body>

</html>





<?php
}
