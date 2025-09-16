import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-main',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ScrollingModule
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

  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);


}
