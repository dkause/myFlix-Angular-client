import { Component, OnInit } from '@angular/core'
import { myFlixService } from '../fetch-api-data.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  // Layout for grid-list
  cols = '3'
  displayMap = new Map([
    [Breakpoints.XSmall, '1'],
    [Breakpoints.Small, '1'],
    [Breakpoints.Medium, '2'],
    [Breakpoints.Large, '2'],
    [Breakpoints.XLarge, '3']
  ])
  user: any = { Username: '', Password: '', Email: '', Birth: '' }
  Username: string = ''

  constructor(
    private breakpointObserver: BreakpointObserver,
    public myflixService: myFlixService
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

  getUser(): void {
    const user = localStorage.getItem('user')
    if (user) {
      this.user = JSON.parse(user)
      this.Username = this.user.Username
      let Password = this.user.Password
      let Email = this.user.Email
      let Birthday = this.user.Birthday
      let FavoriteMovies = this.user.FavoriteMovies
      console.log('Username', this.user.Username)
      console.log('Email', this.user.Email)
      console.log('Birthday', this.user.Birthday)
      console.log('FavoriteMovies', this.user.FavoriteMovies)
    }
  }
  // get allmovies from API and filter by user's favorite movies the create a new array
  // getMovies(): void {
  //   this.myflixService.getAllMovies().subscribe((response: any) => {
  //     this.movies = response
  //     this.user.FavoriteMovies.forEach((userFavoriteMovie: any) => {
  //       this.movies.forEach((movie: any) => {
  //         if (movie._id === userFavoriteMovie) {
  //           this.favoriteMovies.push(movie)
  //         }
  //       })
  //     })
  //     console.log('favoriteMovies', this.favoriteMovies)
  //     return this.favoriteMovies
  //   })
  // }

  ngOnInit(): void {
    this.getUser()
  }
}
