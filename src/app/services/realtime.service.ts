import { Injectable, inject } from '@angular/core';
import { Database } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  private database: Database = inject(Database);

  constructor() {}
}
