<?php

	$HOST = "10.1.8.45";
	$USER = "painel";
	$PASSWORD = "p41n3l";
	$DATABASE = "painel_devel";
	$PORT = "5432";
	// $month = file_get_contents("php://input");


    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $month = $request->month;
    $year = $request->year;
    // $local = $request->local;
    $local = 'terra_indigena_buffer';

	// $out = exec('/usr/bin/ogr2ogr -lco ENCODING=UTF-8 -skipfailures -a_srs EPSG:4674 -s_srs EPSG:4674 -t_srs EPSG:4674 -nlt POLYGON -f "ESRI Shapefile" /var/www/projects/3D/Deter/DETER_'.$month.'.shp PG:"host=10.1.8.45 user=painel dbname=painel_devel password=p41n3l" -sql "SELECT * FROM deter d, unidade_conservacao t WHERE mes=\''. $month . '\' AND ano=\'2014\' AND ST_InterSects (d.shape, t.geom)"');
    $POSTGRES = pg_connect("host=$HOST port=$PORT dbname=$DATABASE user=$USER password=$PASSWORD");

    $query =  'SELECT * FROM deter d, '.$local.' t WHERE  mes=\''. $month . '\' AND ano=\'' .$year. '\'  AND ST_InterSects (d.shape, t.geom)';
	$result = pg_query($query);
	$contests = pg_num_rows($result);


	if ($contests == 0){
		echo '1';
	}
	else {
		// GDAL Generating ShapeFile
		$out = exec('/usr/bin/ogr2ogr -lco ENCODING=UTF-8 -skipfailures -a_srs EPSG:4674 -s_srs EPSG:4674 -t_srs EPSG:4674 -nlt POLYGON -f "ESRI Shapefile" /var/www/3D/Deter/DETER_'.$month.'_' . $year .'.shp PG:"host=10.1.8.45 user=painel dbname=painel_devel password=p41n3l" -sql "SELECT DISTINCT ON (d.objectid) d.* FROM deter d, '.$local.' t WHERE  mes=\''. $month . '\' AND ano=\'' .$year. '\'  AND ST_InterSects (d.shape, t.geom) AND tipo=\'Alerta DETER\' ORDER BY d.objectid"');

		$inf = '/Deter/DETER_' . $month . '_' . $year . '.shp';
		$file = 'DETER_'.$month . '_' . $year . '.shp';
		$path = '../Deter/';

		/* creates a compressed zip file */
		$files_to_zip = array(
			$path. 'DETER_'. $month .'_' . $year . '.shp',
			$path. 'DETER_'. $month .'_' . $year . '.cpg',
			$path. 'DETER_'. $month .'_' . $year . '.dbf',
			$path. 'DETER_'. $month .'_' . $year . '.prj',
			$path. 'DETER_'. $month .'_' . $year . '.shx'
		);




		function create_zip($files = array(),$destination = '',$overwrite = true) {

			$valid_files = array();

			if(is_array($files)) {
				foreach($files as $file) {
					if(file_exists($file)) {
						$valid_files[] = $file;
					}
				}
			}

			if(count($valid_files)) {
				$zip = new ZipArchive();
				if($zip->open($destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
					return false;

				}
				foreach($valid_files as $file) {
					$zip->addFile($file,$file);
				}
				$zip->close();

				//check to make sure the file exists

				return file_exists($destination);
			}
			else
			{
				return false;
			}
		}

		$result = create_zip($files_to_zip, $path.'Deter_'. $month . '_' . $year . '.zip');
		if(is_file($path.'Deter_'.$month. '_' . $year .'.zip')){

			exec('rm '. $path. 'DETER_'. $month . '_' . $year .'.shp');
			exec('rm '. $path. 'DETER_'. $month . '_' . $year .'.cpg');
			exec('rm '. $path. 'DETER_'. $month . '_' . $year .'.dbf');
			exec('rm '. $path. 'DETER_'. $month . '_' . $year .'.shx');
			exec('rm '. $path. 'DETER_'. $month . '_' . $year .'.prj');

		}
	// echo  'http://10.1.8.55/3D/Deter/Deter_'. $month .'.zip';
	// echo  'http://10.1.8.218/projects/3D/Deter/Deter_'. $month . '_' . $year .'.zip';

	echo  '//' . $_SERVER['SERVER_NAME'] . '/3D/Deter/Deter_'. $month . '_' . $year .'.zip';
	}

?>




