import { Component, OnInit } from '@angular/core'
import { GenreModalComponent } from '../genre-modal/genre-modal.component'
import { DirectorModalComponent } from '../director-modal/director-modal.component'
import { MovieDetailModalComponent } from '../movie-detail-modal/movie-detail-modal.component'
import { myFlixService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { SharedService } from '../shared-service/shared.service'
/**
 * Component for displaying movie cards.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  Username: string | null = null
  isLoggedIn: boolean = false
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
  /**
   * Constructs a MovieCardComponent and initializes dependencies.
   * Observes the screen size breakpoints and adjusts the number of columns accordingly.
   * @param myflixService The service handling API requests for movie data.
   * @param dialog The MatDialog service for opening dialogs.
   * @param breakpointObserver The BreakpointObserver service for observing screen size changes.
   * @param sharedService The SharedService for managing shared data and functionalities.
   */
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
  /**
   * Retrieves all movies from the API and updates the movies array with the response data.
   */
  getMovies(): void {
    this.myflixService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp
    })
  }
  /**
   * Retrieves user data from local storage and updates component properties accordingly.
   * If user data exists, sets the user object, username, and isLoggedIn flag.
   * If no user data exists, sets the isLoggedIn flag to false.
   */
  getUser(): void {
    const user = localStorage.getItem('user')
    if (user) {
      this.user = JSON.parse(user)
      this.Username = this.user.Username
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
  }
  /**
   * Checks if a movie with the given ID is in the user's list of favorite movies.
   * @param movieId The ID of the movie to check.
   * @returns A boolean indicating whether the movie is in the user's list of favorite movies.
   */
  isFavorite(movieId: string): boolean {
    return this.user.FavoriteMovies.includes(movieId)
  }
  /**
   * Opens a dialog displaying details of the selected genre.
   * @param genre The genre object containing details to display in the dialog.
   */
  openGenre(genre: any): void {
    this.dialog.open(GenreModalComponent, {
      width: '33%',
      data: { genre: genre }
    })
  }
  /**
   * Opens a dialog displaying details of the selected director.
   * @param director The director object containing details to display in the dialog.
   */
  openDirector(director: any): void {
    this.dialog.open(DirectorModalComponent, {
      data: { director: director }
    })
  }
  /**
   * Opens a dialog displaying details of the selected movie.
   * @param movieDetails The movie object containing details to display in the dialog.
   */
  openMovieDetails(movieDetails: any): void {
    this.dialog.open(MovieDetailModalComponent, {
      data: { movieDetails: movieDetails }
    })
  }
  /**
   * Adds the specified movie ID to the user's list of favorite movies.
   * Retrieves the user data from local storage, updates the list of favorite movies,
   * and saves the updated user object back to local storage.
   * Additionally, triggers an update of the user's favorite movies on the server,
   * if the movie is successfully added to the user's favorites.
   * Finally, refreshes the list of movies and triggers an event indicating that a favorite was added.
   * @param movieId The ID of the movie to add to the user's favorite movies.
   */
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
        console.log('new local storage user object:', user)

        const isFavorite = this.user.FavoriteMovies.includes(movieId)

        if (isFavorite) {
          this.myflixService
            .updateUserFavoriteMovie(this.Username, movieId)
            .subscribe(
              (result: any) => {
                console.log('result', result)
                console.log('update Favorite Api Call')
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
  /**
   * Removes the specified movie ID from the user's list of favorite movies.
   * Retrieves the user data from local storage, updates the list of favorite movies,
   * and saves the updated user object back to local storage.
   * Additionally, triggers a deletion of the movie from the user's favorite movies on the server.
   * Finally, refreshes the list of movies.
   * @param movieId The ID of the movie to remove from the user's favorite movies.
   */
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
  /**
   * Merges properties from the source object into the target object, creating a new object.
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
}
