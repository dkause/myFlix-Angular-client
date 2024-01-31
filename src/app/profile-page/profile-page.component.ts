import { Component, OnInit, Input } from '@angular/core'
import { myFlixService } from '../fetch-api-data.service'
import { DatePipe } from '@angular/common'
import { SharedService } from '../shared-service/shared.service'
import { Router } from '@angular/router'
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  providers: [DatePipe]
})
export class ProfilePageComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }
  userId: string | null = null
  movies: any[] = []
  movie: any[] = []
  user: any = {}
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  ])
  username = new FormControl('', [Validators.required, Validators.minLength(5)])

  constructor(
    public myflixService: myFlixService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  getUser(): void {
    const user = localStorage.getItem('user')
    console.log(user)
    if (user) {
      this.user = JSON.parse(user)
      this.userId = this.user._id
    }
  }

  updateUser(): void {
    if (this.userId) {
      // Check if userId is not null
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('no token')
        return
      }
      // Merge non-empty properties from userData to user
      const updatedUser = this.mergeObjects(this.user, this.userData)

      this.myflixService.updateUser(this.userId, updatedUser).subscribe(
        (result: any) => {
          // Logic for a successful user update
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

  deleteUser(): void {
    console.log('delete', this.userId)
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
        const updatedUsername = this.userId; // Save the updated username
        console.log(updatedUsername)

        this.myflixService.deleteSingleUser(this.user.updatedUsername).subscribe(
          (result: any) => {
            // Logik für einen erfolgreichen Benutzerlöschvorgang
            console.log('result from myflix deleteUser', result)
            // Navigieren Sie den Benutzer nach dem Löschen zur Anmeldeseite oder einer anderen Seite
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
      // Benutzer hat "Abbrechen" ausgewählt, keine Aktion erforderlich
      console.log('User deletion canceled.')
    }
  }

  // Remove Favorite
  removeFavorite(movieID: string): void {
    console.log('remove Favorite/profile:', movieID)
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user && user.Username) {
      // Check if user and Username is not null
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('no token')
        return
      }
      // remove Favorite from localstorage
      this.user.FavoriteMovies = this.user.FavoriteMovies.filter(
        (id: string) => id !== movieID
      )
      localStorage.setItem('user', JSON.stringify(this.user))
      // remove favorite via API
      this.myflixService
        .deleteUserFavoriteMovie(user.Username, movieID)
        .subscribe(
          (result: any) => {
            console.log('result from myFLix', result)
          },
          (error) => {
            console.error('Result deleteUserFavoriteMovie', error)
          }
        )
      this.getAllMovies()
    }
  }
  // Function to merge non-empty properties from source to target object
  mergeObjects(target: any, source: any): any {
    const result = { ...target }
    for (const key in source) {
      if (source.hasOwnProperty(key) && source[key] !== '') {
        result[key] = source[key]
      }
    }
    return result
  }
  getAllMovies(): void {
    this.myflixService.getAllMovies().subscribe((response) => {
      this.movies = response.filter((movie: any) =>
        this.user.FavoriteMovies.includes(movie._id)
      )
    })
  }

  // Error Messages
  getErrorMessage(control: FormControl, label: string): string {
    if (control.hasError('required')) {
      return 'You must enter a value'
    }
    if (control.hasError('email')) {
      return 'Not a valid email'
    }
    if (control.hasError('pattern')) {
      return 'Not a valid pasword'
    }
    if (control.hasError('minlength')) {
      return `${label} must be at least 5 characters long.`
    }
    return ''
  }
  ngOnInit(): void {
    this.getUser()
    this.getAllMovies()
    this.sharedService.favoriteAdded$.subscribe(() => {
      this.getAllMovies()
    })
  }
}
