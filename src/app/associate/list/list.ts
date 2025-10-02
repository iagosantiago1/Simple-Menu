import { Component, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
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

  @ViewChild(MatTable) table!:MatTable<any>

  constructor(private service:Associate, private dialog:MatDialog) {
    
  }

  GetallList(){
    let _sub= this.service.Getall().subscribe(item=>{
      this._list = item;
      this.datasource=new MatTableDataSource(this._list);
    });
  }

  UpdatelList(){
    let _sub= this.service.Getall().subscribe(item=>{
      this._list = item;
      this.datasource.data=this._list;
      this.table.renderRows();
    });
  }

  ngOnInit(): void {
    this.GetallList();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  add(){
    this.openPopup(0);
  }
  openPopup(id:number){
      this.dialog.open(Add, {
        width:'40%',
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'1000ms',
        data: {
          id: Number(id)
        }
      }).afterClosed().subscribe(s=>{
        this.UpdatelList();
      })
      
  }

  Edit(id:any){
    this.openPopup(id);
  }
  Delete(id:any){
    if(confirm('Você tem certeza que deseja deletar?')){
      this.service.Delete(id).subscribe(item => {
        alert('Deletado com Sucesso.');
        this.UpdatelList();
      })
    }
  }

}
