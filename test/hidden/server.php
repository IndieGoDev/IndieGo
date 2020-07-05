<?php
	// menentukan header untuk event
	header("Cache-Control: no-cache");
	header("Content-Type: text/event-stream");

	// mencari file dari link yang dikirim
	$link = $_GET["link"];
	$file = file_get_contents($link);

	// mengirim file ke client dengan format 'event-stream'.
	// 'data:' adalah 'reserved word' untuk format 'event-stream'.
	// sebelum dikirim, file di convert dulu ke base64
	// untuk menghindari karakter ilegal seperti baris baru (\n).
	echo "data:".base64_encode($file);
	// double new line digunakan untuk memisahkan data. 
	echo "\n\n";
?>