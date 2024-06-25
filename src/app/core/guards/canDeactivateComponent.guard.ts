import { CanDeactivateFn } from "@angular/router";

export interface CanDeactivateComponent {
    canDeactivate: () => boolean;
}

export const canDeactivateComponentGuard : CanDeactivateFn<CanDeactivateComponent> = (component) => {
    const canDeactivate = component.canDeactivate();    
    return canDeactivate
        ? true
        : window.confirm('Are you sure you want to leave this page?');
}