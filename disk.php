<?
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

function getPartSpace($type)
{
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
	$command = "df -Ht ext4 | grep /";
	exec($command, $exit);
	foreach ($exit as $line) {
		$line = explode(' ', preg_replace('/\s+/', ' ', $line));
		$result[$line[5]] = $line[$pos];
	}
	return $result;
}
echo json_encode(getPartSpace('used%'));
?>