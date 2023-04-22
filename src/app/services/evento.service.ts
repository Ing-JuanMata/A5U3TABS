import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root',
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
      },
    ];
  }

  getEventos() {
    return this.eventos;
  }

  getEvento(fecha: string) {
    return this.eventos.find((evento) => evento.fecha === fecha);
  }

  addEvento(evento: Evento) {
    this.eventos.push(evento);
    return this.eventos;
  }

  updateEvento(evento: Evento) {
    const index = this.eventos.findIndex(
      (evento) => evento.fecha === evento.fecha
    );
    this.eventos[index] = evento;
    return this.eventos;
  }

  deleteEvento(fecha: string) {
    const index = this.eventos.findIndex((evento) => evento.fecha === fecha);
    this.eventos.splice(index, 1);
    return this.eventos;
  }
}
