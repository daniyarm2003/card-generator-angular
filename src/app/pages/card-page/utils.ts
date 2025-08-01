import { CardCreationDTO, CardDTO, CardUpdateDTO, CardVariant } from "../../types/cardDTO";
import { CardTypeDTO } from "../../types/cardTypeDTO";

export interface AddCardSubmission {
    dto: CardCreationDTO;
    imageFile?: File;
}

export interface CardUpdateSubmission {
    cardToUpdate: CardDTO;
    dto: CardUpdateDTO;
    imageFile?: File;
}

export interface CardPreviewProps {
    name: string;
    number: number;
    variant: CardVariant;
    quote?: string;
    effect?: string;
    level?: number;
    attack?: number;
    health?: number;
    type: CardTypeDTO;
    imageUrl?: string;
}