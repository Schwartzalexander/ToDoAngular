import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TaskListComponent} from './task-list/task-list.component';
import {StoreModule} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import {StartComponent} from './start/start.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HeaderComponent} from './header/header.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatChipsModule} from "@angular/material/chips";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";

;

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    StartComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.appReducer, {metaReducers: fromApp.metaReducers}),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgbModule,
    MatChipsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCheckboxModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
