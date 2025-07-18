import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Categoria } from '../../model/categoria.model';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  crearCategoria(data: Categoria): Observable<Categoria> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      map(response => response.data[0])
    );
  }

  actualizarCategoria(id: number, data: Categoria): Observable<Categoria> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data).pipe(
      map(response => response.data[0])
    );
  }

  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
