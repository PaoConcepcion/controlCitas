import { Component, OnInit } from '@angular/core';
import { strings } from './../models/strings-template';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public strings = strings;

  constructor() { }

  ngOnInit(): void {
  }

}
