import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CardTypeCreationDTO, CardTypeDTO } from '../types/cardTypeDTO';

@Injectable({
  providedIn: 'root'
})
export class CardTypeService {
  private readonly baseUrl = `${environment.backendBaseUrl}/api/types`;
  
  constructor(private httpClient: HttpClient) { }

  public getAllCardTypes() {
    return this.httpClient.get<CardTypeDTO[]>(this.baseUrl);
  }

  public createCardType(dto: CardTypeCreationDTO) {
    return this.httpClient.post<CardTypeDTO>(this.baseUrl, dto);
  }
}
