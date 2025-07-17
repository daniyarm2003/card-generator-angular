import { CardTypeDTO } from "./cardTypeDTO";

export type CardVariant = 'REGULAR' | 'NEBULA';

export interface CardDTO {
    id: string;
    name: string;
    number: number;
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
    number: number;
    variant: CardVariant;
    level?: number;
    attack?: number;
    health?: number;
    quote?: string;
    effect?: string;
    typeId: string;
}

export type CardUpdateDTO = Partial<Omit<CardCreationDTO, 'variant'>>;