import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'history',
  template: `
    <experience></experience>
    <experience></experience>
    <experience></experience>
    `
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
