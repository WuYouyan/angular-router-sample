import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Crisis } from './crisis';
import { CRISES } from './mock-crises';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {

  constructor(
    private massageService: MessageService
  ) { }

  getCrises(id?: number | string): Observable<Crisis[]> {
    this.massageService.add('CrisisService: fetched crises');
    return of(CRISES);
  }

  getCrisis(id: number | string): Observable<Crisis> {
    return this.getCrises().pipe(
      // (+) before `id` turns the string into a number
      map( (crises: Crisis[]) =>
        crises.find(crisis => crisis.id === +id)
      )
    );
  }
  // addCrisis(name: string) {
  //   name = name.trim();
  //   if (name) {
  //     let crisis = { id: CrisisService.nextCrisisId++, name };
  //     CRISES.push(crisis);
  //     this.crises$.next(CRISES);
  //   }
  // }
}
