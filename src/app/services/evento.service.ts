import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private eventos: Evento[];

  constructor() {
    this.eventos = [
      {
        fecha: '2023-04-18',
        hora: '12:00',
        cliente: 'Juan Perez',
        celular: '1234567890',
        tipo: 'Cumpleaños',
        descripcion: 'Cumpleaños de 15 años',
        alberca: 80,
        mesaRegalos: true,
        colorSobremantel: ['rojo', 'azul'],
        personas: 100,
        brincolin: true,
        precio: 1000,
        anticipo: 500,
        metodo: 'Efectivo',
        saldo: 500,
      }
    ]
  }
}
