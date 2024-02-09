import { Component, OnInit } from '@angular/core'
import { GenreModalComponent } from '../genre-modal/genre-modal.component'
import { DirectorModalComponent } from '../director-modal/director-modal.component'
import { MovieDetailModalComponent } from '../movie-detail-modal/movie-detail-modal.component'
import { myFlixService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { SharedService } from '../shared-service/shared.service'

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss'
})
export class FavoritesPageComponent implements OnInit {
  Username: string | null = null
  movies: any[] = []
  user: any = {}
  cols = '3'
  displayMap = new Map([
    [Breakpoints.XSmall, '1'],
    [Breakpoints.Small, '2'],
    [Breakpoints.Medium, '3'],
    [Breakpoints.Large, '4'],
    [Breakpoints.XLarge, '5']
  ])

  constructor(
    public myflixService: myFlixService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private sharedService: SharedService
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ])
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.cols = this.displayMap.get(query) as string
          }
        }
      })
  }

  ngOnInit(): void {
    this.getMovies()
    this.getUser()
  }

  getMovies(): void {
    this.myflixService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp.filter((movie: any) =>
        this.user.FavoriteMovies.includes(movie._id)
      )
    })
  }

  getUser(): void {
    const user = localStorage.getItem('user')
    if (user) {
      this.user = JSON.parse(user)
      this.Username = this.user.Username
    }
  }

  isFavorite(movieId: string): boolean {
    return this.user.FavoriteMovies.includes(movieId)
  }

  openGenre(genre: any): void {
    this.dialog.open(GenreModalComponent, {
      data: { genre: genre }
    })
  }

  openDirector(director: any): void {
    this.dialog.open(DirectorModalComponent, {
      data: { director: director }
    })
  }

  openMovieDetails(movieDetails: any): void {
    this.dialog.open(MovieDetailModalComponent, {
      data: { movieDetails: movieDetails }
    })
  }
  addFavorite(movieId: string): void {
    const userString = localStorage.getItem('user')

    if (userString) {
      try {
        const user = JSON.parse(userString)
        console.log('Parsed user object:', user)

        this.user = user
        this.Username = user.Username
        this.user.FavoriteMovies.push(movieId)

        localStorage.setItem('user', JSON.stringify(this.user))

        const isFavorite = this.user.FavoriteMovies.includes(movieId)

        if (!isFavorite) {
          this.myflixService
            .updateUserFavoriteMovie(this.Username, movieId)
            .subscribe(
              (result: any) => {
                console.log('result', result)
              },
              (error) => {
                console.error('Error updating user favorite movie', error)
              }
            )
        }
      } catch (error) {
        console.error('Error parsing user object:', error)
      }
    } else {
      console.warn('User string is null or undefined in localStorage.')
    }

    this.getMovies()
    this.sharedService.triggerFavoriteAdded()
  }

  removeFavorite(movieId: string): void {
    console.log('remove Favorite /Movies:', movieId)

    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user && user.Username) {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('no token')
        return
      }
      this.user.FavoriteMovies = this.user.FavoriteMovies.filter(
        (id: string) => id !== movieId
      )
      localStorage.setItem('user', JSON.stringify(this.user))
      this.myflixService
        .deleteUserFavoriteMovie(this.Username ?? '', movieId)
        .subscribe(
          (result: any) => {
            console.log('result from myFLix', result)
          },
          (error) => {
            console.error('Result deleteUserFavoriteMovie', error)
          }
        )
      this.getMovies()
    }
  }

  mergeObjects(target: any, source: any): any {
    const result = { ...target }
    for (const key in source) {
      if (source.hasOwnProperty(key) && source[key] !== '') {
        result[key] = source[key]
      }
    }
    return result
  }
}
