//functions for using and testing my A* pathfinding implementation
//import necessary utilities
import { isEmpty, getSurroundingPoints, get_point, distance } from "../utilities/utilities.js";
import { node } from "./classes.js"
//weight map where 1's equal walls and zeroes equal empty space
var test_weights = [[0, 0, 1, 1, 0, 0, 0, 1, 0, 1],
                    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                    [1, 0, 0, 1, 0, 1, 0, 1, 1, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
]
var copy = [[0, 0, 1, 1, 0, 0, 0, 1, 0, 1],
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
function Astar(array, start, end, depth) {
    var open_list = [];
    var closed_list = []
    //initialize node properties
    open_list.push(new node(start.x, start.y, 0, distance(start.x, start.y, end.x, end.y), distance(start.x, start.y, end.x, end.y)))

    while (open_list.length != 0) {

        //get the node with the lowest f value
        var current = get_lowest_node(open_list);
        //check if weve reached the goal
        if (current.x == end.x && current.y == end.y) {
            console.log("path found!");
            reconstruct_path(current)
            return 0;
        }

        //move the current node from open to closed list
        open_list = open_list.filter(item => item !== current);
        closed_list.push(current)



        //check all neighboring nodes
        var neighbors = getSurroundingPoints(array, current.x, current.y)
        for (const [key, value] of Object.entries(neighbors)) {
            //skip evaluated nodes and walls
            if (find_node(closed_list, neighbors[key].x, neighbors[key].y) == true || value == 1) {
                continue;
            }

            //calculate tentative g
            var tentative_g = current.g + distance(current.x, current.y, neighbors[key].x, neighbors[key].y)
            var neighbor_g = distance(start.x, start.y, neighbors[key].x, neighbors[key].y)
            if (find_node(open_list, neighbors[key].x, neighbors[key].y) == false) {
                var g = tentative_g
                var h = distance(neighbors[key].x, neighbors[key].y, end.x, end.y)
                var f = g + h
                var neighbor_node = new node(neighbors[key].x, neighbors[key].y, g, h, f, null, current);
                open_list.push(neighbor_node)

            } else if (tentative_g >= neighbor_g) {
                continue;
            }



        }

    }
    console.log("no path found")
    return "no path found"
}
//find the node with the lowest f value in a list of nodes using a very ineffecient linear search algorithm
//update to something more efficent in the near future
function get_lowest_node(nodes) {
    var lowest_node = nodes[0];
    for (let node of nodes) {
        if (node.f < lowest_node.f) {
            lowest_node = node;
        }
    }
    return lowest_node;
}
function reconstruct_path(end_node) {
    var path = [];
    var current = end_node
    while (current != undefined) {
        path.push(current.parent)
        current = current.parent
    }
    for (let node of path) {
        if (node != undefined) {
            console.log(node.x, node.y)
        }
    }

}
//find wether a node is in a list using its position
function find_node(nodes, x, y) {
    for (let node of nodes) {
        if (node.x == x && node.y == y) {
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
grid_graphics(test_weights)
Astar(test_weights, { x: 0, y: 0 }, { x: 9, y: 4 }, 0)