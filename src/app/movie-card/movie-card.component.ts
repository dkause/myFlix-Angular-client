import { Component, OnInit } from '@angular/core'
import { GenreModalComponent } from '../genre-modal/genre-modal.component'
import { DirectorModalComponent } from '../director-modal/director-modal.component'
import { MovieDetailModalComponent } from '../movie-detail-modal/movie-detail-modal.component'
import { myFlixService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  movies: any[] = []
  // Layout for grid-list
  cols = '3'
  width ='100%'
  displayMap = new Map([
    [Breakpoints.XSmall, '1'],
    [Breakpoints.Small, '2'],
    [Breakpoints.Medium, '3'],
    [Breakpoints.Large, '4'],
    [Breakpoints.XLarge, '5']
  ])

  constructor(
    public fetchMovies: myFlixService,
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
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp
      console.log('movies-object', this.movies)
      return this.movies
    })
  }
  public openGenre(genre: any): void {
    this.dialog.open(GenreModalComponent, {
      width: '300px',
      data: { genre: genre }
    })
  }
  public openDirector(director: any): void {
    this.dialog.open(DirectorModalComponent, {
      width: '300px',
      data: { director: director }
    })
  }
  public openMovieDetails(movieDetails: any): void {
    this.dialog.open(MovieDetailModalComponent, {
      width: '300px',
      data: { movieDetails: movieDetails }
    })
  }
  public addFavorite(movieDetails: any): void {
    this.dialog.open(MovieDetailModalComponent, {
      width: '300px',
      data: { movieDetails: movieDetails }
    })
  }
}
