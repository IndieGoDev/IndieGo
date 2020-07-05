<?php
/**
* @abstract	 - Initial class
************************************************************************************************/
require_once './php/IndieGo.php';
class DataIO extends IndieGo
{
	public function __construct($gets, $files)
	{
		if(count($files)) return parent::inputHandler($files['IGX']);
		if(count($gets)) {
			$get = array_keys($gets)[0];
			if($gets['E']) return parent::eventHandler($gets);
			if($get[0] === 'S'
			|| $get[0] === 'R'
			|| $get[0] === 'L'
			|| $get[0] === 'E'
			) return parent::getLink($get);
			return header('HTTP/1.1 404 : IndieGo\'s Link is Unknown or Expired. *_*');
		}
		$logo = parent::getLink('./res/svg/IndieGo-Logo.svg', "S");
		$text = parent::getLink('./res/svg/IndieGo-Text.svg', "S");
		$client = parent::getLink('./js/IndieGo-client.js', "S");
		$worker = parent::getLink('./js/IndieGo-worker.js', "S");
		$crypt = parent::getLink('./js/src/Encryption.js', "R");
		$server = parent::getLink('./js/src/Connection.js', "R");
		return print <<<HTML
			<!DOCTYPE html>
			<html lang="en-US">
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
					<title>IndieGo</title>
					<style>
						body {
							background-color:indigo; margin:0; padding:0;
							left:0; top:0; right:0; bottom:0; position:fixed;
						}
						canvas {
							background: 55% 50% / 20% auto no-repeat url(?{$text}), 38% 50% / 10% auto no-repeat url(?{$logo});
							width:100%; height:100%;
						}
					</style>
					<script async="async" src="?$client">$worker$crypt$server</script>
					<script>
						window.CONNECTION_RESPOND = false;
						window.setTimeout(() => { if(!CONNECTION_RESPOND) location.reload() }, 5000);
					</script>
				</head>
				<body>
				</body>
			</html>
HTML;
	}
}
?>
