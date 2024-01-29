import { Component, OnInit } from '@angular/core'
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  apiStatus: string = 'Loading...' // Initial status

  constructor() {}

  ngOnInit() {
  }

}
