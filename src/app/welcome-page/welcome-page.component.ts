import { Component } from '@angular/core'
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component'
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
/**
 * Component for the welcome page of the application.
 * Provides functionality for opening user registration and login dialogs.
 */
export class WelcomePageComponent {
  /**
   * Constructs a new WelcomePageComponent with the given MatDialog instance.
   * @param dialog The Angular Material dialog service used for opening dialogs.
   */
  constructor(public dialog: MatDialog) {}
  /**
   * Opens a user registration dialog.
   * Uses Angular Material Dialog.
   * @returns void
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: 'clamp(280px, 33%, 840px )'
    })
  }
  /**
   * Opens a user login dialog.
   * Uses Angular Material Dialog.
   * @returns void
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: 'clamp(280px, 33%, 840px )'
    })
  }
}
