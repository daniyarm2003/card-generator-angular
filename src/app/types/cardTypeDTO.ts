export interface CardTypeDTO {
    id: string;
    backgroundColorHexCode1: string;
    backgroundColorHexCode2: string;
    textColor: string;
    name: string;
    imageFileId?: string;
}

export interface CardTypeCreationDTO {
    backgroundColorHexCode1: string;
    backgroundColorHexCode2: string;
    textColor: string;
    name: string;
}

export const CARD_TYPE_NONE_ID = '00000000-0000-0000-0000-000000000001';

export type CardTypeUpdateDTO = Partial<CardTypeCreationDTO>;