var before = false;

function plannerStart() {
	document.getElementById('plannerDiv').style.display='block'; //get our div element called light and display it (this is the 'popup')
	document.getElementById('fade').style.display='block'; //get our fade and display it (this is what causes the background to fade to black)
	if (!before) {
		var jQueryPromise = $.get('http://localhost:8080/api/makeGraph', { //make a new variable that store the get request object, this doesn't resolve it
			dataType: "jsonp" //necessary to play nicely with newer version of node
		});
		var realPromise = Promise.resolve(jQueryPromise); //realPromise is another variable that gets created with a trigger on when the problem resolves
		realPromise.then(function(val) {
			
		});
		before = true;
	}
	
}

function goPlannerClick() {
	var starting = document.getElementById('startSpot').value;
	var finishing = document.getElementById('destSpot').value;
	console.log(starting, finishing);
	var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:8080/api/getPath",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "de3d5541-218e-e94d-a5fc-5bdf64f71b08",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "from": starting,
    "to": finishing
  }
}

	$.ajax(settings).done(function (response) {
		x = document.getElementById('inner-light-planner')
		console.log(x);
  		console.log(response);
	});
}