import { Component, OnInit } from '@angular/core'
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar'
import { ApiStatusService } from '../api-status.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  apiStatus: string = 'Loading...' // Initial status

  constructor(private apiStatusService: ApiStatusService) {}

  ngOnInit() {
    this.checkApiStatus()
    // Periodically check API status, e.g., every 5 seconds
    setInterval(() => {
      this.checkApiStatus()
    }, 5000)
  }

  checkApiStatus() {
    this.apiStatusService.checkApiStatus().subscribe(
      (response) => {
        this.apiStatus = 'Online'
        console.log('api-response', response) // Assuming your API returns a successful response
      },
      (error) => {
        this.apiStatus = 'Online' // Handle error appropriately
      }
    )
  }
}
