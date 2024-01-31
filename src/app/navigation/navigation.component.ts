import { Component, OnInit } from '@angular/core'
import { SharedService } from '../shared-service/shared.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false // You should set this value based on your authentication logic

  apiStatus: string = 'Loading...' // Initial status

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    // You can now use sharedService in this component
    const isLoggedIn = this.sharedService.isUserLoggedIn()
    console.log('User is logged in Navcomp:', isLoggedIn)
    this.isLoggedIn = isLoggedIn
  }
}
