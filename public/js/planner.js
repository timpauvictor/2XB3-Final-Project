function plannerStart() {
	document.getElementById('plannerDiv').style.display='block'; //get our div element called light and display it (this is the 'popup')
	document.getElementById('fade').style.display='block'; //get our fade and display it (this is what causes the background to fade to black)
	var jQueryPromise = $.get('http://localhost:8080/api/makeGraph', { //make a new variable that store the get request object, this doesn't resolve it
		dataType: "jsonp" //necessary to play nicely with newer version of node
	});
	var realPromise = Promise.resolve(jQueryPromise); //realPromise is another variable that gets created with a trigger on when the problem resolves
}

function searchButton() {
	
}