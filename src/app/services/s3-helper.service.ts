import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class S3HelperService {

  constructor(private httpClient: HttpClient) { }

  public putToPresignedUrl(presignedUrl: string, file: File, contentType?: string) {
    return this.httpClient.put(presignedUrl, file, {
      headers: {
        'Content-Type': contentType || file.type
      }
    });
  }
}
