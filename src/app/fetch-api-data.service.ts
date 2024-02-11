import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators' // Import tap here
import { Router } from '@angular/router'

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-5rhq.onrender.com/'
@Injectable({
  providedIn: 'root'
})
export class myFlixService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Registers a new user by making a POST request to the API.
   * @param userDetails Details of the user to be registered.
   * @returns An observable of any type representing the response from the API.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log('userRegistration', userDetails)
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError))
  }
  /**
   * Logs in a user by making a POST request to the API.
   * @param userDetails Details of the user for login.
   * @returns An observable of any type representing the response from the API.
   */

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
  /**
   * Updates a user by making a PUT request to the API.
   * @param userID Id of the user to update.
   * @param userData Data of the user to update.
   * @returns An observable of any type representing the response from the API.
   */
  updateUser(userID: any, userData: any): Observable<any> {
    // get user information and token from local storage

    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token')
    // Make a PUT request to update the user data
    return this.http
      .put(apiUrl + 'users/' + user.Username, JSON.stringify(userData), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  /**
   * Updates a the user's favorite movie list by making a POST request to the API.
   * @param movieId Id of the movie to update in user's favorite list.
   * @param userData Data of the user for the update.
   * @returns An observable of any type representing the response from the API.
   */
  updateUserFavoriteMovie(userData: any, movieId: any): Observable<any> {
    // Retrieve user information from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token')
    // Make a POST request to update the user's favorite movie list
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
  /**
   * Deletes am movie from the user's favorite movie list by sending a DELETE request to the API.
   * Requires a token from local storage
   * @param Username Name of the user from whose favorites list the movie is deleted.
   * @param movieID ID of the movie to be deleted
   * @returns An observable of any type representing the response from the API
   */
  deleteUserFavoriteMovie(Username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token')
    return (
      this.http
        // Make a delete request to the api to remove the favorite
        .delete(apiUrl + 'users/' + Username + '/movies/' + movieID, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    )
  }
  /**
   * Get a list of all movies by sending a GET request to the API
   * Requires an authentication token retrieved from local storage.
   * @returns An Observable of type any which represents the list of all movies
   */
  getAllMovies(): Observable<any> {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem('token')
    return (
      this.http
        // Send a GET request to fetch the list of all movies
        .get(apiUrl + 'movies', {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    )
  }
  /**
   * Retrieves details about a single movie be sending a GET request to the API
   * Requires authentification token from local storage
   * @param title The title of the movie to retrieve details for.
   * @returns An Observable<any> representing the details of the single movie.
   */
  getSingleMovie(title: string): Observable<any> {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem('token')
    return (
      this.http
        // Send a GET request to fetch details of the single movie
        .get(apiUrl + 'movies/' + title, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    )
  }
  /**
   * Retrieves data about a director by sending a GET request to the API.
   * Requires an authentification token from local storage.
   * @param directorName This string provides the director's name to get data for.
   * @returns An Observable <any> which provides details about the director.
   */
  // get Director
  getDirector(directorName: string): Observable<any> {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem('token')
    return (
      this.http
        // Send a GET request to fetch details of the director
        .get(apiUrl + 'movies/director' + directorName, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    )
  }
  /**
   * Retrieves details about a genra by sending a GET request to the API.
   * Requires a authentification token from local storage.
   * @param genreName The name of the genre to to retrieve data for.
   * @returns An Observable of type any which contains data about the genre.
   */
  getGenre(genreName: string): Observable<any> {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem('token')
    return (
      this.http
        // Send a GET request to fetch details of the genre
        .get(apiUrl + 'movies/genre' + genreName, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    )
  }
  /**
   * Retrieves details about a single user by sending a GET request to the API.
   * Requires an authentication token retrieved from local storage.
   * @param userID The ID of the user to retrieve details for.
   * @returns An Observable<any> containing details about the user.
   */
  getSingleUser(userID: string): Observable<any> {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem('token')
    return (
      this.http
        // Send a GET request to fetch details of the user
        .get(apiUrl + 'users/' + userID, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    )
  }
  /**
   * Deletes a single user by sending a DELETE request to the API.
   * Requires an authentication token retrieved from local storage.
   * @param username The username of the user to be deleted.
   * @param userID The ID of the user to be deleted.
   * @returns An Observable<any> representing the response from the API.
   */
  deleteSingleUser(username: string, userID: string): Observable<any> {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem('token')
    return (
      this.http
        // Send a DELETE request to delete the user
        .delete(apiUrl + 'users/' + username + '/' + userID, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`
          }),
          responseType: 'text' // Expect a text response
        })
        .pipe(
          tap((response) =>
            console.log('deleteSingleUser response:', response)
          ),
          catchError(this.handleError)
        )
    )
  }
  /**
   * Retrieves the favorite movies of a user by sending a GET request to the API.
   * Requires an authentication token retrieved from local storage.
   * @param userID The ID of the user whose favorite movies are to be retrieved.
   * @param movieTitle The title of the movie to check if it's in the user's favorites.
   * @returns An Observable<any> representing the favorite movies of the user.
   */
  getUserFavoriteMovie(userID: string, movieTitle: string): Observable<any> {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem('token')
    return (
      this.http
        // Send a GET request to fetch the user's favorite movies
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
    )
  }
  /**
   * Clears user data from local storage and navigates to a new location.
   */
  private clearUserDataAndNavigate(): void {
    // Remove user data from local storage
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  /**
   * Extracts response data from an HTTP response.
   * @param res The HTTP response from which to extract data.
   * @returns The extracted response data or an empty object if no data is present.
   */
  private extractResponseData(res: any): any {
    const body = res
    return body || {}
  }
  /**
   * This handles HTTP errors returned by the api
   * @param error The error response returned by the API.
   * @returns An observable with a user-facing error message or an observable of type `never`.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message)
    } else {
      if (error.status >= 200 && error.status < 300) {
        console.log(
          `Backend returned code ${error.status}, body was:`,
          error.error
        )
      } else {
        console.error(
          `Backend returned code ${error.status}, body was:`,
          error.error
        )
        // Return an observable with a user-facing error message.
        return throwError(
          () => new Error('Something bad happened; please try again later.')
        )
      }
    }
    return throwError(() => new Error('No error.'))
  }
}
