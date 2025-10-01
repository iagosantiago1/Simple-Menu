import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-add',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule
  ],
  templateUrl: './add.html',
  styleUrl: './add.scss'
})
export class Add {

}
