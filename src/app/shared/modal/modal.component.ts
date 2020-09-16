import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  
  @Input() width: number;
  @Output('closeModal') closeModal = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
