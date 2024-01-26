import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-movie-detail-modal',
  templateUrl: './movie-detail-modal.component.html',
  styleUrl: './movie-detail-modal.component.scss'
})
export class MovieDetailModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { movieDetails: any }) {}
  ngOnInit(): void {

    console.log('data',this.data)
  }
}
