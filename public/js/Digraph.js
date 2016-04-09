



/* var graph = {
  nodes: [{'name':"A",'lat':0, 'lng':0}],
  edges: [
    [{to: 1, 'weight': 0}, {to: 2}]
  ]
} */
var graph = {
  nodes: [],
  edges: []
}



function getFishPoints() {
	console.log("Attempting to get all points");
	var jQueryPromise = $.get('http://localhost:8080/api/fishPoints', { //however, this has a different URL so we get all the fish points instead
		dataType: "jsonp"
	});
	var realPromise = Promise.resolve(jQueryPromise);
	realPromise.then(function(val) {
		// console.log(val);
		createGraph(val);		
	});
}

function createGraph(points){
	console.log("creating graph");
	for (var i = 0; i < points.length; i++) {
		var node = {'name': points[i].locName,'lat':points[i].geometry.lat, 'lng': points[i].geometry.lng};
		graph.nodes.push(node)
	}
	for (var i = 0; i < points.length; i++) {			//for each point
		var adjlist = [];								//create and adjlist
		for (var j = 0; j < points.length; j++) {		//loop through all points
			if(i !=j){									//don't create self loops
			var edgeweight = haverSine(points[i].lat,points[i].lng,points[j].lat,points[j].lng);
			var edge = {'to':j, 'weight':weight}	;						//create an edge to the given node
			adjlist.push(edge);
			}
		}
		graph.edges.push(adjlist)						//add each node's adjlist to edges array in graph
		graph.edges.push(adjlist)						//add each node's adjlist to edges array in graph
	}
	
}

function haverSine(lat1,lon1,lat2,lon2){
	var R = 6371;
	var x1 = lat2-lat1;
	var dLat = x1.toRad();  
	var x2 = lon2-lon1;
	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}

getFishPoints();
console.log(graph.nodes[0].name);