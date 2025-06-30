import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Categoria} from "../../../model/categoria.model";
import {Producto} from "../../../model/producto.model";

@Component({
  selector: 'app-productos-panel',
  templateUrl: './productos-panel.component.html',
  styleUrl: './productos-panel.component.scss'
})
export class ProductosPanelComponent {
  @Input() categorias: Categoria[] = [];
  @Input() categoriaSeleccionada!: Categoria;
  @Input() productosFiltrados: Producto[] = [];

  @Output() cambiarCategoria = new EventEmitter<Categoria>();
  @Output() agregar = new EventEmitter<any>();


  seleccionarCategoria(cat: Categoria) {
    this.cambiarCategoria.emit(cat);
  }

  agregarProducto(prod: Producto) {
    this.agregar.emit(prod);
  }
}
