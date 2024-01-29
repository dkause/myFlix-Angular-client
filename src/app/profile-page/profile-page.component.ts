import { Component, OnInit, Input } from '@angular/core'
import { myFlixService } from '../fetch-api-data.service'
import { DatePipe } from '@angular/common'
import { SharedService } from '../shared-service/shared.service'
import { Router } from '@angular/router'
import { MatCard } from '@angular/material/card'
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
    console.log('delete', this.user.Username)
    if (this.user.Username) {
      const isUserSure = window.confirm(
        'Are you sure you want to delete this user?'
      )

      if (isUserSure) {
        // Benutzer hat "OK" ausgewählt, Benutzer löschen
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('no token')
          return
        }

        this.myflixService.deleteSingleUser(this.user.Username).subscribe(
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

  ngOnInit(): void {
    this.getUser()
    this.getAllMovies()
    this.sharedService.favoriteAdded$.subscribe(() => {
      this.getAllMovies()
    })
  }
}
