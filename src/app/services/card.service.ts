import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CardCreationDTO, CardDTO, CardQueryDTO, CardUpdateDTO } from '../types/cardDTO';
import { PaginationDTO } from '../types/paginationDTO';
import { UploadUrlResponseDTO } from '../types/uploadUrlResponseDto';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly baseUrl = `${environment.backendBaseUrl}/cards`;

  constructor(private httpClient: HttpClient) { }

  public getCards(queryDTO: CardQueryDTO) {
    return this.httpClient.get<PaginationDTO<CardDTO>>(this.baseUrl, {
      params: { ...queryDTO }
    })
  }

  public createCard(dto: CardCreationDTO) {
    return this.httpClient.post<CardDTO>(this.baseUrl, dto);
  }

  public updateCard(id: string, dto: CardUpdateDTO) {
    return this.httpClient.patch<CardDTO>(`${this.baseUrl}/${id}`, dto);
  }

  public createCardDisplayImageUploadUrl(id: string, fileName: string) {
    return this.httpClient.post<UploadUrlResponseDTO>(`${this.baseUrl}/${id}/display-image/upload-url`, { fileName });
  }

  public updateCardImage(id: string, file: File) {
    const formData = new FormData();
    formData.append('imageFile', file);

    return this.httpClient.put<CardDTO>(`${this.baseUrl}/${id}/image`, formData);
  }

  public generateCardImage(id: string) {
    return this.httpClient.post<CardDTO>(`${this.baseUrl}/${id}/card-image/update`, {});
  }

  public deleteCard(id: string) {
    return this.httpClient.delete<CardDTO>(`${this.baseUrl}/${id}`);
  }
}
