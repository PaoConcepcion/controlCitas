import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { strings } from './../models/strings-template';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public strings = strings;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  buscar(busqueda: string) {
    this.router.navigate(['/buscador', busqueda]);
  }

}
