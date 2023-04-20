import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { IonDatetime, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab2Page {
  @ViewChild('calendar', { static: false }) calendar!: IonDatetime;
  highlightedDates = [
    { date: '2023-04-19', textColor: '#800080', backgroundColor: '#ffc0cb' },
  ];

  constructor() {}

  onDateChange(event: any) {
    console.log(event);
    this.calendar.reset();
  }
}
