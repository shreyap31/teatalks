import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Tea } from '../models/tea';

@Injectable()
export class TeaService {

  constructor(private apiService: ApiService) { }

  getTeaList(userId = 'Default'): Observable<Tea[]> {
    return this.apiService.request<Tea[]>(`/teaTalks/getTeaList/${userId}`);
  }

  getTea(teaId: string): Observable<Tea> {
    return this.apiService.request<Tea>(`/teaTalks/getTea/${teaId}`);
  }

}
