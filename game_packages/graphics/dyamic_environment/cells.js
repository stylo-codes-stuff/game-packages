//material classes to create cells that have properties of the respective material

import { cell } from "./classes";

class grass{
    constructor(){
        this = new cell("grass",true,true,true,new dirt(),)
    }
}
class dirt{
    constructor(){
        this = new cell()
    }
}