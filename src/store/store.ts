import { DragObjectWithType } from 'react-dnd';
import { FormikValues } from 'formik';

export type ElementType = DragObjectWithType &
    FormikValues & {
        id: string;
    };

export interface IState {
    elements: ElementType[];
}
