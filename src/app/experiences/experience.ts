import { Node } from './../navigation/navigation';
import * as moment from 'moment';
import { AngularFireAction, SnapshotAction } from "angularfire2/database";

export class Experience extends Node {
    constructor() {
        super();

        this.path = [];
        this.title = "Position";
        this.place = "Place";
        this.description = "description";
        this.period = {
            from: new Date().getMilliseconds(),
            to: new Date().getMilliseconds()
        };
        this.path = ["new"];
    }

    title: string;
    place: string;
    description: string;
    period: Period;
    subnav: Array<Node>;
    relevancy: number;
}

export class Period {
    from: number;
    to: number;
}

export function ParsePeriod(period: string): Period {
    // TODO this will have to change
    if (period == null) {
        return new Period();
    }

    let dates: string[] = period.split("-");

    if(dates.length == 1){
        dates = period.split("–");
    }

    let from: string = dates[0];
    let to: string = dates[1];

    
    let dateFrom: number = moment(from, "MMMM YYYY").unix();
    let dateTo: number = null;

    if(to){
        let dateTo: number = moment(to, "MMMM YYYY").unix();
    }

    return <Period>{
        from: dateFrom,
        to: dateTo
    }
}

export function formatPeriod(period:Period): string {
    let dateFrom : string = moment.unix(period.from).format("MMMM YYYY");
    var dateTo = "Today";
    
    if(period.to){
        var dateTo = moment.unix(period.to).format("MMMM YYYY");
    }

    return dateFrom.concat(" - ").concat(dateTo);
}

export function mapFromSnapshot(experience: SnapshotAction) {
    let period : Period = experience.payload.val().period;

    if(period== null){
        period = <Period>{
            from:0,
            to:0
        }
    };
    
    return <Experience>{
        id: experience.key,
        title: experience.payload.val().title,
        place: experience.payload.val().place,
        description: experience.payload.val().description,
        subnav: experience.payload.val().subnav,
        period: period,
        path: experience.payload.val().path,
        label: experience.payload.val().label
    }
}