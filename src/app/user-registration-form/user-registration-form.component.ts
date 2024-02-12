import { Component, OnInit, Input } from '@angular/core'
// close Dialog
import { MatDialogRef } from '@angular/material/dialog'
// fetch api calls
import { myFlixService } from '../fetch-api-data.service'
// snackbar for display notifications
import { MatSnackBar } from '@angular/material/snack-bar'

import { Router } from '@angular/router'

@Component({
  // this decorator tells angular the class below is a component and connects to follwing files
  selector: 'app-user-registration-form', // this is 'name' of the component, to be used as <app-user-re...></app-user-re...>
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
/**
 * Represents the User Registration component of the application.
 * Provides functionality for registration of a user
 */
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' } // this decorator defines the components input
  /**
   * Constructs a user registration component and sends the input data to the API.
   * @param fetchApiData - The service handling API requests
   * @param dialogRef - Reference to MatDialog for managing the dialog
   * @param snackBar - Service for user notifications
   * @param router - Router service for navigation.
   */
  constructor(
    public fetchApiData: myFlixService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {}
  /**
   * Sends user registration data to the backend.
   * If sucessful, closes the dialog, displays a sucess message and navigates to movie page.
   * If unsucessful, an error message is displayed.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result: any) => {
        // here will be the logic for a successful user registration
        console.log('userRegistration', result)
        this.dialogRef.close() // this will close the modal on success
        this.snackBar.open('Registration successful.', 'OK', {
          duration: 2000
        })
        this.router.navigate(['movies'])
      },
      (error: any) => {
        this.snackBar.open('Registration failed!', 'Close')
      }
    )
  }
}
