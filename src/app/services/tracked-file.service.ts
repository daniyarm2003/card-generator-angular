import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackedFileService {
  private readonly baseUrl = `${environment.backendBaseUrl}/files`;

  constructor() { }

  public getFileDownloadUrl(id: string) {
    return `${this.baseUrl}/${id}/content`;
  }
}
