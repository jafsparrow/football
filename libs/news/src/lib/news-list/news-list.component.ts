import { AuthenticationService } from '@football/shared';
import { Observable } from 'rxjs';
import { NewsService } from './../services/news.service';
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { switchMap } from 'rxjs/operators';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

const newsSample = [
  { title: 'hello world', status: 'published' },
  { title: 'second title', status: 'draft' }
];

export interface News {
  title: string;
  status: string;
  actions: string;
}

/**
 * @title Table with sorting
 */
@Component({
  selector: 'news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status'];
  dataSource: MatTableDataSource<News>;
  news$: Observable<any[]>;
  news: Array<News>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private newsService: NewsService,
    private auth: AuthenticationService
  ) {
    this.auth.user$
      .pipe(
        switchMap(user => {
          return this.newsService.getNewsForAdmin(user);
        })
      )
      .subscribe(news => {
        // console.log(news);
        this.dataSource = new MatTableDataSource(news);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  ngOnInit() {}
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
