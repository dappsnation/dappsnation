import { InjectionToken } from '@angular/core';
import { Factory, FormOutlet } from './types';

export const FACTORY = new InjectionToken<Factory>('Factory used to generate form component');
export const CONTEXT = new InjectionToken<FormOutlet>('Context holding the form & schema');
