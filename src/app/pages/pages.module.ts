import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { NuevopedidoComponent } from './nuevopedido/nuevopedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ProductosComponent } from './productos/productos.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { LayoutComponent } from './layout/layout.component';
import {FormsModule} from "@angular/forms";
import { ProductosPanelComponent } from './componentes/productos-panel/productos-panel.component';
import { ResumenPedidoComponent } from './componentes/resumen-pedido/resumen-pedido.component';


@NgModule({
  declarations: [
    HomeComponent,
    NuevopedidoComponent,
    PedidosComponent,
    ProductosComponent,
    ConfiguracionComponent,
    LayoutComponent,
    ProductosPanelComponent,
    ResumenPedidoComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule
  ]
})
export class PagesModule { }
