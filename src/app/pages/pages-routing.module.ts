import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NuevopedidoComponent} from "./nuevopedido/nuevopedido.component";
import {PedidosComponent} from "./pedidos/pedidos.component";
import {ConfiguracionComponent} from "./configuracion/configuracion.component";
import {ProductosComponent} from "./productos/productos.component";
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'nuevo-pedido', component: NuevopedidoComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
