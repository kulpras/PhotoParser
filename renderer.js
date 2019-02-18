
var ele = require('electron');
var Tesseract = require('tesseract.js');

var logs = document.getElementById('logs');

function parseFile() {
	if (document.getElementById("actual-file").value != "") {
		log('Parsing Started...');
		Tesseract.recognize(document.getElementById("actual-file").value,
			{
				lang: 'eng',
				tessedit_pageseg_mode: 2,

			})
			.then(data => {
				console.log(data);
				log(data.text);
			})
			.catch(err => {
				console.log('catch\n', err);
			})
			.finally(e => {
				console.log('finally\n');
				//process.exit();
			});
	} else {
		log('Select File.');
	}
}

function log(msg) {
	var newLine = "\r\n";
	console.log(msg);
	logs.value += newLine + new Date().toLocaleString() + " : " + msg;
}

function clear(msg) {
	logs.value = "";
	document.getElementById("actual-file").value = "";
}

function attachEvents() {
	document.querySelector('#parseBtn').addEventListener('click', parseFile);
	document.querySelector('#clearBtn').addEventListener('click', clear);

	document.getElementById('select-file').addEventListener('click', function () {
		ele.remote.dialog.showOpenDialog(function (fileNames) {
			if (fileNames === undefined) {
				console.log("No file selected");
			} else {
				document.getElementById("actual-file").value = fileNames[0];
			}
		});
	}, false);

	log("Initialized.");
}

attachEvents();
