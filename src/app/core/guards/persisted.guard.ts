import {CanDeactivateFn} from '@angular/router';
import {EditablePage} from "./editable-page";

export const persistedGuard: CanDeactivateFn<EditablePage> = (component, currentRoute, currentState, nextState) => {
  return !component.isPersisted() ? confirm("Are you sure?") : true;
};
