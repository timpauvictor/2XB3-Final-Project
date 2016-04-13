



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

module.exports = {
	createGraph: function(points) {
		console.log("creating graph");
		for (var i = 0; i < points.length; i++) {
			var node = {'name': points[i].locName,'lat':points[i].geometry.lat, 'lng': points[i].geometry.lng};
			graph.nodes.push(node)
		}
		for (var i = 0; i < points.length; i++) {			//for each point
			console.log("working");
			var adjlist = [];								//create an adjlist
			for (var j = 0; j < points.length; j++) {		//loop through all points
				if(i !=j){									//don't create self loops
					var edgeweight = haverSine(points[i].lat,points[i].lng,points[j].lat,points[j].lng);
					// console.log(edgeweight);
					var edge = {'from': i,'to':j, 'weight':edgeweight};						//create an edge to the given node
					adjlist.push(edge);
				}
			}
			console.log(adjlist);
			graph.edges.push(adjlist)						//add each node's adjlist to edges array in graph
		}
		// console.log(graph);
		return graph;
	}
}

// function getFishPoints() {
// 	console.log("Attempting to get all points");
// 	var jQueryPromise = $.get('http://localhost:8080/api/fishPoints', { //however, this has a different URL so we get all the fish points instead
// 		dataType: "jsonp"
// 	});
// 	var realPromise = Promise.resolve(jQueryPromise);
// 	realPromise.then(function(val) {
// 		asyncHelper(val);		
// 	});
// }

// function createGraph(points){
// 	console.log("creating graph");
// 	for (var i = 0; i < points.length; i++) {
// 		var node = {'name': points[i].locName,'lat':points[i].geometry.lat, 'lng': points[i].geometry.lng};
// 		graph.nodes.push(node)
// 	}
// 	for (var i = 0; i < points.length; i++) {			//for each point
// 		var adjlist = [];								//create an adjlist
// 		for (var j = 0; j < points.length; j++) {		//loop through all points
// 			if(i !=j){									//don't create self loops
// 			var edgeweight = haverSine(points[i].lat,points[i].lng,points[j].lat,points[j].lng);
// 			var edge = {'from': i,'to':j, 'weight':edgeweight}	;						//create an edge to the given node
// 			adjlist.push(edge);
// 			}
// 		}
// 		graph.edges.push(adjlist)						//add each node's adjlist to edges array in graph
// 	}
	
// 	// console.log(graph);
// 	return graph;
// }

function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

function haverSine(lat1,lon1,lat2,lon2){
	var R = 6371;
	var x1 = lat2-lat1;
	var dLat = toRad(x1);  
	var x2 = lon2-lon1;
	var dLon = toRad(x2);  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}

// getFishPoints();
// console.log(graph.nodes[0].name);