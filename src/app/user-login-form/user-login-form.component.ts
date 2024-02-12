import { Component, OnInit, Input } from '@angular/core'
// close Dialog
import { MatDialogRef } from '@angular/material/dialog'
// fetch api calls
import { myFlixService } from '../fetch-api-data.service'
// snackbar for display notifications
import { MatSnackBar } from '@angular/material/snack-bar'

import { Router } from '@angular/router'
import { SharedService } from '../shared-service/shared.service'
/**
 * Represents the User Login Form component of the app.
 * This component allows users to login by sending user login data to the backend.
 */

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' }
  /**
   * Constructs a UserLoginFormComponent and initializes dependencies.
   * @param myflixService - The Service handling API requests
   * @param dialogRef - Reference to MatDialog for managing the dialog
   * @param snackBar - Service for user notifications
   * @param router - Router service for navigation.
   * @param sharedService - Service for the user loggedIn status
   */
  constructor(
    public myflixService: myFlixService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {}
  /**
   * Sends user login data to the backend.
   * If sucessful, closes the dialog, displays a sucess message and navigates to movie page.
   * If unsucessful, an error message is displayed.
   */
  loginUser(): void {
    this.myflixService.userLogin(this.userData).subscribe(
      (result: any) => {
        localStorage.setItem('user', JSON.stringify(result.user))
        localStorage.setItem('token', result.token)

        this.sharedService.setUserLoggedInStatus(true)

        this.dialogRef.close()
        this.snackBar.open('Welcome to myFlix', 'OK', {
          duration: 2000
        })
        this.router.navigate(['movies'])
      },
      (error: any) => {
        this.snackBar.open('Login failed!', 'CLOSE', {})
      }
    )
  }
}
