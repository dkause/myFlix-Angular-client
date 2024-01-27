import { Component, OnInit, Input } from '@angular/core'
import { myFlixService } from '../fetch-api-data.service'
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' } // this decorator defines the components input

  user: any = {}
  movies: any[] = []
  movie: any[] = []

  constructor(
    public myflixService: myFlixService
  ) {}

  getUser(): void {
    const user = localStorage.getItem('user')
    console.log('localstorageUser', this.user.FavoriteMovies)
    if (user) {
      this.user = JSON.parse(user)
    }
  }
  updateUser(): void {
    this.myflixService
      .updateSingleUser(this.userData)
      .subscribe((result: any) => {
        // here will be the logic for a successful user registration
        console.log(result)
      })
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
