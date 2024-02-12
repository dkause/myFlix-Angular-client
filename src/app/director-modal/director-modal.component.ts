import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
/**
 * Component for displaying director details in a modal dialog.
 */
@Component({
  selector: 'app-director-modal',
  templateUrl: './director-modal.component.html',
  styleUrls: ['./director-modal.component.scss']
})
export class DirectorModalComponent implements OnInit {
  /**
   * Constructs a DirectorModalComponent and injects director data into the component.
   * @param data The data containing director details injected into the component.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { director: any }) {}

  ngOnInit(): void {}
}
