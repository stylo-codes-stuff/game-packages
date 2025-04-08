//functions for using and testing my A* pathfinding implementation

//import necessary utilities
import { isEmpty,getSurroundingPoints,get_point,distance } from "../utilities/utilities.js";
import {node} from "./classes.js"
var new_node = new node()
//weight map where 1's equal walls and zeroes equal empty space
var test_weights = [[0, 0, 1, 1, 0, 0, 0, 1, 0, 1],
                    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                    [1, 0, 0, 1, 0, 1, 0, 1, 1, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
]
function generate_weighted_grid(width, height) {
    var grid = []
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {

        }
    }

}
//this implentation takes an extra depth argument to decide how many steps it should take before giving up and deciding that theres no path to the end
//the start and end arguments both take arrays each holding their respective x and y values
function Astar(array,start, end, depth) {
    var open_list = [];
    var closed_list = []
    //creates a node for the starting position and pusges it to the open list
    //both h and f are equal to distance since g is the distance from the start
    open_list.push(new node(start.x,start.y,0,distance(start.x,start.y,end.x,end.y),distance(start.x,start.y,end.x,end.y)))
    while(open_list.length !=0){
        for(let node of open_list){
            //set the current node
            var current = get_lowest_node(open_list);
            //check if the node were on is the end node
            if(current.x == end.x && current.y == end.y){
                console.log("path found!");
                return 0;
            }
            //move the current node from open to closed
            open_list = open_list.filter(item => item !== node);
            closed_list.push(node)
            //check all neighboring nodes skipping closed ones
            //such as walls or already evaluated nodes
            var neighbors = getSurroundingPoints(test_weights,current.x,current.y)
            //check all neighboringg
            for(const [key,value] of Object.entries(neighbors)){
                if(find_node(closed_list,neighbors[key].x,neighbors[key].y)){
                    continue;
                }
                var neighbor_node = new node()
                var tentative_g = current.g + distance(current.x,current.y)
            }
        }
    }

}
//find the node with the lowest f value in a list of nodes using a very ineffecient linear search algorithm
//update to somet
function get_lowest_node(nodes){
    var lowest_node = nodes[0];
    for(let node of nodes){
        if(node.f <lowest_node.f){
            lowest_node = node;
        }
    }
    return lowest_node;
}
//find wether a node is in a list using its position
function find_node(nodes,x,y){
    for(let node of nodes){
        if(node.x == x && node.y == y){
            return true;
        }
        
    }
    return false;
}
//prints the weight map using ascii characters for each different weight
function grid_graphics(weightmap) {
    var array = ""
    weightmap.forEach(function (row, index) {
        var new_row = [];
        row.forEach(function (weight, index) {
            if (weight == 0) {
                new_row.push(" ")
            } if (weight == 1) {
                new_row.push("■")
            }
        });
        array += new_row + "\n"
    }
    );
    const final_array = array.replace(/,/g, "");

    console.log(final_array)
}
Astar(test_weights,{x:0,y:0},{x:10,y:10},0)