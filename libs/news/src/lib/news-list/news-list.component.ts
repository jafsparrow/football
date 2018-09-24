// import { Component, OnInit, ViewChild } from '@angular/core';
// import { News } from '../modals/news';
// import { MatTableDataSource, MatSort } from '@angular/material';

// @Component({
//   selector: 'news-list',
//   templateUrl: './news-list.component.html',
//   styleUrls: ['./news-list.component.css']
// })
// export class NewsListComponent implements OnInit {
//   sampleNews = [
//     { title : 'helo world', summary: 'yo summary'},
//     { title : '33helo second news', summary: 'yo summary'},
//     { title : 'helo thrird news', summary: 'yo summary'},
//   ]

//   columnsToDisplay = ['title', 'summary'];
//   @ViewChild(MatSort) sort: MatSort;

//   constructor() {
//     if(true) {
//       this.columnsToDisplay.push('actions');
//     }
//   }

//   displayedColumns: string[] = ['position', 'name'];//, 'weight', 'symbol'];
//   dataSource = new MatTableDataSource(this.sampleNews);

//   applyFilter(filterValue: string) {
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }


//   ngOnInit() {
//     this.dataSource.sort = this.sort;
//   }

// }



import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

/**
 * @title Table with sorting
 */
@Component({
  selector: 'news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
