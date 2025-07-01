import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-resumen-pedido',
  templateUrl: './resumen-pedido.component.html',
  styleUrls: ['./resumen-pedido.component.scss']
})
export class ResumenPedidoComponent implements OnChanges {
  @Input() pedido: any[] = [];
  @Input() total: number = 0;
  @Input() cliente: string = '';

  @Output() clienteChange = new EventEmitter<string>();
  @Output() quitar = new EventEmitter<any>();
  @Output() confirmar = new EventEmitter<any>();
  @Output() cancelarP = new EventEmitter<void>();

  ngOnChanges() {
    // inicializar flags por item
    this.pedido.forEach(p => {
      p.editandoComentario = false;
      p.editandoDescuento = false;
    });
  }

  actualizarComentario() {
    this.clienteChange.emit(this.cliente);
  }

  eliminar(item: any) {
    this.quitar.emit(item);
  }

  toggleComentario(item: any) {
    item.editandoComentario = !item.editandoComentario;
    item.editandoDescuento = false;
  }

  toggleDescuento(item: any) {
    item.editandoDescuento = !item.editandoDescuento;
    item.editandoComentario = false;
  }

  contarItems(): number {
    return this.pedido.reduce((sum, p) => sum + p.cantidad, 0);
  }

  calcularTotal(): number {
    return this.pedido.reduce((sum, p) => {
      const descuento = p.descuento || 0;
      return sum + (p.precio - descuento) * p.cantidad;
    }, 0);
  }

  confirmarComentario(item: any) {
    item.editandoComentario = false;
  }

  confirmarDescuento(item: any) {
    item.editandoDescuento = false;
  }

  actualizarCantidad(item: any) {
    if (item.cantidad < 1) {
      item.cantidad = 1;
    }
  }

  getConteoPorCategoria(): { [categoria: string]: number } {
    const conteo: { [categoria: string]: number } = {};

    for (const item of this.pedido) {
      const categoria = item.categoria || 'otro';
      conteo[categoria] = (conteo[categoria] || 0) + item.cantidad;
    }

    return conteo;
  }

  confirmarcompra() {
    const resumenBase = this.pedido.map(item => ({
      nombre: item.nombre,
      categoria: item.categoria || 'otro',
      cantidad: item.cantidad,
      precio: item.precio,
      descuento: item.descuento || 0,
      comentario: item.comentario || '',
      total: (item.precio - (item.descuento || 0)) * item.cantidad
    }));

    const conteoPorCategoria: { [categoria: string]: number } = {};
    for (const item of resumenBase) {
      conteoPorCategoria[item.categoria] = (conteoPorCategoria[item.categoria] || 0) + item.cantidad;
    }

    const resumen = {
      cliente: this.cliente,
      total: this.calcularTotal(),
      items: resumenBase,
      conteoPorCategoria
    };

    this.confirmar.emit(resumen);
  }

}
