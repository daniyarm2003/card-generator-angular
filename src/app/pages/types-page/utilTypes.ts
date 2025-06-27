import { CardTypeCreationDTO, CardTypeDTO, CardTypeUpdateDTO } from "../../types/cardTypeDTO";

export interface EditTypeSubmission {
    editingType: CardTypeDTO;
    typeData: CardTypeUpdateDTO;
    imageFile?: File;
}

export interface AddTypeSubmission {
    typeData: CardTypeCreationDTO;
    imageFile?: File;
}