import { Component, OnInit, Input } from '@angular/core'
import { myFlixService } from '../fetch-api-data.service'
import { DatePipe } from '@angular/common'
import { SharedService } from '../shared-service/shared.service'
import { Router } from '@angular/router'
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  providers: [DatePipe]
})
/**
 * This represents the user's profile page.
 * The user can update data and delete the account.
 */
export class ProfilePageComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }
  userId: string | null = null
  user: any = {}
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  ])
  username = new FormControl('', [Validators.required, Validators.minLength(5)])
  /**
   *
   * @param myflixService - The Service handling API requests
   * @param sharedService - Service for the user loggedIn status
   * @param router - Router service for navigation.
   */
  constructor(
    public myflixService: myFlixService,
    private sharedService: SharedService,
    private router: Router
  ) {}
  /**
   * This method gets the user from the local storage.
   * It parses the JSON object and sets the userID to user._id.
   */
  getUser(): void {
    const user = localStorage.getItem('user')
    console.log(user)
    if (user) {
      this.user = JSON.parse(user)
      this.userId = this.user._id
    }
  }
  /**
   * Updates the user data if the user ID exists.
   * Retrieves the user's authentication token from local storage.
   * Merges the existing user data with the new user data.
   * Calls the updateUser method from the myFlixService to update the user data on the server.
   * Updates the user data in local storage with the updated user data returned from the server.
   * @throws If the authentication token is not found in local storage, an error is logged and the function returns.
   * @throws If there is an error while updating the user data on the server, an error is logged.
   */
  updateUser(): void {
    if (this.userId) {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('no token')
        return
      }
      const updatedUser = this.mergeObjects(this.user, this.userData)

      this.myflixService.updateUser(this.userId, updatedUser).subscribe(
        (result: any) => {
          console.log('result from myflix updateuser', result)
          localStorage.setItem('user', JSON.stringify(updatedUser))
          this.user = updatedUser
        },
        (error) => {
          console.error('Error updating user', error)
        }
      )
    } else {
      console.log('User ID is null. Cannot update user.')
    }
  }
  /**
   * Deletes the user account if the user ID exists.
   * Displays a confirmation dialog to ensure the user's intention.
   * Retrieves the user's authentication token from local storage.
   * Calls the deleteSingleUser method from the myFlixService to delete the user account on the server.
   * Navigates to the welcome page after successful deletion.
   * @throws If the authentication token is not found in local storage, an error is logged and the function returns.
   * @throws If there is an error while deleting the user account on the server, an error is logged.
   */
  deleteUser(): void {
    console.log('delete', this.userId)
    console.log('user', this.user.Username)
    if (this.userId) {
      const isUserSure = window.confirm(
        'Are you sure you want to delete this user?'
      )

      if (isUserSure) {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('no token')
          return
        }
        const updatedUsername = this.userId
        console.log('updatedUsername', updatedUsername)

        this.myflixService
          .deleteSingleUser(this.user.Username, this.userId)
          .subscribe(
            (result: any) => {
              console.log('result from myflix deleteUser', result)
              this.router.navigate(['/welcome'])
            },
            (error) => {
              console.error('Error deleting user', error)
            }
          )
      } else {
        console.log('User ID is null. Cannot delete user.')
      }
    } else {
      console.log('User deletion canceled.')
    }
  }
  /**
   * Merges two objects by copying properties from the source object to the target object.
   * If a property in the source object is not empty, it overwrites the corresponding property in the target object.
   * @param target The target object to merge into.
   * @param source The source object to merge from.
   * @returns A new object containing the merged properties from both objects.
   */
  mergeObjects(target: any, source: any): any {
    const result = { ...target }
    for (const key in source) {
      if (source.hasOwnProperty(key) && source[key] !== '') {
        result[key] = source[key]
      }
    }
    return result
  }
  /**
   * Gets the error message based on the form control's validation errors and a label.
   * @param control The form control to check for validation errors.
   * @param label The label to display in the error message.
   * @returns The error message corresponding to the validation error, or an empty string if no error is found.
   */
  getErrorMessage(control: FormControl, label: string): string {
    if (control.hasError('required')) {
      return 'You must enter a value'
    }
    if (control.hasError('email')) {
      return 'Not a valid email'
    }
    if (control.hasError('pattern')) {
      return 'Not a valid password'
    }
    if (control.hasError('minlength')) {
      return `${label} must be at least 5 characters long.`
    }
    return ''
  }

  ngOnInit(): void {
    this.getUser()
  }
}
