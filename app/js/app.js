console.log("アプリの処理開始");

function installServiceWorker(){
  navigator.serviceWorker.register("js/sw.js").then(registration => {
    console.log("The service worker has been registered", registration);
  }).catch(error => {
    console.log(error);
  });
};

function init(){
	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		if(xhr.responseText != -1){
			insertData(xhr.responseText);
		}
	};
	xhr.open("get", "data.csv", true);
	xhr.send(null);
	
	var list = document.getElementById('listSelect');
	list.addEventListener("change", event =>{
		changeElement(0);
	});
	var previous = document.getElementById('previousButton');
	previous.addEventListener("click", event =>{
		changeElement(-1);
	});
	var next = document.getElementById('nextButton');
	next.addEventListener("click", event =>{
		changeElement(+1);
	});
};

function insertData(fileData){
	var list = document.getElementById('listSelect');
	var image = document.getElementById('imageSelect');
	var audio = document.getElementById('audioSelect');
	var rowData = fileData.split('\n');
	var columnData = new Array();
	var i;
	for(i = 0; i < rowData.length; i++){
		columnData[i] = rowData[i].split(",");
		/* listの分 */
		rowData[i] = document.createElement('option');
		rowData[i].text = columnData[i][0];
		list.add(rowData[i], list.options.item(list.length));
		/* imageの分 */
		rowData[i] = document.createElement('option');
		rowData[i].text = columnData[i][1];
		image.add(rowData[i], image.options.item(image.length));
		/* audioの分 */
		rowData[i] = document.createElement('option');
		rowData[i].text = columnData[i][2];
		audio.add(rowData[i], audio.options.item(audio.length));
	}
};

function changeElement(crement){
	var list = document.getElementById('listSelect');
	var current = document.getElementById('currentId');
	current.innerHTML = list.selectedIndex + crement;
	list.selectedIndex = current.innerHTML;
	/* 画像のターン */
	var gallery = document.getElementById('galleryImg');
	var imageFile = document.getElementById('imageSelect').options[current.innerHTML].innerHTML;
	if(imageFile == '-'){
		gallery.style.display = 'none';
	}else{
		gallery.style.display = 'inline';
		gallery.src = imageFile;
	}
	/* 音楽のターン */
	var player = document.getElementById('playerAudio')
	var audioFile = document.getElementById('audioSelect').options[current.innerHTML].innerHTML;
	if(audioFile == '-'){
		player.pause();
		player.style.visibility = 'hidden';
	}else{
		player.src = audioFile;
		player.style.visibility = 'visible';
	}
	/* 移動ボタン関連 */
	previous = document.getElementById('previousButton');
	next = document.getElementById('nextButton');
	if(current.innerHTML <= 0){
		previous.style.visibility = 'hidden';
	}else{
		previous.style.visibility = 'visible';
	}
	if(current.innerHTML >= list.options.length - 1){
		next.style.visibility = 'hidden';
	}else{
		next.style.visibility = 'visible';
	}
};

window.addEventListener("load", event =>{
  installServiceWorker();
  init();
});