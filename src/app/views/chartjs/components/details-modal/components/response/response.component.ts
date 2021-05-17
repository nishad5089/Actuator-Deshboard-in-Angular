import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  @Input('trace') trace: any;
  constructor() { }

  ngOnInit(): void {
  }

}
