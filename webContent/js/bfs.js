var count = 0;

$(document).ready(function() {



});

function addNode() {

    count++;

    var str = '<div class="layer"><input type="text" id="node-name-' + count + '" placeholder="node name"> : ' +
                '<input type="text" id="node-adj-' + count + '" placeholder="adjacent nodes, please separate' + 
                ' with a comma" class="longer-input"></div>';

    $("#insert-here").before(str);

}

function calculate() {

    document.getElementById("container").innerHTML = '';

    var graph = new Graph(count+1);

    graph.graphJson += '{ "nodes" : [ ';

    /* side length of matrix to hold graph */
    var sideLength = Math.ceil(Math.sqrt(count));

    // read all vertices
    for(var i = 0; i <= count; i++) {
        var vertexID = "#node-name-" + i;
        var vertex = $(vertexID).val().trim();
        graph.addVertex(vertex);

        /* calculate plot position */
        var row = (i + 1) % sideLength;
        var col = Math.ceil((i + 1) / sideLength);

        // plot as json
        if(i != count) {
            graph.graphJson += '{ "id": "' + vertex + '", "label": "' + vertex + '", "x": ' + col +
                                ', "y": ' + row + ', "size": 3 },';
        }
        else {
            graph.graphJson += '{ "id": "' + vertex + '", "label": "' + vertex + '", "x": ' + col +
                                ', "y": ' + row + ', "size": 3 }';
        }
    }

    graph.graphJson += '], "edges": [';

    // read all edges
    var index = 0;
    for(var j = 0; j <= count; j++) {

        var vertexID = "#node-name-" + j;
        var vertex = $(vertexID).val().trim();
        
        var listID = "#node-adj-" + j;
        var list = $(listID).val();
        var adjList = list.split(',');

        for(var k = 0; k < adjList.length; k++) {
            var adjNode = adjList[k];
            adjNode = adjNode.trim();
            graph.addEdge(vertex, adjNode);

            // plot as json
            if(j == count && k == adjList.length-1) {
                graph.graphJson += '{ "id": "e' + index + '", "source": "' + vertex + '", "target": "' + adjNode + '"}';
            }
            else {
                graph.graphJson += '{ "id": "e' + index + '", "source": "' + vertex + '", "target": "' + adjNode + '"},';
            }

            index++;
        }

    }

    graph.graphJson += "] }";

    var startNode = $("#node-name-s").val();
    var output = "Traverse Order: " + graph.bfs(startNode);

    $("#output").html(output);

    /* plot */
    var data = graph.getGraphJsonObject();
    s = new sigma({ 
        graph: data,
        container: 'container',
        settings: {
            defaultNodeColor: '#ec5148'
        }
    });

}

class Queue {
    constructor() { 
        this.items = [];
    } 

    // push function 
    push(element) {     
        this.items.push(element); 
    }

    // pop function
    pop() { 
        if(this.empty()) {
            return "Underflow"; 
        }
        return this.items.shift(); 
    } 

    // front function 
    front() { 
        if(this.empty()) {
            return "No elements in Queue"; 
        }
        return this.items[0]; 
    } 

    // empty function
    empty() {
        if(this.items.length == 0) {
            return true;
        }
    }
}

class Graph {

    constructor(numOfVertices) {
        this.numOfVertices = numOfVertices;
        this.AdjList = new Map();
        this.graphJson = "";
    }

    /* get graph json object */
    getGraphJsonObject() {
        var obj = JSON.parse(this.graphJson);
        return obj;
    }

    addVertex(v) {
        this.AdjList.set(v, []);
    }

    /* since the graph is undirected, both directions should be conuted */
    addEdge(v, w) {
        this.AdjList.get(v).push(w);
        this.AdjList.get(w).push(v);
    }

    bfs(startingNode) { 

        var output = "";
    
        // create a visited array 
        var visited = []; 
        for (var i = 0; i < this.noOfVertices; i++) 
            visited[i] = false; 
    
        // Create an object for queue 
        var q = new Queue(); 
    
        // add the starting node to the queue 
        visited[startingNode] = true; 
        q.push(startingNode); 
    
        // loop until queue is element 
        while (!q.empty()) { 

            // get the element from the queue 
            var getQueueElement = q.pop(); 
    
            // passing the current vertex to callback funtion 
            output += " => " + getQueueElement;
    
            // get the adjacent list for current vertex 
            var get_List = this.AdjList.get(getQueueElement); 
    
            // loop through the list and add the elemnet to the 
            // queue if it is not processed yet 
            for (var i in get_List) { 
                var neigh = get_List[i]; 
    
                if (!visited[neigh]) { 
                    visited[neigh] = true; 
                    q.push(neigh); 
                } 
            } 
        } 

        return output.substring(4 , output.length);
    } 



}