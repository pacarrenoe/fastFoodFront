import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  fechaHora = new Date().toLocaleString();
  numeroBoleta = Math.floor(1000 + Math.random() * 9000); // Folio aleatorio

  imprimirBoleta() {
    const contenido = document.getElementById('boleta-content')?.innerHTML;
    const ventana = window.open('', '', 'width=300,height=600');
    if (ventana && contenido) {
      ventana.document.write(`
        <html>
          <head>
            <title>Boleta Electrónica #${this.numeroBoleta}</title>
            <style>
              * {
                font-family: monospace;
                font-size: 13px;
                line-height: 1.4;
                color: #000;
              }
              .boleta {
                width: 48mm;
                padding: 3px;
              }
              .logo {
                text-align: center;
                margin-bottom: 5px;
              }
              .logo img {
                width: 80px;
              }
              .center {
                text-align: center;
              }
              .right {
                text-align: right;
              }
              .bold {
                font-weight: bold;
              }
              .datos, .footer {
                margin-bottom: 5px;
              }
              .line {
                border-top: 1px solid #000;
                margin: 3px 0;
              }
              .double-line {
                border-top: 2px solid #000;
                margin: 3px 0;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                padding: 1px 0;
                word-wrap: break-word;
              }
              th {
                border-bottom: 1px solid #000;
                font-size: 12px;
              }
              td.right {
                text-align: right;
              }
              .totales {
                margin-top: 3px;
              }
              .totales p {
                margin: 0;
              }
              .total-final {
                font-size: 15px;
                font-weight: bold;
                text-align: center;
              }
              .qr {
                margin-top: 5px;
                text-align: center;
              }
              .qr img {
                width: 60px;
              }
              .footer {
                font-size: 11px;
                text-align: center;
                margin-top: 5px;
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            ${contenido}
          </body>
        </html>
      `);
      ventana.document.close();
    }
  }
}
