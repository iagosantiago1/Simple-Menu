import { Component } from '@angular/core';
import { Table, TableColumn } from '../table/table';

@Component({
  selector: 'app-users',
  imports: [Table],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})

export class Users {
  displayedColumns: Array<TableColumn> = [
    {label:'ID', property:'id'},
    {label:'Nome', property:'name'},
    {label:'Idade', property:'old'}

    ];
  dataSource = [
  {id: 1, name: 'Daniel', old: 27},
  {id: 2, name: 'Guilherme', old: 30},
  {id: 3, name: 'Marcos', old: 49},
  {id: 4, name: 'Gustavo', old: 30},
  {id: 5, name: 'Fred', old: 20},
  {id: 1, name: 'George', old: 42},
  ];
}