var distTo = [];
var edgeTo = [];
var pq = [];

function indexOfSmallest(a) {
 var lowest = 0;
 for (var i = 1; i < a.length; i++) {
  if (a[i] < a[lowest]) lowest = i;
 }
 return lowest;
}

function DSP(graph, source){
	for (var v = 0; v < graph.nodes.length; v++){
		distTo[v] = Infinity;
	}
			
	distTo[s] = 0.0;
	pq[s] = distTo[s];
	
	while (pq.length>0) {
			smallest =indexOfSmallest(pq);
            var v = pq[smallest];
			pq.splice(smallest,1);
            for (e : graph.edges[v])
                relax(e);
        }
}

    function relax(e) {
        var v = e.from, w = e.to;
        if (distTo[w] > distTo[v] + e.weight) {
            distTo[w] = distTo[v] + e.weight;
            edgeTo[w] = e;
            if (pq.indexOf(w) != -1){ 
				pq[w]=distTo[w]);
			}
            else  {
				pq[w] = distTo[w];
			}
        }
    }
	
    function pathTo(v) {
        if (!hasPathTo(v)){
			return null;
		}
        var path = [];
        for (e = edgeTo[v]; e != null; e = edgeTo[e.from]) {
            path.push(e);
        }
        return path;
    }
	
	function hasPathTo(v) {
			return distTo[v] < Infinity;
    }
DSP()