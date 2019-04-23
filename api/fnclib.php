<?php
function isxhr(){
    $xhr = false;
    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') 
    {
        //Request identified as ajax request
        $xhr = true;
    } else {

    }
    return $xhr;
}