<?php
function is_connected($domain)
{
    $connected = @fsockopen($domain, 80); 
    if ($connected){
        $is_conn = true;
        fclose($connected);
    }else{
        $is_conn = false;
    }
    return $is_conn;
}
$connections['internet'] = is_connected('www.google.cl');
echo json_encode($connections);
?>