import {Component, OnInit} from '@angular/core';
import {Auth} from "@angular/fire/auth";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/dialogs/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  usuario: string = sessionStorage.getItem('usuario') || 'Usuario';
  fechaActual: string = '';
  horaActual: string = '';
  cargandoUsuario: boolean = true;
  menuAbierto = true;

  constructor(
    private auth: Auth,
    private authService: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    if (this.usuario !== '') {
      this.cargandoUsuario = false;
    }
    this.actualizarFechaHora();
    setInterval(() => this.actualizarFechaHora(), 1000);
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  actualizarFechaHora() {
    const ahora = new Date();
    this.fechaActual = ahora.toLocaleDateString();
    this.horaActual = ahora.toLocaleTimeString();
  }

  confirmarLogout(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Cerrar sesión',
        message: '¿Estás seguro de que deseas cerrar sesión?',
        confirmText: 'Cerrar sesión',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.authService.logout();
      }
    });
  }
}
