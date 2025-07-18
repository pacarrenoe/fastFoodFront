import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from "../../model/categoria.model";
import { Producto } from "../../model/producto.model";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../shared/dialogs/confirm-dialog/confirm-dialog.component";
import { TipoPagoDialogComponent } from "../componentes/dialogs/tipo-pago-dialog/tipo-pago-dialog.component";
import { CategoriaService } from "../../services/nuevo-pedido/categoria.service";
import { ProductoService } from "../../services/nuevo-pedido/producto.service";

@Component({
  selector: 'app-nuevopedido',
  templateUrl: './nuevopedido.component.html',
  styleUrls: ['./nuevopedido.component.scss']
})
export class NuevopedidoComponent implements OnInit {

  categorias: Categoria[] = [];
  productos: Producto[] = [];
  categoriaSeleccionada!: Categoria;
  productosFiltrados: Producto[] = [];
  pedido: (Producto & { cantidad: number; comentario: string })[] = [];
  total = 0;
  nombreCliente: string = '';

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private categoriaService: CategoriaService,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  private cargarDatos() {
    const categoriasStorage = sessionStorage.getItem('categorias');
    const productosStorage = sessionStorage.getItem('productos');

    if (categoriasStorage && productosStorage) {
      console.log('✅ Datos cargados desde sessionStorage');
      this.categorias = JSON.parse(categoriasStorage);

      this.productos = JSON.parse(productosStorage).map((p: any) => ({
        ...p,
        categoria: typeof p.categoria === 'string' ? JSON.parse(p.categoria) : p.categoria
      }));

      this.inicializarVista();
    } else {
      console.log('📡 Llamando al backend para cargar datos...');
      this.categoriaService.getCategorias().subscribe({
        next: (categorias) => {
          this.categorias = categorias;
          sessionStorage.setItem('categorias', JSON.stringify(categorias));
          this.inicializarVista();
        },
        error: (err) => {
          this.toastr.error('Error al cargar categorías');
          console.error(err);
        }
      });

      this.productoService.getProductos().subscribe({
        next: (productos) => {
          const productosConCategoria = productos.map((p: any) => ({
            ...p,
            categoria: typeof p.categoria === 'string' ? JSON.parse(p.categoria) : p.categoria
          }));
          this.productos = productosConCategoria;
          sessionStorage.setItem('productos', JSON.stringify(productosConCategoria));
        },
        error: (err) => {
          this.toastr.error('Error al cargar productos');
          console.error(err);
        }
      });
    }
  }


  private inicializarVista() {
    if (this.categorias.length > 0) {
      this.seleccionarCategoria(this.categorias[0]);
    }
  }

  seleccionarCategoria(categoria: Categoria) {
    this.categoriaSeleccionada = categoria;
    this.productosFiltrados = this.productos.filter((p) => {
      const categoriaProducto = typeof p.categoria === 'string'
        ? JSON.parse(p.categoria)
        : p.categoria;
      return categoriaProducto.id === categoria.id;
    });
  }

  agregarProducto(producto: Producto) {
    const encontrado = this.pedido.find(p => p.id === producto.id);
    if (encontrado) {
      encontrado.cantidad++;
    } else {
      this.pedido.push({ ...producto, cantidad: 1, comentario: '' });
    }
    this.actualizarTotal();
  }

  quitarProducto(producto: Producto) {
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
    const tipoDialog = this.dialog.open(TipoPagoDialogComponent);

    tipoDialog.afterClosed().subscribe(tipo => {
      if (!tipo) return;

      console.log('Tipo de pago seleccionado:', tipo);
      resumen.tipoPago = tipo;

      const textoCaja = this.generarBoletaCaja(resumen, tipo);
      this.imprimirTexto(textoCaja);

      const cocinaDialog = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Imprimir boleta de cocina',
          message: '¿Deseas imprimir también la boleta para cocina?'
        }
      });

      cocinaDialog.afterClosed().subscribe(confirmado => {
        if (confirmado === true) {
          const textoCocina = this.generarBoletaCocina(resumen);
          this.imprimirTexto(textoCocina);
        }

        this.toastr.success('Pedido confirmado');
        this.pedido = [];
        this.total = 0;
      });
    });
  }

  private imprimirTexto(texto: string) {
    const ventana = window.open('', '', 'width=250,height=600');
    if (ventana) {
      ventana.document.write(`<pre>${texto}</pre>`);
      ventana.document.close();
      ventana.focus();
      ventana.print();
      ventana.close();
    }
  }

  private generarBoletaCocina(resumen: any): string {
    const categoriasCocina = ['Ass', 'Vianesas', 'Churrascos', 'Megas', 'Papas fritas'];
    let texto = '******* COCINA *******\n';
    texto += `Hora: ${new Date().toLocaleTimeString()}\n`;
    texto += `Cliente: ${resumen.cliente || 'Sin nombre'}\n`;
    texto += '-------------------------\n';

    const conteo: { [categoria: string]: number } = {};

    resumen.items
      .filter((item: any) => categoriasCocina.includes(item.categoria.nombre))
      .forEach((item: any) => {
        texto += `${item.cantidad} x ${item.nombre}\n`;
        if (item.comentario?.trim()) {
          texto += `- Obs: ${item.comentario}\n`;
        }
        texto += '--\n';
        conteo[item.categoria.nombre] = (conteo[item.categoria.nombre] || 0) + item.cantidad;
      });

    texto += '-------------------------\n';
    Object.entries(conteo).forEach(([categoria, cantidad]) => {
      texto += `${cantidad} x ${categoria}\n`;
    });
    texto += '-------------------------\n\n\n';
    return texto;
  }

  private generarBoletaCaja(resumen: any, tipo: any): string {
    let texto = '********** VENTA **********\n';
    texto += `Hora: ${new Date().toLocaleTimeString()}\n`;
    texto += `Cliente: ${resumen.cliente || 'Sin nombre'}\n`;
    texto += '------------------------------\n';

    resumen.items.forEach((item: any) => {
      texto += `${item.cantidad} x ${item.nombre} $${item.precio}\n`;
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
    texto += '------------------------------\n\n\n';
    return texto;
  }
}
