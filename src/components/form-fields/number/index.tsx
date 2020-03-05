import * as React from 'react';
import { InputAttributes, TextInput } from '../input';

export const NumberInput = (props: InputAttributes) => <TextInput {...props} type={'number'} />;
