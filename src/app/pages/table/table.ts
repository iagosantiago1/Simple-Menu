import { CommonModule } from '@angular/common';
import { Component, computed, input, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface TableColumn {
  label: string;
  property: string;
}

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    CommonModule
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  displayedColumns = input<TableColumn[]>([]);
  @Input() dataSource: any[] = [];
  displayedColumnsString = computed(() => this.displayedColumns().map((column:TableColumn) => column.property));
}

