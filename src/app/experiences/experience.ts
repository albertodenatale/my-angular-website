import { Node } from './../navigation/navigation';

export class Experience extends Node {
    constructor(){
        super();
        
        this.path = [];
        this.title = "Position";
        this.place = "Place";
        this.description = "description";
        this.period = "from, to";
        this.path = ["new"]
    }

    title: string;
    place: string;
    description: string;
    period: string;
    subnav: Array<Node>
}