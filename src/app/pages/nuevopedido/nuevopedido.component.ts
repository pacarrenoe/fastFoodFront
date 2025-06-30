import { Component, OnInit } from '@angular/core';
import { categorias, productos } from '../../../assets/templates/productos-data';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevopedido',
  templateUrl: './nuevopedido.component.html',
  styleUrls: ['./nuevopedido.component.scss']
})
export class NuevopedidoComponent implements OnInit {

  categorias = categorias;
  productos = productos;
  categoriaSeleccionada = this.categorias[0];
  productosFiltrados: { id: number; nombre: string; precio: number; categoria: string; }[] = [];
  pedido: any[] = [];
  total = 0;
  nombreCliente: string = '';

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    this.seleccionarCategoria(this.categoriaSeleccionada);
  }

  seleccionarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    this.productosFiltrados = this.productos.filter(p => p.categoria === categoria);
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

  confirmarPedido() {
    const textoPlano = this.generarTextoBoleta();

    const ventana = window.open('', '', 'width=250,height=600');
    if (ventana) {
      ventana.document.write(`<pre>${textoPlano}</pre>`);
      ventana.document.close();
      ventana.focus();
      ventana.print();
      ventana.close();
      this.toastr.success('Pedido confirmado e impresión enviada', '');
      this.pedido = []; // limpia pedido después de confirmar
      this.total = 0;
    } else {
      this.toastr.error('No se pudo abrir la ventana de impresión');
    }

    console.log('Pedido confirmado:', this.pedido);
  }

  generarTextoBoleta(): string {
    let texto = '';
    texto += '.\n'.repeat(2);
    texto += '*******************************\n';
    texto += ' Hora: ' + new Date().toLocaleTimeString() + '\n';
    texto += '.\n';
    texto += ` Cliente: ${this.nombreCliente || 'Sin nombre'}\n\n`;
    texto += '********************************\n';
    texto += '.\n';
    this.pedido.forEach(item => {
      texto += `${item.cantidad} x ${item.nombre}\n`;
      if (item.comentario?.trim()) {
        texto += `Obs: ${item.comentario}\n`;
      }
      texto += '--\n';
    });
    texto += '********************************\n';
    texto += '.\n'.repeat(3);

    return texto;
  }

}
