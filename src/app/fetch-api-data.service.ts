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
 // Renderserver needs to spin up
  public pingServer(): void {
    console.log('Server needs to spin up, waiting for response.');
    this.http.get(apiUrl).subscribe(
      response => console.log('Server response:', response),
      error => console.log('Error pinging server:', error)
    );
  }
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails)
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError))
  }
  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token')

    console.log(userDetails)
    return this.http
      .post(apiUrl + 'login', userDetails)

      
      .pipe(catchError(this.handleError))
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
  deleteSingleUser(userID: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .delete(apiUrl + 'users/' + userID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }
  // update SingleUser
  updateSingleUser(userID: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .put(apiUrl + 'users/' + userID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  //         `https://movie-api-5rhq.onrender.com/users/${user.Username}/movies/${movie._id}`,

  // get UserFavoriteMovie
  getUserFavoriteMovie(userID: string, movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
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
      );
  }
  // update UserFavoriteMovie
  updateUserFavoriteMovie(userID: string, movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .patch(apiUrl + 'users/' + userID + 'favorites' + movieTitle, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }
  // deleteUserFavoriteMovie
  deleteUserFavoriteMovie(userID: string, movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .delete(apiUrl + 'users/' + userID + 'favorites' + movieTitle, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
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
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      )
    }
    return throwError('Something bad happened; please try again later.')
  }
}
