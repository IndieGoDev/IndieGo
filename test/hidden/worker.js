// saat worker menerima link file
onmessage = function(e) {

	// Saya menggunakan EventSource untuk mendownload file dari server.
	// bukan menggunakan 'XMLHttpRequest' atau 'fetch'
	// yg bisa dilihat di menu 'network' pada DevTools.
	const event = new EventSource('server.php?link='+e.data);

	// saat file selesai didownload
	event.onmessage = function(e) {

		// file dikirim ke index.html
		postMessage(e.data);

		// menutup event agar file tidak dieksekusi berulang-ulang
		event.close();
	}

	event.onerror = function() {
		console.error('EventSource Error');
	}
}
