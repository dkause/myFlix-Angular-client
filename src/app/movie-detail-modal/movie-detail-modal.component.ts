import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
/**
 * Component for displaying movie details in a modal dialog.
 */
@Component({
  selector: 'app-movie-detail-modal',
  templateUrl: './movie-detail-modal.component.html',
  styleUrl: './movie-detail-modal.component.scss'
})
export class MovieDetailModalComponent implements OnInit {
  /**
   * Constructs a MovieDetailModalComponent and injects movie details data into the component.
   * @param data The data containing movie details injected into the component.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { movieDetails: any }) {}
  ngOnInit(): void {
    console.log('data', this.data)
  }
}
