<?php
$path = 'http://'.$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
exec('ls modules/ | grep .php', $files);
foreach ($files as $module) {
	$modules[substr($module, 0, -4)] = file_get_contents($path.'modules/'.$module);
}
var_dump($modules);
?>