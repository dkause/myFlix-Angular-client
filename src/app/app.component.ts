import { Component } from '@angular/core'
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component'
import { UserLoginFormComponent } from "./user-login-form/user-login-form.component";
import { MatDialog } from '@angular/material/dialog'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client'
  
  constructor(public dialog: MatDialog) {}
  // this will open the dialog on SIGNUP button click
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // dialog gets a width
      width: '280px'
    })
  }
  // this will open the dialog on LOGIN button click
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // dialog gets a width
      width: '280px'
    })
  }
}
