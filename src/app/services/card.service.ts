import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CardCreationDTO, CardDTO, CardUpdateDTO } from '../types/cardDTO';
import { PaginationDTO } from '../types/paginationDTO';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly baseUrl = `${environment.backendBaseUrl}/cards`;

  constructor(private httpClient: HttpClient) { }

  public getAllCards() {
    return this.httpClient.get<CardDTO[]>(this.baseUrl);
  }

  public getCardsPaginated(pageNum: number, pageSize: number) {
    return this.httpClient.get<PaginationDTO<CardDTO>>(this.baseUrl, {
      params: {
        pageNum, 
        pageSize
      }
    });
  }

  public createCard(dto: CardCreationDTO) {
    return this.httpClient.post<CardDTO>(this.baseUrl, dto);
  }

  public updateCard(id: string, dto: CardUpdateDTO) {
    return this.httpClient.patch<CardDTO>(`${this.baseUrl}/${id}`, dto);
  }

  public updateCardImage(id: string, file: File) {
    const formData = new FormData();
    formData.append('imageFile', file);

    return this.httpClient.put<CardDTO>(`${this.baseUrl}/${id}/image`, formData);
  }

  public generateCardImage(id: string) {
    return this.httpClient.patch<CardDTO>(`${this.baseUrl}/${id}/card-image/update`, {});
  }
}
