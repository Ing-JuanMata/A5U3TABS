import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonDatetime, IonicModule, IonItem } from '@ionic/angular';
import { EventoForm } from '../models/evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class Tab1Page {
  @ViewChild('efectivo') efectivo!: IonItem;
  @ViewChild('tarjeta') tarjeta!: IonItem;
  @ViewChild('fecha') fecha!: IonDatetime;
  private precios = {
    sobremanteles: 100,
    mesaRegalos: 500,
    brincolin: 1000,
    alberca: 500,
  };
  eventoForm: FormGroup<EventoForm>;
  fechasOcupadas: string[] = [];
  mensajes_validacion: any;
  constructor(private eventoService: EventoService) {
    this.eventoForm = new FormGroup({
      fecha: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      hora: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      cliente: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      celular: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]{10}$/),
        ],
      }),
      tipo: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      descripcion: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      alberca: new FormControl(0, {
        nonNullable: true,
      }),
      mesaRegalos: new FormControl(false, {
        nonNullable: true,
      }),
      colorSobremantel: new FormControl<string[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      personas: new FormControl(0, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(1),
          Validators.max(1000),
        ],
      }),
      brincolin: new FormControl(false, {
        nonNullable: true,
      }),
      precio: new FormControl(1000, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      anticipo: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      metodo: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      saldo: new FormControl(1000, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
    this.eventoForm.controls.anticipo.addValidators([
      Validators.min(this.eventoForm.controls.precio.value * 0.1),
      Validators.max(this.eventoForm.controls.precio.value),
    ]);
    this.eventoForm.controls.anticipo.valueChanges.subscribe((value) => {
      this.eventoForm.controls.saldo.setValue(
        this.eventoForm.controls.precio.value - value
      );
    });
    this.eventoService
      .getEventos()
      .forEach((evento) => this.fechasOcupadas.push(evento.fecha));
    this.mensajes_validacion = {
      fecha: [
        { tipo: 'required', mensaje: 'La fecha es obligatoria' },
        { tipo: 'fechaOcupada', mensaje: 'La fecha ya está ocupada' },
      ],
      hora: [{ tipo: 'required', mensaje: 'La hora es obligatoria' }],
      cliente: [
        { tipo: 'required', mensaje: 'El nombre del cliente es obligatorio' },
      ],
      celular: [
        { tipo: 'required', mensaje: 'El celular es obligatorio' },
        { tipo: 'minlength', mensaje: 'El celular debe tener 10 dígitos' },
        { tipo: 'maxlength', mensaje: 'El celular debe tener 10 dígitos' },
        { tipo: 'pattern', mensaje: 'El celular debe tener solo dígitos' },
      ],
      tipo: [{ tipo: 'required', mensaje: 'El tipo de evento es obligatorio' }],
      descripcion: [
        { tipo: 'required', mensaje: 'La descripción es obligatoria' },
      ],
      colorSobremantel: [
        {
          tipo: 'required',
          mensaje: 'El color del sobremantel es obligatorio',
        },
      ],
      personas: [
        { tipo: 'required', mensaje: 'El número de personas es obligatorio' },
        { tipo: 'min', mensaje: 'El número de personas debe ser mayor a 0' },
        { tipo: 'max', mensaje: 'El número de personas debe ser menor a 1000' },
      ],
      anticipo: [
        { tipo: 'required', mensaje: 'El anticipo es obligatorio' },
        {
          tipo: 'min',
          mensaje: 'El anticipo debe ser mayor al 10% del precio',
        },
        { tipo: 'max', mensaje: 'El anticipo debe ser menor al precio' },
      ],
      metodo: [
        { tipo: 'required', mensaje: 'El método de pago es obligatorio' },
      ],
      saldo: [{ tipo: 'required', mensaje: 'El saldo es obligatorio' }],
    };
  }

  ionViewDidEnter() {
    if (!this.fecha.value) return;
    const fecha = new Date();
    this.fecha.value = `${fecha.toISOString().slice(0, 10)}T${
      fecha.getHours() < 10 ? '0' + fecha.getHours() : fecha.getHours()
    }:${
      fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes()
    }:${
      fecha.getSeconds() < 10 ? '0' + fecha.getSeconds() : fecha.getSeconds()
    }.${fecha.getMilliseconds()}Z`;
  }

  fechaDesocupada() {
    const fechas = this.fechasOcupadas;
    return (fecha: string) =>
      !fechas.includes(new Date(fecha).toISOString().slice(0, 10));
  }

  elegirMetodo(metodo: string) {
    if (metodo === 'Efectivo') {
      if(this.efectivo.color === 'primary') {
        this.efectivo.color = undefined;
        this.eventoForm.controls.metodo.patchValue('');
        return;
      }
      this.efectivo.color = 'primary';
      this.tarjeta.color = undefined;
      this.eventoForm.controls.metodo.patchValue('Efectivo');
    } else {
      if(this.tarjeta.color === 'primary') {
        this.tarjeta.color = undefined;
        this.eventoForm.controls.metodo.patchValue('');
        return;
      }
      this.efectivo.color = undefined;
      this.tarjeta.color = 'primary';
      this.eventoForm.controls.metodo.patchValue('Transferencia');
    }
  }

  setFechaHora(event: any) {
    if (event instanceof Date) {
      this.eventoForm.controls.fecha.patchValue(
        event.toISOString().slice(0, 10)
      );
      this.eventoForm.controls.hora.patchValue(
        event.toLocaleTimeString().slice(0, 5)
      );
    } else {
      const fecha = new Date(event.detail.value);
      this.eventoForm.controls.fecha.patchValue(
        fecha.toISOString().slice(0, 10)
      );
      this.eventoForm.controls.hora.patchValue(
        fecha.toLocaleTimeString().slice(0, 5)
      );
      console.log(this.eventoForm.value);
    }
  }

  confirmar() {
    console.log('confirmar', this.eventoForm.value);
  }

  apartar() {
    console.log('apartar', this.eventoForm.value);
  }
}
