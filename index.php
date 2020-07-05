<?php
/**
*************************************************************************************************
*      ༗༗༗                     ༗༗༗༗༗    ༗༗༗                ༗༗༗ ༗༗༗              ༗༗༗༗	            *
*      ༗༗༗                    ༗    ༗༗   ༗༗༗                ༗༗༗ ༗༗༗             ༗༗༗༗༗	            *
*      ༗༗༗                   ༗      ༗༗  ༗༗༗                ༗༗༗                ༗༗༗༗༗༗	            *
*  ༗༗༗ ༗༗༗   ༗༗༗༗༗ ༗༗༗  ༗༗༗ ༗   ༗༗༗  ༗  ༗༗༗    ༗༗༗     ༗༗༗ ༗༗༗ ༗༗༗   ༗༗༗༗༗   ༗༗༗༗        ༗༗༗༗༗  	*
* ༗༗༗༗ ༗༗༗  ༗༗༗༗༗༗༗ ༗༗༗༗༗༗  ༗  ༗༗༗༗༗ ༗  ༗༗༗   ༗༗༗༗༗   ༗༗༗༗ ༗༗༗ ༗༗༗  ༗༗༗༗༗༗༗  ༗༗༗        ༗༗༗༗༗༗༗ 	*
*༗༗༗༗༗ ༗༗༗ ༗༗༗༗༗༗༗༗༗ ༗༗༗༗༗  ༗ ༗༗  ༗༗ ༗  ༗༗༗  ༗༗༗༗༗༗༗ ༗༗༗༗༗ ༗༗༗ ༗༗༗ ༗༗༗༗༗༗༗༗༗ ༗༗༗  ༗༗༗  ༗༗༗༗༗༗༗༗༗	*
*༗༗༗   ༗༗༗ ༗༗༗  ༗༗༗༗ ༗༗༗༗   ༗ ༗༗༗༗༗ ༗   ༗༗༗  ༗༗༗ ༗༗༗ ༗༗༗   ༗༗༗ ༗༗༗ ༗༗༗  ༗༗༗༗ ༗༗༗  ༗༗༗༗ ༗༗༗   ༗༗༗	*
*༗༗༗   ༗༗༗ ༗༗༗ ༗༗༗༗༗ ༗༗༗༗   ༗  ༗༗༗༗༗    ༗༗༗  ༗༗༗ ༗༗༗ ༗༗༗   ༗༗༗ ༗༗༗ ༗༗༗ ༗༗༗༗༗ ༗༗༗༗  ༗༗༗ ༗༗༗   ༗༗༗	*
*༗༗༗༗༗༗༗༗༗ ༗༗༗༗༗      ༗༗     ༗          ༗༗༗  ༗༗༗ ༗༗༗ ༗༗༗༗༗༗༗༗༗ ༗༗༗ ༗༗༗༗༗      ༗༗༗༗༗༗༗༗ ༗༗༗༗༗༗༗༗༗	*
* ༗༗༗༗༗༗༗   ༗༗༗༗༗     ༗༗      ༗     ༗   ༗༗༗  ༗༗༗ ༗༗༗  ༗༗༗༗༗༗༗  ༗༗༗  ༗༗༗༗༗      ༗༗༗༗༗༗   ༗༗༗༗༗༗༗ 	*
*  ༗༗༗༗༗     ༗༗༗༗༗    ༗        ༗༗༗༗༗    ༗༗༗  ༗༗༗ ༗༗༗   ༗༗༗༗༗   ༗༗༗   ༗༗༗༗༗      ༗༗༗༗     ༗༗༗༗༗  	*
*************************************************************************************************
* @abstract  - IndieGo
* @version   - 0.0.1
* @copyright - © 2018-2019 Huda Makruf.
* @license   - MIT License
* @link      - http://indiego.heliohost.org (dev@indiego.heliohost.org)
* @author    - Huda Makruf (huda_makruf@outlook.com | hudamaruf@gmail.com)
************************************************************************************************/
SET_ERROR_HANDLER( function(){}, E_ALL );
date_default_timezone_set('Asia/Jakarta');
require_once './php/DataIO.php';
$Init = new DataIO($_GET, $_FILES);
unset($Init);
?>