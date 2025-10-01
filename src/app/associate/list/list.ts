import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Associate } from '../../_shared/associate';
import { associateModel } from '../../../model/associate';
import { Subscription } from 'rxjs';
import { Add } from '../add/add';

@Component({
  selector: 'app-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit,OnDestroy {

  _list: associateModel[]=[];
  subs=new Subscription();
  displayHeaders=['id', 'name', 'address', 'cl', 'status', 'action']
  datasource!: MatTableDataSource<associateModel>; 

  constructor(private service:Associate, private dialog:MatDialog) {
    
  }

  GetallList(){
    let _sub= this.service.Getall().subscribe(item=>{
      this._list = item;
      this.datasource=new MatTableDataSource(this._list);
    });
  }
  ngOnInit(): void {
    this.GetallList();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  add(){
    this.openPopup();
  }
  openPopup(){
      this.dialog.open(Add, {
        width:'60%',
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'1000ms'
      })
  }

}
