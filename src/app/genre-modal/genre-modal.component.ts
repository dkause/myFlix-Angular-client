import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
/**
 * Component for displaying genre details in a modal dialog.
 */
@Component({
  selector: 'app-genre-modal',
  templateUrl: './genre-modal.component.html',
  styleUrls: ['./genre-modal.component.scss']
})
export class GenreModalComponent implements OnInit {
  /**
   * Constructs a GenreModalComponent and injects genre data into the component.
   * @param data The data containing genre details injected into the component.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { genre: any }) {}

  ngOnInit(): void {}
}
