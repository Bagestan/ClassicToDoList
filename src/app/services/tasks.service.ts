import { Injectable } from '@angular/core';
import { RealtimeService } from './realtime.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private db: RealtimeService, private localStorage: LocalStorageService) { }
}
