
var hiddenCrush = true;
$(".toggle-password").click(function () {

	$(this).toggleClass("fa-eye-slash fa-eye");
	hiddenCrush = !hiddenCrush;
	var input = $($(this).attr("toggle"));
	if (input.attr("type") == "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	}
});

function calcLove(p1, p2) {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '1d601c5192msh028b17e22b33282p1d211fjsnbf8bda1ddc31',
			'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
		}
	};

	document.getElementById("score").innerHTML = "calculating...";
	document.getElementById("score").classList.add("loading");
	fetch('https://love-calculator.p.rapidapi.com/getPercentage?sname=' + p1 + '&fname=' + p2, options)
	.then((Response) => {
		return Response.json()
	}).then((response) => {
		console.log(response);

		document.getElementById("score").classList.remove("loading");
		document.getElementById("score").innerHTML = response.percentage + "%";
		if (hiddenCrush)
			p2 = "\"your crush\"";

		var resultText = "";

		document.getElementById("heart").classList.remove("beat1");
		document.getElementById("heart").classList.remove("beat2");
		document.getElementById("heart").classList.remove("beat3");
		if (response.percentage < 10) {
			document.getElementById("heart").hidden = "hidden";
			resultText = "ain't no way. stay away from " + p2 + " :(";
		} else if (response.percentage < 20) {
			document.getElementById("heart").hidden = "hidden";
			resultText = "Nah, u two aren't fit";
		} else if (response.percentage < 40) {
			document.getElementById("heart").hidden = "hidden";
			resultText = "tbh it prob wont work out";
		} else if (response.percentage < 60) {
			document.getElementById("heart").hidden = "hidden";
			resultText = "you have a chance?";
		} else if (response.percentage < 80) {
			document.getElementById("heart").hidden = "";
			document.getElementById("heart").classList.add("beat1");
			resultText = "sheeesh, you two are compatitible";
		} else if (response.percentage < 90) {
			document.getElementById("heart").hidden = "";
			document.getElementById("heart").classList.add("beat2");
			resultText = "Ohh Yea! go ask " + p2 + " out NOW!";
		} else if (response.percentage <= 100) {
			document.getElementById("heart").hidden = "";
			document.getElementById("heart").classList.add("beat3");
			resultText = "Wasai! just MARRY " + p2 + " already!!";
		}
		document.getElementById("description").innerHTML = resultText;
	})
	.catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {

    const loveForm = document.querySelector("#loveForm");
    loveForm.addEventListener("submit", e => {
        e.preventDefault();
		p1 = e.target[0].value;
		p2 = e.target[1].value;
		calcLove(p1, p2);
    })
});
