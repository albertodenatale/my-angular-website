import { Experience } from './experience';
import { Injectable } from '@angular/core';
import { Node } from '../navigation/navigation';

@Injectable()
export class ExperienceService {

  brightserve = [
    <Node>{
      id: 0,
      key: "frontend",
      label: "Front End",
      path: ["frontend"]
    },
    <Node>{
      id: 2,
      label: "javascript",
      key: "javascript",
      path: ["frontend", "javascript"]
    },
    <Node>{
      id: 3,
      label: "AngularJS",
      key: "angularjs",
      path: ["frontend", "javascript", "angularjs"]
    },
    <Node>{
      id: 6,
      label: "C#",
      key: "csharp",
      path: ["backend", "csharp"]
    }
  ];

  freshegg = [
    <Node>{
      id: 0,
      key: "frontend",
      label: "Front End",
      path: ["frontend"]
    },
    <Node>{
      id: 2,
      label: "javascript",
      key: "javascript",
      path: ["frontend", "javascript"]
    },
    <Node>{
      id: 4,
      label: "JQuery",
      key: "jquery",
      path: ["frontend", "javascript", "jquery"]
    },
    <Node>{
      id: 6,
      label: "C#",
      key: "csharp",
      path: ["backend", "csharp"]
    }
  ]

  mosaic = [
    <Node>{
      id: 0,
      key: "backend",
      label: "Back End",
      path: ["backend"]
    },
    <Node>{
      id: 6,
      label: "C#",
      key: "csharp",
      path: ["backend", "csharp"]
    }
  ]

  pharmi = [
    <Node>{
      id: 0,
      key: "frontend",
      label: "Front End",
      path: ["frontend"]
    },
    <Node>{
      id: 2,
      label: "javascript",
      key: "javascript",
      path: ["frontend", "javascript"]
    },
    <Node>{
      id: 4,
      label: "JQuery",
      key: "jquery",
      path: ["frontend", "javascript", "jquery"]
    }
  ]

  getAll(): Iterable<Experience> {
    return [
      {
        id: 7,
        label: "",
        key: "",
        path: ["backend", "csharp", "frontend", "javascript", "angularjs"],
        title: 'Software Developer',
        place: 'Brightserve, Chichester',
        description: `Worked on the extension of two different angularjs/webapi2/SQLServer projects, mainly on authentication side installing
        and configuring ASP.NET Identity with JWT tokens. I also had the opportunity to work with GIT, Windows Workflow Foundation,
        Ninject, MOQ, bower and GRUNT`,
        period: 'Sept 2016 – 13 March 2017',
        subnav: this.brightserve
      },
      {
        id: 8,
        label: "",
        key: "",
        path: ["backend", "csharp", "frontend", "javascript", "jquery"],
        title: 'Web Developer',
        place: 'Fresh Egg, Worthing',
        description: `Worked on different integrations with third party web-services (Trustpilot, Mailchimp,
        Eventbrite) for different ASP.NET MVC websites. Ordinary maintenance for customer
        websites. I worked and promoted the adoption of Owin and Katana for a small self hosted
        WebApi 2.0 webservice, withing a windows service.`,
        period: 'January 2016 – 20 August 2016',
        subnav: this.freshegg
      },
      {
        id: 9,
        label: "",
        key: "",
        path: ["backend", "csharp"],
        title: 'Junior Software Developer',
        place: 'Mosaic Online Systems, Worthing',
        description: `I Worked as .NET backend developer in the mailing industry using WPF, WCF, WebApi,
        Webforms, TSQL and MVC. I worked on a windows service, an MVC web-application, a
        WebApi web service, different TSQL stored procedures and one WPF application.`,
        period: 'September 2014 – December 2015',
        subnav: this.mosaic
      },
      {
        id: 10,
        label: "",
        key: "",
        path: ["frontend", "javascript"],
        title: 'Junior Software Developer',
        place: 'PharmiWeb Solutions, Bracknell',
        description: `Front-end development on HTML5 web sites, compiled to IOS apps. I mainly worked with
        javascript, html5 and css3.`,
        period: 'November 2013 – August 2014',
        subnav: this.pharmi
      }
    ]
  }

}
