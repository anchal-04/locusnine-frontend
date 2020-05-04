import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {

  constructor(public dialog : MatDialog) { }

  showUsers() {
    this.dialog.open(UserComponent, {
      height: '80%',
      width: '90%',
    });
  }

}
