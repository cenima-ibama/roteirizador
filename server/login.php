
<?php

	$HOST = "10.1.8.189";
	$USER = "postgres";
	$PASSWORD = "123456";
	$DATABASE = "3D";
	$PORT = "5432";
	// $MES = "JULHO";
	$data= file_get_contents("php://input");
	$request = json_decode($data);
	$username =  $request->username;
	$password =  $request->password;
    

    $POSTGRES = pg_connect("host=$HOST port=$PORT dbname=$DATABASE user=$USER password=$PASSWORD");
    $arr = array();
    $query = "SELECT login,senha FROM login WHERE login= '" . $username . "' and senha='" . $password . "'";
    $result = pg_query($query) or die('Query failed: ' . pg_last_error());
    $contests = pg_num_rows($result);
    
	if ($contests == 1) {
        $arr = array('msg' => "true");
        $jsn = json_encode($arr);
        print_r($jsn);
    } else {
        $arr = array('msg' => "false");
        $jsn = json_encode($arr);
        print_r($jsn);
    }
?>
