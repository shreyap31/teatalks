import { Injectable } from '@angular/core';
import { Tea } from '../models/tea';

@Injectable()
export class AppStateService {

  teaList: Tea[];

  constructor() { }

}
