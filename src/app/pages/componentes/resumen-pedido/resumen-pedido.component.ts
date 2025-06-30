import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-resumen-pedido',
  templateUrl: './resumen-pedido.component.html',
  styleUrl: './resumen-pedido.component.scss'
})
export class ResumenPedidoComponent {
  @Input() pedido: any[] = [];
  @Input() total: number = 0;
  @Input() cliente: string = '';

  @Output() clienteChange = new EventEmitter<string>();
  @Output() quitar = new EventEmitter<any>();
  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelarP = new EventEmitter<void>();

  actualizarComentario() {
    this.clienteChange.emit(this.cliente);
  }

  eliminar(item: any) {
    this.quitar.emit(item);
  }

  confirmarPedido() {
    this.confirmar.emit();
  }
}
