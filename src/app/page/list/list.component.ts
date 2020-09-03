import { Component, OnInit } from '@angular/core';
import { ListModel } from '../models/list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listData = ListModel;

  constructor() { }

  ngOnInit(): void {
  }

}
