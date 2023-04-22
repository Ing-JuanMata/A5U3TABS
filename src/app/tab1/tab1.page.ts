import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { IonItem, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab1Page {
  @ViewChild('efectivo') efectivo!: IonItem;
  @ViewChild('tarjeta') tarjeta!: IonItem;
  constructor() {}

  elegirMetodo(metodo: string) {
    if (metodo === 'Efectivo') {
      this.efectivo.color = 'primary';
      this.tarjeta.color = undefined;
    } else {
      this.efectivo.color = undefined;
      this.tarjeta.color = 'primary';
    }
  }
}
