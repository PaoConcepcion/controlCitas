import { Component, OnInit } from '@angular/core';
import { strings } from './../models/strings-template';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public strings = strings;

  constructor() { }

  ngOnInit(): void {
  }

}
