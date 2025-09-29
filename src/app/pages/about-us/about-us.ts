import { Component } from '@angular/core';
import { Table, TableColumn } from '../table/table';

@Component({
  selector: 'app-about-us',
  imports: [Table],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss'
})
export class AboutUs {
  displayedColumns: Array<TableColumn> = [
      {label:'ID', property:'id'},
      {label:'Descrição', property:'desc'}
     ];
    dataSource = [
    {id: 1, desc: 'Daniel', old: 27},
    {id: 2, desc: 'Guilherme', old: 30},
    {id: 3, desc: 'Marcos', old: 49},
    {id: 4, desc: 'Gustavo', old: 30},
    {id: 5, desc: 'Fred', old: 20},
    {id: 1, desc: 'George', old: 42},
    ];
}
