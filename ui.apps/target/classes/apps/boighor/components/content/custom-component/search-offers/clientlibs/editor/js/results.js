var request;

function sendInfo() {
	let downloadURL = "/bin/searchOffers";
	document.getElementById("result").innerHTML = "";
	document.getElementById("no-result").innerHTML = "";
	let brandTitle = document.getElementById("brandTitle").value;
	let programId = document.getElementById("programId").value;
	let offerType = document.getElementById("offerType").value;
	let benefitType = document.getElementById("benefitType").value;
	let description = document.getElementById("description").value;
	let offerCategory = document.getElementById("offerCategory").value;
	let expiryDate = document.getElementById("expiryDate").value.replace("T", " ");
	let imageTitle = document.getElementById("imageTitle").value;
	let offerId = document.getElementById("offerId").value;
	let isactive = document.getElementById("isactive").checked;
	let isbundle = document.getElementById("isbundle").checked;
	console.log("expiryDate " + expiryDate);
	let jsonObject = {
		'brandTitle': brandTitle,
		'programId': programId,
		'offerType': offerType,
		'benefitType': benefitType,
		'description': description,
		'offerCategory': offerCategory,
		'expiryDate': expiryDate,
		'imageTitle': imageTitle,
		'offerId': offerId,
		'isactive': isactive + "",
		'isbundle': isbundle + ""
	};

	console.log("url is--> ", downloadURL);
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}

	try {
		request.onreadystatechange = this.getInfo;
		request.open("PUT", downloadURL, true);
		request.setRequestHeader("Content-Type", "application/json");
		var data = JSON.stringify(jsonObject);
		request.send(data);
	} catch (e) {
		alert("Unable to connect to server");
	}
}

function getInfo() {
	if (request.readyState === 4 && request.status === 200) {
		let table = document.getElementById("result");
		const jsObj = JSON.parse(request.responseText);
		console.log("jsObj " + jsObj);

		if (Object.keys(jsObj).length === 0) {
			console.log("No data");
			document.getElementById("no-result").innerHTML = "No Data";
			document.getElementById("result").innerHTML = "";
		} else {
			console.log("Has data");
			document.getElementById("no-result").innerHTML = "";
			displayResults(jsObj);
		}
	}

}

function displayResults(jsObj) {
	let table = document.getElementById("result");
	const tr = document.createElement("tr");
	tr.setAttribute("id", "tr-header");
	const th1 = document.createElement("th");
	const th2 = document.createElement("th");
	const th3 = document.createElement("th");
	const th4 = document.createElement("th");
	const th5 = document.createElement("th");
	th1.setAttribute("id", "th-header");
	const thData1 = document.createTextNode("Expiry Date");
	const thData2 = document.createTextNode("Offer Id");
	const thData3 = document.createTextNode("Description");
	const thData4 = document.createTextNode("Brand Title");
	const thData5 = document.createTextNode("Program Id");
	th1.appendChild(thData1);
	th2.appendChild(thData2);
	th3.appendChild(thData3);
	th4.appendChild(thData4);
	th5.appendChild(thData5);
	tr.appendChild(th1);
	tr.appendChild(th2);
	tr.appendChild(th3);
	tr.appendChild(th4);
	tr.appendChild(th5);
	table.appendChild(tr);

	for (var key in jsObj) {
		let y = document.createElement("tr");
		y.setAttribute("id", key + "");
		let z;

		if (jsObj.hasOwnProperty(key)) {
			let href;
			let innerJS = jsObj[key];
			for (let innerKey in innerJS) {
				if (innerKey === "href") {
					href = innerJS[innerKey];
					console.log("href--> " + href);
				} else {
					z = document.createElement("td");
					let t = document.createTextNode(innerJS[innerKey]);
					z.appendChild(t);
					console.log(innerKey, innerJS[innerKey]);
					y.appendChild(z);
				}
			}
			console.log(key, innerJS);

		}
		table.appendChild(y);
	}
}