import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
 @ViewChild('sidenav') sidenav!: MatSidenav

 Sidenav: boolean = false;

  constructor(private router: Router) {}

  toggleSidenav(){
    this.sidenav.toggle();
  }

  navigate(path: string){
    this.router.navigate([path]);
  }


}
