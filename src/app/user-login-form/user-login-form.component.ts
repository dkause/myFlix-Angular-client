import { Component, OnInit, Input } from '@angular/core'
// close Dialog
import { MatDialogRef } from '@angular/material/dialog'
// fetch api calls
import { myFlixService } from '../fetch-api-data.service'
// snackbar for display notifications
import { MatSnackBar } from '@angular/material/snack-bar'

import { Router } from '@angular/router'
import { SharedService } from '../shared-service/shared.service'

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' } // this decorator defines the components input
  constructor(
    public myflixService: myFlixService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {}
  // this sends form inputs to the backend
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
        this.snackBar.open('Login failed!', 'CLOSE', {
        })
      }
    )
  }
}
