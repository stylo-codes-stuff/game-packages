//class for storing the properties of grid cells such as flamability and if there destructible

export class cell{
    constructor(material,hp,walkable,isFlammable,isDestructible,materialUnder,contains,){
        //name of the what material is on the cell
        //property for the material the cell is currently made of
        this.material = material;
        //property for weither you can stand on the cell
        this.walkable = walkable;
        //property for weither this cell canbe on fire
        this.isFlammable = isFlammable;
        //property fr weither the cell can be completely destroyed
        this.isDestructible =isDestructible;
        //property for the material that will appear if the cell is destroyed
        this.materialUnder = materialUnder;
        //property for the list of grabbable items on the cell
        this.contains = contains;
        //property for weither fire can spread from the cell
        this.fireSpreads = fireSpreads;
        //property for weither this cell can be moved by the wind
        this.affectedByWind = affectedByWind;
        //below are properties that determine how the cell is effected by certain states
        //determines how much damage the cell takes from fire
        this.damageFromFire = this.damageFromFire
        //below are properties for states
        //state for weither this cell is on fire
        this.onFire= false;
    }
}