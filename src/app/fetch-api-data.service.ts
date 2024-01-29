import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { map } from 'rxjs/operators'

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-5rhq.onrender.com/'
@Injectable({
  providedIn: 'root'
})
export class myFlixService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
  // * * * * * * *
  // User Endpoints
  // * * * * * * *

  // User Registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails)
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError))
  }
  // User Login
  public userLogin(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('no token')
    }
    console.log('userLogin', userDetails)
    return this.http
      .post(apiUrl + 'login', userDetails)

      .pipe(catchError(this.handleError))
  }

  // User Update Api Call
  updateUser(userID: any, userData: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token')
    return this.http
      .put(apiUrl + 'users/' + user.Username, JSON.stringify(userData), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  // update UserFavoriteMovie
  updateUserFavoriteMovie(userData: any, movieId: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    const token = localStorage.getItem('token')
    return this.http
      .post(
        apiUrl + 'users/' + user.Username + '/movies/' + movieId,
        {},
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          })
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  // deleteUserFavoriteMovie
  deleteUserFavoriteMovie(Username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .delete(apiUrl + 'users/' + Username + '/movies/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }
  // get AllMovies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }
  // get SingleMovie
  getSingleMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }
  // get Director
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .get(apiUrl + 'movies/director' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }
  // get Genre
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .get(apiUrl + 'movies/genre' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }
  // get SingleUser
  getSingleUser(userID: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .get(apiUrl + 'users/' + userID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }
  // delete SingleUser
  deleteSingleUser(Username: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .delete(apiUrl + 'users/' + Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  //         `https://movie-api-5rhq.onrender.com/users/${user.Username}/movies/${movie._id}`,

  // get UserFavoriteMovie
  getUserFavoriteMovie(userID: string, movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .get(apiUrl + 'users/' + userID + 'favorites' + movieTitle, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(
        map(this.extractResponseData),
        map((data: any) => data.FavoriteMovies),
        catchError(this.handleError)
      )
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res
    return body || {}
  }

  private handleError(error: any): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message)
    } else {
      console.error(
        `myFlixService Error Status code ${error.status}, ` +
          ` Error Status code ${error.status}, ` +
          `Error body is: ${JSON.stringify(error.error)}`
      )
    }
    return throwError('Something bad happened; please try again later.')
  }
}
