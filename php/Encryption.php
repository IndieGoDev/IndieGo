<?php
# Author: Huda Makruf (huda_makruf@outlook.com | hudamaruf@gmail.com)
class Encryption {
	private $key = '';
	function __construct($key = 0) {
		$this->key = !$key ? $this->hex2key($this->getHex()) : $key;
	}
	public function setKey($key) {
		$this->key = $key;
	}
	public function getKey() {
		return $this->key = $this->hex2key($this->getHex(1));
	}
	private function getHex($mode = 0) {
		$hex = '0123456789ABCDEF';
		return !$mode ? $hex : str_shuffle($hex);
	}
	private function hex2key($hex) {
		$u8 = pack('L', hexdec(substr($hex,0,8)));
		$u8 .= pack('L', hexdec(substr($hex,8)));
		return $u8;
	}
	private function key2hex($key) {
		$hex = $this->getHex(); $val = '';
		$u32 = unpack('L*', $key);
		foreach($u32 as $dec) {
			if($dec < 0) $dec = hexdec(dechex($dec));
			$val .= $this->convert($dec, $hex, 32);
		}
		return $val;
	}
	private function convert($dec, $hex, $uInt) {
		$byte = strlen($hex); $val = '';
		for($i = 0, $lim = 0, $len = $uInt/4; $i < $len; $lim = 0, $i++) { 
			for ($ii = 0; $ii < $i; $ii++) $lim += $pos[$ii]*$mask[$ii];
			$mask[$i] = $byte**($len-1-$i);
			$pos[$i] = floor(($dec-$lim)/$mask[$i]);
			$val .= $hex[$pos[$i]];
		}
		return $val;
	}
	public function encode($str) {
		$key = $this->key2hex($this->key);
		$u8 = unpack('C*', $str); $val = '';
		foreach($u8 as $dec) {
			$val .= pack('C', hexdec($this->convert($dec, $key, 8)));
		}
		return $val;
	}
	public function decode($str) {
		$hex = $this->getHex();
		$key = $this->key2hex($this->key);
		$u8 = unpack('C*', $str); $val = '';
		foreach($u8 as $dec) {
			$hex2 = $this->convert($dec, $hex, 8);
			$hex3 = $hex[stripos($key, $hex2[0])];
			$hex3 .= $hex[stripos($key, $hex2[1])];
			$val .= pack('C', hexdec($hex3));
		}
		return $val;
	}
	public function pack($cmd, $data = 0) {
		$val = $this->key;
		$val .= chr(strlen($cmd)).$this->encode($cmd);
		if($data) $val .= $this->encode($data);
		return $val;
	}
	public function unpack($data) {
		$this->key = substr($data, 0, 8);
		$cmd = substr($data, 9, ord($data[8]));
		$cmd = $this->decode($cmd);
		$data = substr($data, 9 + ord($data[8]));
		$data = $this->decode($data);
		return [$cmd, $data];
	}
}
?>