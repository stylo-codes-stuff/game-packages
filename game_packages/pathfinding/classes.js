//contains properties for a nodes position its g value, heuristic value and final sum value
export class node{
    constructor(x,y,g,h,f){
        this.x = x;
        this.y = y;
        this.g = g;
        this.h = h;
        this.f = f;

    }
}