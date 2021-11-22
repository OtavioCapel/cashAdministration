import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'base-title-menu',
  templateUrl: './base-title-menu.component.html',
  styleUrls: ['./base-title-menu.component.scss'],
})
export class BaseTitleMenuComponent implements OnInit {

  @Input() title: String;
  
  constructor(private menu: MenuController) { }

  ngOnInit() {
  }

  openMenu() {
    this.menu.toggle();
  }

}
