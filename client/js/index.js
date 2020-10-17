const ham = function() {
	var style = document.getElementById("box1").style.backgroundColor;
	if(style == 'red'){
		
		style = 'blue';
		console.log(style);
	}
	if(style == 'blue'){
		console.log("HITTING");
		style = 'red'
	}
};

