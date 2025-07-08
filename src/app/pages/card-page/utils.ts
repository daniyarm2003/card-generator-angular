import { CardCreationDTO, CardDTO, CardVariant } from "../../types/cardDTO";
import { CardTypeDTO } from "../../types/cardTypeDTO";

export interface AddCardSubmission {
    dto: CardCreationDTO;
    imageFile?: File;
}

export interface CardUpdateSubmission {
    cardToUpdate: CardDTO;
    imageFile?: File;
}

export interface CardPreviewProps {
    name: string;
    variant: CardVariant;
    quote?: string;
    effect?: string;
    level?: number;
    attack?: number;
    health?: number;
    type: CardTypeDTO;
    imageUrl?: string;
}