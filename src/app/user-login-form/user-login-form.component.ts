import { Component,OnInit,Input } from '@angular/core'
// close Dialog
import { MatDialogRef } from '@angular/material/dialog'
// fetch api calls
import { myFlixService } from '../fetch-api-data.service'
// snackbar for display notifications
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' } // this decorator defines the components input
  constructor(
    public fetchApiData: myFlixService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}
  // this sends form inputs to the backend
  loginUser(): void {
    this.fetchApiData
      .userLogin(this.userData)
      .subscribe((result: any) => {
        localStorage.setItem('user', JSON.stringify(result.user))
        localStorage.setItem('token', result.token)
        
        // here will be the logic for a successful user registration

        this.dialogRef.close() // this will close the modal on success
        this.snackBar.open(result, 'OK', {
          duration: 2000
        })
      })
  }
}
