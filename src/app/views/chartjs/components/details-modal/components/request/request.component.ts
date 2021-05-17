import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  @Input('trace') trace: any;
  constructor() { }

  ngOnInit(): void {
    console.log("============Request============");
    console.log(this.trace);
  }

}
