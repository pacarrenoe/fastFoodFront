import { Component, OnInit } from '@angular/core';
import { categorias, productos } from '../../../assets/templates/productos-data';
import { ToastrService } from 'ngx-toastr';
import {Categoria} from "../../model/categoria.model";
import {Producto} from "../../model/producto.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/dialogs/confirm-dialog/confirm-dialog.component";
import {TipoPagoDialogComponent} from "../componentes/dialogs/tipo-pago-dialog/tipo-pago-dialog.component";

@Component({
  selector: 'app-nuevopedido',
  templateUrl: './nuevopedido.component.html',
  styleUrls: ['./nuevopedido.component.scss']
})
export class NuevopedidoComponent implements OnInit {

  categorias = categorias;
  productos = productos;
  categoriaSeleccionada: Categoria = this.categorias[0];
  productosFiltrados: Producto[] = [];
  pedido: (Producto & { cantidad: number; comentario: string })[] = [];
  total = 0;
  nombreCliente: string = '';

  constructor(private dialog: MatDialog, private toastr: ToastrService) {}


  ngOnInit() {
    this.seleccionarCategoria(this.categoriaSeleccionada);
  }

  seleccionarCategoria(categoria: Categoria) {
    this.categoriaSeleccionada = categoria;
    this.productosFiltrados = this.productos.filter(p => p.categoria === categoria.nombre);
  }

  agregarProducto(producto: any) {
    const encontrado = this.pedido.find(p => p.id === producto.id);
    if (encontrado) {
      encontrado.cantidad++;
    } else {
      this.pedido.push({ ...producto, cantidad: 1, comentario: '' });
    }
    this.actualizarTotal();
  }

  quitarProducto(producto: any) {
    this.pedido = this.pedido.filter(p => p.id !== producto.id);
    this.actualizarTotal();
  }

  actualizarTotal() {
    this.total = this.pedido.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }

  cancelarPedido() {
    this.pedido = [];
    this.total = 0;
  }

  confirmarPedido(resumen: any) {
    const tipoDialog = this.dialog.open(TipoPagoDialogComponent, {
    });

    tipoDialog.afterClosed().subscribe(tipo => {
      if (!tipo) return; // Si el usuario cancela, no se hace nada

      console.log('Tipo de pago seleccionado:', tipo);
      resumen.tipoPago = tipo;

      // 1. Imprimir boleta de caja
      const textoCaja = this.generarBoletaCaja(resumen, tipo);
      const ventanaCaja = window.open('', '', 'width=250,height=600');
      if (ventanaCaja) {
        ventanaCaja.document.write(`<pre>${textoCaja}</pre>`);
        ventanaCaja.document.close();
        ventanaCaja.focus();
        ventanaCaja.print();
        ventanaCaja.close();
      }

      // 2. Preguntar si se imprime cocina
      const cocinaDialog = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Imprimir boleta de cocina',
          message: '¿Deseas imprimir también la boleta para cocina?'
        }
      });

      cocinaDialog.afterClosed().subscribe(confirmado => {
        if (confirmado === true) {
          const textoCocina = this.generarBoletaCocina(resumen);
          const ventanaCocina = window.open('', '', 'width=250,height=600');
          if (ventanaCocina) {
            ventanaCocina.document.write(`<pre>${textoCocina}</pre>`);
            ventanaCocina.document.close();
            ventanaCocina.focus();
            ventanaCocina.print();
            ventanaCocina.close();
          }
        }

        this.toastr.success('Pedido confirmado', '');
        this.pedido = [];
        this.total = 0;
      });
    });
  }

  generarBoletaCocina(resumen: any): string {
    const categoriasCocina = ['Ass', 'Vianesas', 'Churrascos', 'Megas', 'Papas fritas'];

    let texto = '';
    texto += '.\n'.repeat(2);
    texto += '******* COCINA *******\n';
    texto += `Hora: ${new Date().toLocaleTimeString()}\n`;
    texto += `Cliente: ${resumen.cliente || 'Sin nombre'}\n`;
    texto += '-------------------------\n';

    const conteo: { [categoria: string]: number } = {};

    resumen.items
      .filter((item: any) => categoriasCocina.includes(item.categoria))
      .forEach((item: any) => {
        texto += `${item.cantidad} x ${item.nombre}\n`;
        if (item.comentario?.trim()) {
          texto += `- Obs: ${item.comentario}\n`;
        }
        texto += '--\n';

        // Sumar cantidad por categoría
        if (!conteo[item.categoria]) {
          conteo[item.categoria] = 0;
        }
        conteo[item.categoria] += item.cantidad;
      });

    texto += '-------------------------\n';
    Object.entries(conteo).forEach(([categoria, cantidad]) => {
      texto += `${cantidad} x ${categoria}\n`;
    });
    texto += '-------------------------\n';
    texto += '.\n'.repeat(3);
    return texto;
  }


  generarBoletaCaja(resumen: any, tipo: any): string {
    let texto = '';
    texto += '.\n'.repeat(2);
    texto += '********** VENTA **********\n';
    texto += `Hora: ${new Date().toLocaleTimeString()}\n`;
    texto += `Cliente: ${resumen.cliente || 'Sin nombre'}\n`;
    texto += '------------------------------\n';

    resumen.items.forEach((item: any) => {
      const linea = `${item.cantidad} x ${item.nombre} $${item.precio}`;
      texto += linea + '\n';
      if (item.descuento > 0) {
        texto += `- Desc: $${item.descuento} c/u\n`;
      }
      if (item.comentario?.trim()) {
        texto += `- Obs: ${item.comentario}\n`;
      }
      texto += '--\n';
    });

    texto += '------------------------------\n';
    texto += `TOTAL: $${resumen.total}\n`;
    texto += `TIPO DE PAGO: ${tipo}\n`;
    texto += '------------------------------\n';
    texto += '.\n'.repeat(3);
    return texto;
  }
}
