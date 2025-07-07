import { CardTypeDTO } from "./cardTypeDTO";

export type CardVariant = 'REGULAR' | 'NEBULA';

export interface CardDTO {
    id: string;
    name: string;
    variant: CardVariant;
    level?: number;
    attack?: number;
    health?: number;
    quote?: string;
    effect?: string;
    createdAt: Date;
    type: CardTypeDTO;
    displayImageId?: string;
    cardImageId?: string;
}

export interface CardCreationDTO {
    name: string;
    variant: CardVariant;
    level?: number;
    attack?: number;
    health?: number;
    quote?: string;
    effect?: string;
    typeId: string;
}