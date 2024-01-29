import { Component } from '@angular/core'
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component'
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
  constructor(public dialog: MatDialog) {}
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: 'clamp(280px, 33%, 840px )'
    })
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: 'clamp(280px, 33%, 840px )'
    })
  }
}
