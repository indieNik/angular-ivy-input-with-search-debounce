import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';
import names from './names.model';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
})
export class SearchInputComponent implements OnInit, OnDestroy {
  searchItems: string[];
  searchText$ = new Subject<String>();
  _searchSub: Subscription;

  constructor() {}

  ngOnInit() {
    // this.loadNames();
    this._searchSub = this.searchText$
      .pipe(debounceTime(700))
      .subscribe((str) => {
        if (str.trim().length > 2) {
          // console.log('Search string: ', str);
          this.updateSearchResults(str);
        } else {
          this.resetInput();
        }
      });
  }

  loadNames() {
    this.searchItems = [...names];
    console.log(`this.searchItems: ${this.searchItems}`);
  }

  trackInputChanges(e) {
    this.searchText$.next(e.target.value);
  }

  updateSearchResults(searchStr) {
    // console.log(`searchStr: ${searchStr}`);
    this.searchItems = [...names].filter((name) => {
      return name.toLowerCase().includes(searchStr.toLowerCase());
    });
    // console.log(`Filtered searchItems: ${this.searchItems}`);
  }

  resetInput() {
    this.searchItems = [];
  }

  ngOnDestroy() {
    this._searchSub.unsubscribe();
  }
}
