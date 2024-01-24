import { Component, OnInit, Input } from '@angular/core'
// close Dialog
import { MatDialogRef } from '@angular/material/dialog'
// fetch api calls
import { myFlixService } from '../fetch-api-data.service'
// snackbar for display notifications
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  // this decorator tells angular the class below is a component and connects to follwing files
  selector: 'app-user-registration-form', // this is 'name' of the component, to be used as <app-user-re...></app-user-re...>
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' } // this decorator defines the components input
  constructor(
    public fetchApiData: myFlixService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}
  // this sends form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result: any) => {
      // here will be the logic for a successful user registration
      this.dialogRef.close() // this will close the modal on success
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })
    })
  }
}
