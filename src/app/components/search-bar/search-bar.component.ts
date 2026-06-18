import { CommonModule } from '@angular/common';
import { Component, input, OnDestroy, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit, OnDestroy {
  public debounceMillis = input<number>(1000);

  public onBeginQueryChange = output<void>();
  public onQueryChange = output<string | null>();

  public searchQueryControl = new FormControl('');

  private searchQueryBeginChangeSubscription?: Subscription;
  private searchQueryChangeSubscription?: Subscription;

  private sanitizeQuery(query: string | null) {
    let newQuery = query?.trim() ?? null;

    if(!newQuery?.length) {
      newQuery = null;
    }

    return newQuery;
  }

  ngOnInit() {
    this.searchQueryBeginChangeSubscription = this.searchQueryControl.valueChanges.subscribe(
      () => this.onBeginQueryChange.emit()
    );

    this.searchQueryChangeSubscription = this.searchQueryControl.valueChanges.pipe(
      map(query => this.sanitizeQuery(query)),
      debounceTime(this.debounceMillis())
    )
    .subscribe(query => this.onQueryChange.emit(query));
  }

  ngOnDestroy() {
    this.searchQueryBeginChangeSubscription?.unsubscribe();
    this.searchQueryChangeSubscription?.unsubscribe();
  }
}
