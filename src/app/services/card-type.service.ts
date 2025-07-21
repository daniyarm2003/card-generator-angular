import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CardTypeCreationDTO, CardTypeDTO, CardTypeUpdateDTO } from '../types/cardTypeDTO';

@Injectable({
  providedIn: 'root'
})
export class CardTypeService {
  private readonly baseUrl = `${environment.backendBaseUrl}/types`;
  
  constructor(private httpClient: HttpClient) { }

  public getAllCardTypes() {
    return this.httpClient.get<CardTypeDTO[]>(this.baseUrl);
  }

  public createCardType(dto: CardTypeCreationDTO) {
    return this.httpClient.post<CardTypeDTO>(this.baseUrl, dto);
  }

  public updateCardType(typeId: string, dto: CardTypeUpdateDTO) {
    return this.httpClient.patch<CardTypeDTO>(`${this.baseUrl}/${typeId}`, dto);
  }

  public updateCardTypeImage(typeId: string, imageFile: File) {
    const formData = new FormData();
    formData.append('imageFile', imageFile);

    return this.httpClient.put<CardTypeDTO>(`${this.baseUrl}/${typeId}/image`, formData);
  }
}
