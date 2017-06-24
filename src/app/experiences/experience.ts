import { Node } from './../navigation/navigation';

export class Experience extends Node{
    title:string;
    place:string;
    description:string;    
    period:string;
    subnav:Array<Node>
}