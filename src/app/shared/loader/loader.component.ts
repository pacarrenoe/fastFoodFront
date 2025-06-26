import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  loading$: Observable<boolean> = this.loaderService.loading$;

  constructor(private loaderService: LoaderService) {}
}
