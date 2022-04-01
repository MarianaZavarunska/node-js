import { ActionTokenTypes } from '../enums/enums';
import { ICommonEntity } from './commonFields.interface';

export interface IActionToken extends ICommonEntity{
    actionToken: string;
    type: ActionTokenTypes;
    userId: number;
}

export interface IActionTokenToSave{
    actionToken: string;
    type: ActionTokenTypes;
    userId: number;
}
