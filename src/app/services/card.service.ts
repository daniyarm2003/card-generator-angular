import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CardCreationDTO, CardDTO } from '../types/cardDTO';
import { PaginationDTO } from '../types/paginationDTO';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly baseUrl = `${environment.backendBaseUrl}/api/cards`;

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
}
