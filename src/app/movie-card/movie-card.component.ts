import { Component, OnInit } from '@angular/core'
import { GenreModalComponent } from '../genre-modal/genre-modal.component'
import { DirectorModalComponent } from '../director-modal/director-modal.component'
import { MovieDetailModalComponent } from '../movie-detail-modal/movie-detail-modal.component'
import { myFlixService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
  template: ` <h2 [style]="getHeadingSize"></h2>`,

  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  getHeadingSize(): string {
    const fontSize = 0.5 * parseInt(this.cols, 10) // Example calculation
    console.log('fontSize', fontSize)
    return `${fontSize}rem`
  }
  Username: string | null = null

  movies: any[] = []
  movie: any[] = []
  user: any = {}
  // Layout for grid-list
  cols = '3'
  width = '100%'
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
    private breakpointObserver: BreakpointObserver
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
    // when the component is mounted
    this.getMovies()
    this.getUser()
  }

  getMovies(): void {
    this.myflixService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp
      console.log('movies-object', this.movies)
      return this.movies
    })
  }
  getUser(): void {
    const user = localStorage.getItem('user')
    console.log(user)
    if (user) {
      this.user = JSON.parse(user)
      this.Username = this.user.Username
    }
  }

  openGenre(genre: any): void {
    this.dialog.open(GenreModalComponent, {
      width: '300px',
      data: { genre: genre }
    })
  }
  openDirector(director: any): void {
    this.dialog.open(DirectorModalComponent, {
      width: '300px',
      data: { director: director }
    })
  }
  openMovieDetails(movieDetails: any): void {
    this.dialog.open(MovieDetailModalComponent, {
      width: '300px',
      data: { movieDetails: movieDetails }
    })
  }
  // Username + movieID
  updateFavoriteMovie(movieId: string): void {
    const user = localStorage.getItem('user')
    if (user) {
      this.user = JSON.parse(user)
      this.Username = this.user.Username
    }
    console.log(user)
    console.log('updateFavorite', this.Username, movieId)
    this.myflixService
      .updateUserFavoriteMovie(this.Username, movieId)
      .subscribe((result: any) => {console.log('result', result)})
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
