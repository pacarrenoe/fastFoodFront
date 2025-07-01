import {Producto} from "../../app/model/producto.model";
import {Categoria} from "../../app/model/categoria.model";


export const categorias: Categoria[] = [
  { id: '1', nombre: 'Papas fritas' },
  { id: '2', nombre: 'Vianesas' },
  { id: '3', nombre: 'Ass' },
  { id: '4', nombre: 'Churrascos' },
  { id: '5', nombre: 'Megas' },
  { id: '6', nombre: 'Salsas'},
  { id: '7', nombre: 'Bebidas' },
  { id: '8', nombre: 'Té' },
  { id: '9', nombre: 'Café' },
  { id: '10', nombre: 'Energeticas' },
];

export const productos: Producto[] = [
  { id: 1, nombre: 'Papa frita chica', precio: 2000, categoria: 'Papas fritas' },
  { id: 2, nombre: 'Papa frita grande', precio: 3000, categoria: 'Papas fritas' },
  { id: 3, nombre: 'Salchipapa chica', precio: 3000, categoria: 'Papas fritas' },
  { id: 4, nombre: 'Salchipapa grande', precio: 4000, categoria: 'Papas fritas' },
  { id: 5, nombre: 'Brigido', precio: 9000, categoria: 'Papas fritas' },
  { id: 6, nombre: 'Papa Suprema', precio: 10000, categoria: 'Papas fritas' },
  { id: 7, nombre: 'Mayonesa casera', precio: 500, categoria: 'Salsas' },
  { id: 8, nombre: 'Salsa queso cheddar', precio: 500, categoria: 'Salsas' },

  // Bebestibles
  { id: 9, nombre: 'Bebida express', precio: 800, categoria: 'Bebidas' },
  { id: 10, nombre: 'Bebida lata', precio: 1300, categoria: 'Bebidas' },
  { id: 11, nombre: 'Bebida 1.5L', precio: 2400, categoria: 'Bebidas' },
  { id: 12, nombre: 'Bebida 2L', precio: 2700, categoria: 'Bebidas' },
  { id: 13, nombre: 'Jugo néctar 1.5L', precio: 1900, categoria: 'Bebidas' },
  { id: 14, nombre: 'Energética Monster', precio: 800, categoria: 'Energeticas' },
  { id: 15, nombre: 'Energética Score', precio: 1300, categoria: 'Energeticas' },
  { id: 16, nombre: 'Café', precio: 1000, categoria: 'Café' },
  { id: 17, nombre: 'Té', precio: 800, categoria: 'Té' },

  // Sándwiches por tipo base
  // Vianesa
  { id: 18, nombre: 'Vianesa Italiano', precio: 2400, categoria: 'Vianesas' },
  { id: 19, nombre: 'Vianesa Especial mayo', precio: 1700, categoria: 'Vianesas' },
  { id: 20, nombre: 'Vianesa Tomate mayo', precio: 2200, categoria: 'Vianesas' },
  { id: 21, nombre: 'Vianesa Completo', precio: 2300, categoria: 'Vianesas' },
  { id: 22, nombre: 'Vianesa Aleman', precio: 2300, categoria: 'Vianesas' },
  { id: 23, nombre: 'Vianesa Barros Luco', precio: 2600, categoria: 'Vianesas' },
  { id: 24, nombre: 'Vianesa Chacarero', precio: 2600, categoria: 'Vianesas' },
  { id: 25, nombre: 'Vianesa Dinamico', precio: 2900, categoria: 'Vianesas' },
  { id: 26, nombre: 'Vianesa Brasileno', precio: 2900, categoria: 'Vianesas' },
  { id: 27, nombre: 'Vianesa Napolitano', precio: 2900, categoria: 'Vianesas' },
  { id: 28, nombre: 'Vianesa Chacarero Palta', precio: 2900, categoria: 'Vianesas' },
  { id: 29, nombre: 'Vianesa Italuco', precio: 3000, categoria: 'Vianesas' },
  { id: 30, nombre: 'Vianesa Vegetariano', precio: 2500, categoria: 'Vianesas' },

  // Ass
  { id: 31, nombre: 'Ass Italiano', precio: 4400, categoria: 'Ass' },
  { id: 32, nombre: 'Ass Especial mayo', precio: 3500, categoria: 'Ass' },
  { id: 33, nombre: 'Ass Tomate mayo', precio: 4000, categoria: 'Ass' },
  { id: 34, nombre: 'Ass Completo', precio: 4200, categoria: 'Ass' },
  { id: 35, nombre: 'Ass Aleman', precio: 4200, categoria: 'Ass' },
  { id: 36, nombre: 'Ass Barros Luco', precio: 4400, categoria: 'Ass' },
  { id: 37, nombre: 'Ass Chacarero', precio: 4400, categoria: 'Ass' },
  { id: 38, nombre: 'Ass Dinamico', precio: 4700, categoria: 'Ass' },
  { id: 39, nombre: 'Ass Brasileno', precio: 4700, categoria: 'Ass' },
  { id: 40, nombre: 'Ass Napolitano', precio: 4700, categoria: 'Ass' },
  { id: 41, nombre: 'Ass Chacarero Palta', precio: 4700, categoria: 'Ass' },
  { id: 42, nombre: 'Ass Italuco', precio: 5000, categoria: 'Ass' },

  // Churrasco
  { id: 43, nombre: 'Ch. Italiano', precio: 7700, categoria: 'Churrascos' },
  { id: 44, nombre: 'Ch. Especial mayo', precio: 5900, categoria: 'Churrascos' },
  { id: 45, nombre: 'Ch. Tomate mayo', precio: 7300, categoria: 'Churrascos' },
  { id: 46, nombre: 'Ch. Completo', precio: 7700, categoria: 'Churrascos' },
  { id: 47, nombre: 'Ch. Aleman', precio: 7600, categoria: 'Churrascos' },
  { id: 48, nombre: 'Ch. Barros Luco', precio: 7700, categoria: 'Churrascos' },
  { id: 49, nombre: 'Ch. Chacarero', precio: 7700, categoria: 'Churrascos' },
  { id: 50, nombre: 'Ch. Dinamico', precio: 8200, categoria: 'Churrascos' },
  { id: 51, nombre: 'Ch. Brasileno', precio: 8200, categoria: 'Churrascos' },
  { id: 52, nombre: 'Ch. Napolitano', precio: 8200, categoria: 'Churrascos' },
  { id: 53, nombre: 'Ch. Chacarero Palta', precio: 8200, categoria: 'Churrascos' },
  { id: 54, nombre: 'Ch. Italuco', precio: 8600, categoria: 'Churrascos' },
  { id: 55, nombre: 'Ch. Vegetariano', precio: 4900, categoria: 'Churrascos' },

  // Megas
  { id: 56, nombre: 'M. Italiano', precio: 16000, categoria: 'Megas' },
  { id: 57, nombre: 'M. Especial mayo', precio: 13500, categoria: 'Megas' },
  { id: 58, nombre: 'M. Tomate mayo', precio: 15000, categoria: 'Megas' },
  { id: 59, nombre: 'M. Completo', precio: 16000, categoria: 'Megas' },
  { id: 60, nombre: 'M. Aleman', precio: 16000, categoria: 'Megas' },
  { id: 61, nombre: 'M. Barros Luco', precio: 16000, categoria: 'Megas' },
  { id: 62, nombre: 'M. Chacarero', precio: 16000, categoria: 'Megas' },
  { id: 63, nombre: 'M. Dinamico', precio: 17000, categoria: 'Megas' },
  { id: 64, nombre: 'M. Brasileno', precio: 17000, categoria: 'Megas' },
  { id: 65, nombre: 'M. Napolitano', precio: 17000, categoria: 'Megas' },
  { id: 66, nombre: 'M. Chacarero Palta', precio: 17000, categoria: 'Megas' },
  { id: 67, nombre: 'M. Italuco', precio: 17000, categoria: 'Megas' },
  { id: 68, nombre: 'M. Vegetariano', precio: 10000, categoria: 'Megas' }
];
