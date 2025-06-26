import { CardTypeCreationDTO, CardTypeDTO } from "../../types/cardTypeDTO";

export interface EditTypeSubmission {
    typeData: Partial<CardTypeDTO>;
    imageFile?: File;
}

export interface AddTypeSubmission {
    typeData: CardTypeCreationDTO;
    imageFile?: File;
}