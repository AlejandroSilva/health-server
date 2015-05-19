<?
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

function getPartSpace($type)
{
	if(PHP_OS=='Darwin') {
		$partitionType = 'hfs';
		$mountedBlock = 8;
	} else {
		$partitionType = 'ext4';
		$mountedBlock = 5;
	}
	switch($type)
	{
		case "size":
			$pos = 1;
			break;
		case "used":
			$pos = 2;
			break;
		case "available":
			$pos = 3;
			break;
		case "used%":
			$pos = 4;
			break;
	 }
	$command = "df -Ht $partitionType | grep /";
	exec($command, $exit);
	$result = array();
	foreach ($exit as $line) {
		$line = explode(' ', preg_replace('/\s+/', ' ', $line));
		$result[$line[$mountedBlock]] = $line[$pos];
	}
	return $result;
}
echo json_encode(getPartSpace('used%'));
?>