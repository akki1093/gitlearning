var request1;
var id;
function getDDList(prop) {
    id = prop;
    console.log(prop);
	document.getElementById(prop).innerHTML="";
	var url = "/bin/GetProperties?param="+prop+"&folderName=offers";
	console.log("url is--> ", url);
	if (window.XMLHttpRequest) {
		request1 = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request1 = new ActiveXObject("Microsoft.XMLHTTP");
	}

	try {
		request1.onreadystatechange = this.myFunction;
		request1.open("GET", url, true);
		request1.send();
	} catch (e) {
		alert("Unable to connect to server");
	}
}




function myFunction() {
	var btn = document.getElementById(id);
	var offerArray = request1.responseText.split(", ");
	console.log(request1.responseText);
	for (i = 0; i < offerArray.length; i++) {
		if (!offerArray[i].length === 0 || offerArray[i].trim()) {
			var options = document.createElement("option");
			if (i == offerArray.length - 1) {
				var optionData = offerArray[i].substring(0, offerArray[i].length - 1);
                console.log(optionData+'#');
			} else {
				var optionData = offerArray[i];
			}
			options.innerHTML = optionData;
             options.value = optionData
			btn.appendChild(options);
		}
	}
}

