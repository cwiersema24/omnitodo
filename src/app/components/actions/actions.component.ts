import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/actions/auth.actions';
import { AppState } from 'src/app/reducers';
import { TodoEntryComponent } from '../todo-entry/todo-entry.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet, private store: Store<AppState>) { }

  ngOnInit(): void {
  }
  addItem(): void {
    const config: MatBottomSheetConfig = {
      disableClose: true,
      autoFocus: true
    };
    this.bottomSheet.open(TodoEntryComponent, config);
  }
  logout(): void {
    this.store.dispatch(logout({ payload: null }));
  }

}
