import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
@Component({
  selector: 'app-director-modal',
  templateUrl: './director-modal.component.html',
  styleUrls: ['./director-modal.component.scss']
})
export class DirectorModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { director: any }) {}

  ngOnInit(): void {}
}
