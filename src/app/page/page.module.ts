import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page/page.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [PageComponent, ListComponent],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PageModule { }
