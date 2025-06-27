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

export type CardTypeUpdateDTO = Partial<CardTypeCreationDTO>;