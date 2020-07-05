<?php
/**
* @copyright - © 2019 IndieGo Dev.
* @license	 - MIT License
* @link		 - http://indiego.heliohost.org
* @author	 - Huda Makruf (dev@indiego.heliohost.org)
* @param	 - array $data
* @abstract	 - Main class
************************************************************************************************/
require_once './php/Encryption.php';
class IndieGo {
	#3514020510950003
	#7590920441
	private $MIME = [
		'js'=>'text/javascript',
	];
	private $RES = [
		'./js/src/Utilities.js',
		'./js/src/3D-Program.js',
		'./js/src/3D-Utilities.js',
		'./res/buffer/Box-Buff.js',
		'./res/shader/Default-Frag.glsl',
		'./res/shader/Default-Vert.glsl',
		'./res/svg/IndieGo-Logo.svg',
		'./res/svg/IndieGo-Text.svg',
		'./js/src/3D-Test.js',
		'./res/buffer/Test-Buff.js',
		'./res/shader/Test-Frag.glsl',
		'./res/shader/Test-Vert.glsl'
	];
	private function sql() {
		#$sql = new mysqli('localhost','indiego','G3ekubMBCoaXzBUf','indiego');
		$sql = new mysqli('localhost','root','','indiego');
		if($sql->connect_errno) return;
		else return $sql;
	}
	private function cleanCooky($sql,$enc) {
		$id = ((time()-60)+microtime())*100;
		$id = dechex(substr($id,3,9));
		$res = $sql->query("DELETE FROM cooky WHERE exp='S' AND id<0x$id OR exp='R' AND id<0x$id");
		$id = ((time()-(60*60*24))+microtime())*100;
		$id = dechex(substr($id,3,9));
		$res = $sql->query("DELETE FROM cooky WHERE exp='L' AND id<0x$id");
		$id = ((time()-(60*60))+microtime())*100;
		$id = dechex(substr($id,3,9));
		$res = $sql->query("DELETE FROM cooky WHERE exp='E' AND id<0x$id");
		return;
	}
	public function getLink($link,$exp=0) {
		$sql = $this->sql(); if(!$sql) return;
		$enc = new Encryption();
		$this->cleanCooky($sql,$enc);
		if($exp) {
			$enc->getKey();
			$id = (time()+microtime())*100;
			$id = dechex(substr($id,3,9));
			$link = bin2hex($enc->pack($link));
			$sql->query("INSERT INTO cooky(id,exp,val) VALUES (0x$id,'$exp',0x$link)");
			usleep(10000);
			return $exp.strtoupper($id);
		}
		$exp = $link[0];
		$id = substr($link,1);
		$res = $sql->query("SELECT val FROM cooky WHERE id=0x$id LIMIT 1");
		if(!$res->num_rows) return header('HTTP/1.1 404 : IndieGo\'s Link is Unknown or Expired. *_*');
		$val = $res->fetch_array()[0];
		$val = $enc->unpack($val)[0];
		$res->close();
		if($exp==='E') $this->getEvtFile($val);
		if($exp==='R') $this->getResFile($val);
		if($exp==='S') $this->getFullFile($val,0);
		if($exp==='L') $this->getFullFile($val,1);
		if($exp==='E' || $exp==='R' || $exp==='S') {
			$sql->query("DELETE FROM cooky WHERE id=0x$id");
		}
		$sql->close();
		return;
	}
	private function getEvtFile($filename) {
		header('Cache-Control: no-cache');
		header("Content-Type: text/event-stream");
		$enc = new Encryption(); $enc->getKey();
		$file = file_get_contents($filename);
		flush();
		echo "data:".base64_encode($enc->pack(basename($filename),$file));
		echo "\n\n";
		echo "event:ping\ndata:".date(DATE_COOKIE)."\n\n";
		ob_end_flush();
		unset($file);
		return;
	}
	private function getResFile($filename) {
		header('Cache-Control: no-cache');
		header("Content-Type: text/event-stream");
		$file = file_get_contents($filename);
		flush();
		echo "data:".base64_encode($file);
		echo "\n\n";
		echo "event:ping\ndata:".date(DATE_COOKIE)."\n\n";
		ob_end_flush();
		unset($file);
		return;
	}
	private function getFullFile($filename,$attc) {
		$name = basename($filename);
		$ext = explode('.', $name);
		$ext = $ext[count($ext)-1];
		$mime = $this->MIME[$ext];
		if(!$mime) $mime = mime_content_type($filename);
		header("Content-Type: $mime");
		header('Cache-Control: no-cache');
		if($attc) header("Content-Disposition: attachment; filename='$name'");
		$split = 1024;
		$file = fopen($filename,'rb');
		while(1) {
			$buffer = fread($file, $split);
			if(!$buffer) break;
			echo $buffer;
			set_time_limit(60);
		}
		fclose($file);
		return;
	}
	private function update($enc, $id, $offset) {
		echo 'data:'.base64_encode($id);
		return true;
	}
	public function eventHandler($data) {
		header('Cache-Control: no-cache');
		header("Content-Type: text/event-stream");
		$data = array_keys($data['E'])[0];
		$json = json_decode('['.$data.']');
		$data = '';
		foreach($json as $dec) $data .= chr($dec);
		$enc = new Encryption();
		$data = $enc->unpack($data)[0];
		$fps = ord($data[0]);
		$data = unpack('L*', substr($data,1));
		echo "event:ping\ndata:".date(DATE_COOKIE);
		while(1) {
			usleep(1000000/$fps);
			set_time_limit(2);
			ob_end_flush();
			flush();
			echo "\n\n";
			if(!$this->update($enc, $fps, $data[2])) break;
		}
		return;
	}
	private function cmd($enc, $cmd) {
		switch($cmd) {
			case'GET|RES':
				foreach($this->RES as $i => $file) {
					$mime[$i] = $this->getLink($file, 'E');
				}
				echo $enc->pack(json_encode($mime));
				break;
			default:break;
		}
		return;
	}
	public function inputHandler($file) {
		header("Content-Type: application/igx");
		$enc = new Encryption();
		$cmd = ''; $data = '';
		$split = 1024;
		$tmp_name = $file['tmp_name'];
		$file = fopen($tmp_name,'rb');
		while(1) {
			if(!$cmd) {
				$buff = fread($file, $split);
				$unpack = $enc->unpack($buff);
				$cmd = $unpack[0];
				$data .= $unpack[1];
				if(!$this->cmd($enc, $cmd)) break;
			}
			else {
				$buff = fread($file, $split);
				$data .= $enc->decode($buff);
			}
			if(!$buff) break;
			set_time_limit(60);
		}
		fclose($file);
		return;
	}
}
?>
