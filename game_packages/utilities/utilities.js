//utility functions to help simplify certain tasks

//performs a sanity check to determine wether all the rows in a 2d array are the same size or "congruent"
export function isCongruent(array) {
    const length = array[0].length
    for (let row of array) {
        if (row.length != length) {
            return false
        }
    }
    return true;
}
//checks wether an array is empty or not
export function isEmpty(array) {
    if (array.length == 0) {
        return true;
    } else {
        return false
    }
}
//gets the distance between to points on the grid using manhattan distance
export function man_distance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
//gets the distance between two points on the grid using euclidean distance
export function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
}
//gets the points surrounding a single point within a 2d array
//function must be either perfectly square or rectangular or else this will return an error
export function getSurroundingPoints(array, x, y) {
    var surrounding_points = []
    const indexes = { top_left: { value: [x - 1, y - 1], x: x - 1, y: y - 1 }, top: { value: [x, y - 1], x: x, y: y - 1 }, top_right: { value: [x + 1, y - 1], x: x + 1, y: y - 1 }, left: { value: [x - 1, y], x: x - 1, y: y }, right: { value: [x + 1, y], x: x + 1, y: y }, bottom_left: { value: [x - 1, y + 1], x: x - 1, y: y + 1 }, bottom: { value: [x, y + 1], x: x, y: y + 1 }, bottom_right: { value: [x + 1, y + 1], x: x + 1, y: y + 1 } }
    for (let index in indexes) {
        //try catch to handle out of bounds error
        try {
            if (array[indexes[index].value[1]][indexes[index].value[0]] != undefined){ 
            surrounding_points.push({value:array[indexes[index].value[1]][indexes[index].value[0]],x:indexes[index].value[0],y:indexes[index].value[1]})
            //handles out of bounds error by setting the non existent point value to null in the surrounding points object
}        } catch {

        }
    }
    return surrounding_points;
}
//returns the specified point from a given 2d array
export function get_point(array, x, y) {
    return array[y][x];
}
var test_weights = [[0, 0, 1, 1, 0, 0, 0, 1, 0, 1],
[0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
[1, 0, 0, 1, 0, 1, 0, 1, 1, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
]
console.log(getSurroundingPoints(test_weights,0,0))
