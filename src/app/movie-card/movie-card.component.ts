import { Component, OnInit } from '@angular/core'
import { myFlixService } from '../fetch-api-data.service'
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  movies: any[] = []

  constructor(public fetchMovies: myFlixService) {}
  
  ngOnInit(): void { // when the component is mounted 
    this.getMovies()
  }
  
  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp
      console.log(this.movies)
      return this.movies
    })
  }
}
