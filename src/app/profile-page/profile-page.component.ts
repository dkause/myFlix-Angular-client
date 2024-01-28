import { Component, OnInit, Input } from '@angular/core'
import { myFlixService } from '../fetch-api-data.service'
import { DatePipe } from '@angular/common'
import { HttpHeaders } from '@angular/common/http'
import { MatCard } from '@angular/material/card'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  providers: [DatePipe]
})
export class ProfilePageComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' } // this decorator defines the components input
  userId: string | null = null
  movies: any[] = []
  movie: any[] = []
  user: any = {}

  constructor(public myflixService: myFlixService) {}

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
  // Remove Favorite
  removeFavorite(movieID: string): void {
    console.log('remove Favorite:', movieID)
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user && user.Username) {
      // Check if user and Username is not null
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('no token')
        return
      }
      this.myflixService
        .deleteUserFavoriteMovie(user.Username, movieID)
        .subscribe((result: any) => {
          console.log('result from myFLix', result)
        })
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
  }
}
