// api-status.service.ts

import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { myFlixService } from './fetch-api-data.service'

@Injectable({
  providedIn: 'root'
})
export class ApiStatusService {
  private apiUrl = 'https://movie-api-5rhq.onrender.com/' // Replace with your actual API endpoint


  constructor(private http: HttpClient) {}

  checkApiStatus(): Observable<any> {
    return this.http.get(this.apiUrl)
  }
}
