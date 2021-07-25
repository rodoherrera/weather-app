import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'weather-app';

  constructor( private updates:SwUpdate, private snackbar:MatSnackBar ){}

  ngOnInit(): void {
    // observable property that we can use to get notified when a new version of our application is available
    // Typically, we tend to subscribe to observables, but in this case, we don`t. Instead, we subscribe to the "pipe" method,
    // an RxJS operator for composing multiple operators.
    this.updates.available.pipe(

      // this is called when a new version of our application is available, It uses the "open" method of
      // the "snackbar" property to show a snack bar with an action button and subscribes to its "afterDismissed" observable.
      // The "afterDismissed" observable emits when the snack bar is closed either by clicking on the actiuon button or 
      // programatically using API methods.
      switchMap( () => this.snackbar.open('A new app version is available!', 'Update Now').afterDismissed() ),

      // "filter" is called when the snack bar is dismissed using the action button.
      filter( result => result.dismissedByAction),

      // This call the "activateUpdate" method of the "updates" property to apply the new version
      // of the application. Once the application has been updated, it reloads the window of the browser for the 
      // changes to take effect.
      map(() => this.updates.activateUpdate().then( () => location.reload() ))

    ).subscribe();
  }


}
