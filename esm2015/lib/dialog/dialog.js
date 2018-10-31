/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Output, Input, EventEmitter, Optional, SkipSelf, ViewChild, ViewEncapsulation, Directive, ViewContainerRef, TemplateRef, } from '@angular/core';
import { style, trigger, state, transition, animate, } from '@angular/animations';
import { ESCAPE, Overlay, OverlayState, TemplatePortalDirective } from '../core/index';
import { extendObject } from '../core/util/object-extend';
import { first } from 'rxjs/operators';
/** @typedef {?} */
var DialogVisibility;
export { DialogVisibility };
/** @typedef {?} */
var DialogRole;
export { DialogRole };
export class Md2DialogConfig {
    constructor() {
        this.role = 'dialog';
        this.disableClose = false;
    }
}
if (false) {
    /** @type {?} */
    Md2DialogConfig.prototype.role;
    /** @type {?} */
    Md2DialogConfig.prototype.disableClose;
}
export class Md2DialogPortal extends TemplatePortalDirective {
    /**
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    constructor(templateRef, viewContainerRef) {
        super(templateRef, viewContainerRef);
    }
}
Md2DialogPortal.decorators = [
    { type: Directive, args: [{ selector: '[md2DialogPortal]' },] }
];
/** @nocollapse */
Md2DialogPortal.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef }
];
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
export class Md2DialogTitle {
}
Md2DialogTitle.decorators = [
    { type: Directive, args: [{ selector: 'md2-dialog-title' },] }
];
/**
 * Scrollable content container of a dialog.
 */
export class Md2DialogContent {
}
Md2DialogContent.decorators = [
    { type: Directive, args: [{ selector: 'md2-dialog-content' },] }
];
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
export class Md2DialogActions {
}
Md2DialogActions.decorators = [
    { type: Directive, args: [{ selector: 'md2-dialog-footer, md2-dialog-actions' },] }
];
export class Md2Dialog {
    /**
     * @param {?} _overlay
     * @param {?} _parentDialog
     */
    constructor(_overlay, _parentDialog) {
        this._overlay = _overlay;
        this._parentDialog = _parentDialog;
        this._openDialogsAtThisLevel = [];
        this._boundKeydown = this._handleKeydown.bind(this);
        this._panelOpen = false;
        this._overlayRef = null;
        /**
         * Property watched by the animation framework to show or hide the dialog
         */
        this._visibility = 'initial';
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this.destroyPanel(); }
    /**
     * @return {?}
     */
    get _openDialogs() {
        return this._parentDialog ? this._parentDialog._openDialogs : this._openDialogsAtThisLevel;
    }
    /**
     * Open the dialog
     * @param {?=} config
     * @return {?}
     */
    open(config) {
        this.config = _applyConfigDefaults(config);
        if (this._panelOpen) {
            return Promise.resolve(this);
        }
        this._createOverlay();
        this._overlayRef.attach(this._portal);
        this._subscribeToBackdrop();
        if (!this._openDialogs.length && !this._parentDialog) {
            document.addEventListener('keydown', this._boundKeydown);
        }
        this._openDialogs.push(this);
        this._panelOpen = true;
        this._visibility = 'visible';
        return Promise.resolve(this);
    }
    /**
     * Close the dialog
     * @return {?}
     */
    close() {
        this._visibility = 'hidden';
        this._panelOpen = false;
        if (this._overlayRef) {
            this._overlayRef.detach();
            if (this._backdropSubscription) {
                this._backdropSubscription.unsubscribe();
            }
        }
        /** @type {?} */
        let index = this._openDialogs.indexOf(this);
        if (index > -1) {
            this._openDialogs.splice(index, 1);
            // no open dialogs are left, call next on afterAllClosed Subject
            if (!this._openDialogs.length) {
                document.removeEventListener('keydown', this._boundKeydown);
            }
        }
        return Promise.resolve(this);
    }
    /**
     * Removes the panel from the DOM.
     * @return {?}
     */
    destroyPanel() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    }
    /**
     * @return {?}
     */
    _onPanelDone() {
        if (this._panelOpen) {
            this.onOpen.emit(this);
        }
        else {
            this.onClose.emit(this);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        /** @type {?} */
        let topDialog = this._openDialogs[this._openDialogs.length - 1];
        if (event.keyCode === ESCAPE && topDialog &&
            !topDialog.config.disableClose) {
            topDialog.close();
        }
    }
    /**
     * @return {?}
     */
    _subscribeToBackdrop() {
        if (!this.config.disableClose) {
            this._backdropSubscription = this._overlayRef.backdropClick().pipe(first()).subscribe(() => this.close());
        }
    }
    /**
     * @return {?}
     */
    _createOverlay() {
        if (!this._overlayRef) {
            /** @type {?} */
            let config = new OverlayState();
            config.positionStrategy = this._overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically();
            config.hasBackdrop = true;
            this._overlayRef = this._overlay.create(config);
        }
    }
    /**
     * @return {?}
     */
    _cleanUpSubscriptions() {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
    }
}
Md2Dialog.decorators = [
    { type: Component, args: [{
                selector: 'md2-dialog',
                template: "<ng-template md2DialogPortal>\n  <div class=\"md2-dialog-panel\" [attr.role]=\"config?.role\">\n    <!--[@state]=\"_visibility\" (@state.done)=\"_onPanelDone()\"-->\n    <div class=\"md2-dialog-content\">\n      <div class=\"md2-dialog-header\">\n        <button *ngIf=\"!config.disableClose\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"close()\">&times;</button>\n        <h2 *ngIf=\"dialogTitle\" class=\"md2-dialog-title\" id=\"myDialogLabel\" [innerHtml]=\"dialogTitle\"></h2>\n        <ng-content select=\"md2-dialog-title\"></ng-content>\n      </div>\n      <div class=\"md2-dialog-body\">\n        <ng-content select=\"md2-dialog-content\"></ng-content>\n        <ng-content></ng-content>\n      </div>\n      <ng-content select=\"md2-dialog-footer\"></ng-content>\n      <ng-content select=\"md2-dialog-actions\"></ng-content>\n    </div>\n  </div>\n</ng-template>\n",
                host: {
                    'tabindex': '0',
                    '[attr.role]': 'config?.role',
                },
                animations: [
                    trigger('state', [
                        state('void', style({ transform: 'scale(0.3)' })),
                        state('initial', style({ transform: 'scale(0.3)' })),
                        state('visible', style({ transform: 'scale(1)' })),
                        state('hidden', style({ transform: 'scale(0.3)' })),
                        transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                        transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
                    ])
                ],
                encapsulation: ViewEncapsulation.None,
                exportAs: 'md2Dialog',
                styles: [".md2-dialog-panel{position:relative;max-width:90vw;width:600px;border-radius:3px;background-color:#fff;overflow:hidden;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.md2-dialog-header{background:#2196f3;color:#fff;font-size:25px;line-height:1.1;font-weight:500;padding:0 48px 0 16px;border-bottom:1px solid #e5e5e5;word-wrap:break-word}.md2-dialog-header .close{position:absolute;top:21px;right:16px;display:inline-block;width:18px;height:18px;overflow:hidden;-webkit-appearance:none;padding:0;cursor:pointer;background:0 0;border:0;outline:0;opacity:.8;font-size:0;z-index:1;box-shadow:none;margin:0}.md2-dialog-header .close::after,.md2-dialog-header .close::before{content:'';position:absolute;top:50%;left:0;width:100%;height:2px;margin-top:-1px;background:#ccc;border-radius:2px}.md2-dialog-header .close::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.md2-dialog-header .close::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.md2-dialog-header .close:hover{opacity:1}.md2-dialog-header .md2-dialog-title,.md2-dialog-header md2-dialog-title{display:block;margin:0;padding:16px 0;font-size:25px;font-weight:500}.md2-dialog-header dialog-header{line-height:33px}.md2-dialog-body{position:relative;max-height:65vh;padding:16px;overflow-y:auto}.md2-dialog-footer,md2-dialog-footer{display:block;padding:16px;text-align:right;border-top:1px solid rgba(0,0,0,.12)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)}"]
            }] }
];
/** @nocollapse */
Md2Dialog.ctorParameters = () => [
    { type: Overlay },
    { type: Md2Dialog, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
Md2Dialog.propDecorators = {
    onOpen: [{ type: Output }],
    onClose: [{ type: Output }],
    _portal: [{ type: ViewChild, args: [Md2DialogPortal,] }],
    dialogTitle: [{ type: Input, args: ['title',] }]
};
if (false) {
    /** @type {?} */
    Md2Dialog.prototype._openDialogsAtThisLevel;
    /** @type {?} */
    Md2Dialog.prototype._boundKeydown;
    /** @type {?} */
    Md2Dialog.prototype._panelOpen;
    /** @type {?} */
    Md2Dialog.prototype._overlayRef;
    /** @type {?} */
    Md2Dialog.prototype._backdropSubscription;
    /** @type {?} */
    Md2Dialog.prototype.config;
    /**
     * Property watched by the animation framework to show or hide the dialog
     * @type {?}
     */
    Md2Dialog.prototype._visibility;
    /** @type {?} */
    Md2Dialog.prototype.onOpen;
    /** @type {?} */
    Md2Dialog.prototype.onClose;
    /**
     * The portal to send the dialog content through
     * @type {?}
     */
    Md2Dialog.prototype._portal;
    /** @type {?} */
    Md2Dialog.prototype.dialogTitle;
    /** @type {?} */
    Md2Dialog.prototype._overlay;
    /** @type {?} */
    Md2Dialog.prototype._parentDialog;
}
/**
 * Applies default options to the dialog config.
 * @param {?} dialogConfig Config to be modified.
 * @return {?} The new configuration object.
 */
function _applyConfigDefaults(dialogConfig) {
    return extendObject(new Md2DialogConfig(), dialogConfig);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvZGlhbG9nL2RpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sS0FBSyxFQUNMLFlBQVksRUFDWixRQUFRLEVBQ1IsUUFBUSxFQUNSLFNBQVMsRUFDVCxpQkFBaUIsRUFFakIsU0FBUyxFQUNULGdCQUFnQixFQUNoQixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLEtBQUssRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEdBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQ0wsTUFBTSxFQUNOLE9BQU8sRUFDUCxZQUFZLEVBRVosdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFLdkMsTUFBTTs7b0JBQ2dCLFFBQVE7NEJBQ0gsS0FBSzs7Q0FDL0I7Ozs7Ozs7QUFHRCxNQUFNLHNCQUF1QixTQUFRLHVCQUF1Qjs7Ozs7SUFDMUQsWUFBWSxXQUE2QixFQUFFLGdCQUFrQztRQUMzRSxLQUFLLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7S0FDdEM7OztZQUpGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTs7OztZQTVCMUMsV0FBVztZQURYLGdCQUFnQjs7Ozs7QUF3Q2xCLE1BQU07OztZQURMLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRTs7Ozs7QUFPM0MsTUFBTTs7O1lBREwsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFOzs7Ozs7QUFRN0MsTUFBTTs7O1lBREwsU0FBUyxT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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdIaEIsOEJBQThCLFlBQTZCO0lBQ3pELE9BQU8sWUFBWSxDQUFDLElBQUksZUFBZSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Q0FDMUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE91dHB1dCxcbiAgSW5wdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBPbkRlc3Ryb3ksXG4gIERpcmVjdGl2ZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgc3R5bGUsXG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICB0cmFuc2l0aW9uLFxuICBhbmltYXRlLFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIEVTQ0FQRSxcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheVN0YXRlLFxuICBPdmVybGF5UmVmLFxuICBUZW1wbGF0ZVBvcnRhbERpcmVjdGl2ZVxufSBmcm9tICcuLi9jb3JlL2luZGV4JztcbmltcG9ydCB7IGV4dGVuZE9iamVjdCB9IGZyb20gJy4uL2NvcmUvdXRpbC9vYmplY3QtZXh0ZW5kJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCB0eXBlIERpYWxvZ1Zpc2liaWxpdHkgPSAnaW5pdGlhbCcgfCAndmlzaWJsZScgfCAnaGlkZGVuJztcbmV4cG9ydCB0eXBlIERpYWxvZ1JvbGUgPSAnZGlhbG9nJyB8ICdhbGVydGRpYWxvZyc7XG5cbmV4cG9ydCBjbGFzcyBNZDJEaWFsb2dDb25maWcge1xuICByb2xlPzogRGlhbG9nUm9sZSA9ICdkaWFsb2cnO1xuICBkaXNhYmxlQ2xvc2U/OiBib29sZWFuID0gZmFsc2U7XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1ttZDJEaWFsb2dQb3J0YWxdJyB9KVxuZXhwb3J0IGNsYXNzIE1kMkRpYWxvZ1BvcnRhbCBleHRlbmRzIFRlbXBsYXRlUG9ydGFsRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IodGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcih0ZW1wbGF0ZVJlZiwgdmlld0NvbnRhaW5lclJlZik7XG4gIH1cbn1cblxuLyoqXG4gKiBUaXRsZSBvZiBhIGRpYWxvZyBlbGVtZW50LiBTdGF5cyBmaXhlZCB0byB0aGUgdG9wIG9mIHRoZSBkaWFsb2cgd2hlbiBzY3JvbGxpbmcuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ21kMi1kaWFsb2ctdGl0bGUnIH0pXG5leHBvcnQgY2xhc3MgTWQyRGlhbG9nVGl0bGUgeyB9XG5cbi8qKlxuICogU2Nyb2xsYWJsZSBjb250ZW50IGNvbnRhaW5lciBvZiBhIGRpYWxvZy5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbWQyLWRpYWxvZy1jb250ZW50JyB9KVxuZXhwb3J0IGNsYXNzIE1kMkRpYWxvZ0NvbnRlbnQgeyB9XG5cbi8qKlxuICogQ29udGFpbmVyIGZvciB0aGUgYm90dG9tIGFjdGlvbiBidXR0b25zIGluIGEgZGlhbG9nLlxuICogU3RheXMgZml4ZWQgdG8gdGhlIGJvdHRvbSB3aGVuIHNjcm9sbGluZy5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbWQyLWRpYWxvZy1mb290ZXIsIG1kMi1kaWFsb2ctYWN0aW9ucycgfSlcbmV4cG9ydCBjbGFzcyBNZDJEaWFsb2dBY3Rpb25zIHsgfVxuXG5AQ29tcG9uZW50KHtcbiAgXG4gIHNlbGVjdG9yOiAnbWQyLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnZGlhbG9nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZGlhbG9nLnNjc3MnXSxcbiAgaG9zdDoge1xuICAgICd0YWJpbmRleCc6ICcwJyxcbiAgICAnW2F0dHIucm9sZV0nOiAnY29uZmlnPy5yb2xlJyxcbiAgfSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3N0YXRlJywgW1xuICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDAuMyknIH0pKSxcbiAgICAgIHN0YXRlKCdpbml0aWFsJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgwLjMpJyB9KSksXG4gICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMSknIH0pKSxcbiAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDAuMyknIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gdmlzaWJsZScsIGFuaW1hdGUoJzE1MG1zIGN1YmljLWJlemllcigwLjAsIDAuMCwgMC4yLCAxKScpKSxcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gaGlkZGVuJywgYW5pbWF0ZSgnMTUwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAxLCAxKScpKSxcbiAgICBdKVxuICBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21kMkRpYWxvZydcbn0pXG5leHBvcnQgY2xhc3MgTWQyRGlhbG9nIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9vcGVuRGlhbG9nc0F0VGhpc0xldmVsOiBBcnJheTxhbnk+ID0gW107XG4gIHByaXZhdGUgX2JvdW5kS2V5ZG93biA9IHRoaXMuX2hhbmRsZUtleWRvd24uYmluZCh0aGlzKTtcbiAgcHJpdmF0ZSBfcGFuZWxPcGVuID0gZmFsc2U7XG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWYgPSBudWxsO1xuICBwcml2YXRlIF9iYWNrZHJvcFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBjb25maWc6IE1kMkRpYWxvZ0NvbmZpZztcblxuICAvKiogUHJvcGVydHkgd2F0Y2hlZCBieSB0aGUgYW5pbWF0aW9uIGZyYW1ld29yayB0byBzaG93IG9yIGhpZGUgdGhlIGRpYWxvZyAqL1xuICBfdmlzaWJpbGl0eTogRGlhbG9nVmlzaWJpbGl0eSA9ICdpbml0aWFsJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHByaXZhdGUgX3BhcmVudERpYWxvZzogTWQyRGlhbG9nKSB7IH1cblxuICBAT3V0cHV0KCkgb25PcGVuOiBFdmVudEVtaXR0ZXI8TWQyRGlhbG9nPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWQyRGlhbG9nPigpO1xuICBAT3V0cHV0KCkgb25DbG9zZTogRXZlbnRFbWl0dGVyPE1kMkRpYWxvZz4gPSBuZXcgRXZlbnRFbWl0dGVyPE1kMkRpYWxvZz4oKTtcblxuICAvKiogVGhlIHBvcnRhbCB0byBzZW5kIHRoZSBkaWFsb2cgY29udGVudCB0aHJvdWdoICovXG4gIEBWaWV3Q2hpbGQoTWQyRGlhbG9nUG9ydGFsKSBfcG9ydGFsOiBNZDJEaWFsb2dQb3J0YWw7XG5cbiAgQElucHV0KCd0aXRsZScpIGRpYWxvZ1RpdGxlOiBzdHJpbmc7XG5cbiAgbmdPbkRlc3Ryb3koKSB7IHRoaXMuZGVzdHJveVBhbmVsKCk7IH1cblxuICBnZXQgX29wZW5EaWFsb2dzKCk6IEFycmF5PGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnREaWFsb2cgPyB0aGlzLl9wYXJlbnREaWFsb2cuX29wZW5EaWFsb2dzIDogdGhpcy5fb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbDtcbiAgfVxuXG4gIC8qKiBPcGVuIHRoZSBkaWFsb2cgKi9cbiAgb3Blbihjb25maWc/OiBNZDJEaWFsb2dDb25maWcpOiBQcm9taXNlPE1kMkRpYWxvZz4ge1xuICAgIHRoaXMuY29uZmlnID0gX2FwcGx5Q29uZmlnRGVmYXVsdHMoY29uZmlnKTtcbiAgICBpZiAodGhpcy5fcGFuZWxPcGVuKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlPE1kMkRpYWxvZz4odGhpcyk7XG4gICAgfVxuICAgIHRoaXMuX2NyZWF0ZU92ZXJsYXkoKTtcbiAgICB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaCh0aGlzLl9wb3J0YWwpO1xuICAgIHRoaXMuX3N1YnNjcmliZVRvQmFja2Ryb3AoKTtcblxuICAgIGlmICghdGhpcy5fb3BlbkRpYWxvZ3MubGVuZ3RoICYmICF0aGlzLl9wYXJlbnREaWFsb2cpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9ib3VuZEtleWRvd24pO1xuICAgIH1cblxuICAgIHRoaXMuX29wZW5EaWFsb2dzLnB1c2godGhpcyk7XG4gICAgdGhpcy5fcGFuZWxPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLl92aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmU8TWQyRGlhbG9nPih0aGlzKTtcbiAgfVxuXG4gIC8qKiBDbG9zZSB0aGUgZGlhbG9nICovXG4gIGNsb3NlKCk6IFByb21pc2U8TWQyRGlhbG9nPiB7XG4gICAgdGhpcy5fdmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIHRoaXMuX3BhbmVsT3BlbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgaWYgKHRoaXMuX2JhY2tkcm9wU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGluZGV4ID0gdGhpcy5fb3BlbkRpYWxvZ3MuaW5kZXhPZih0aGlzKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLl9vcGVuRGlhbG9ncy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAvLyBubyBvcGVuIGRpYWxvZ3MgYXJlIGxlZnQsIGNhbGwgbmV4dCBvbiBhZnRlckFsbENsb3NlZCBTdWJqZWN0XG4gICAgICBpZiAoIXRoaXMuX29wZW5EaWFsb2dzLmxlbmd0aCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fYm91bmRLZXlkb3duKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZTxNZDJEaWFsb2c+KHRoaXMpO1xuICB9XG5cbiAgLyoqIFJlbW92ZXMgdGhlIHBhbmVsIGZyb20gdGhlIERPTS4gKi9cbiAgZGVzdHJveVBhbmVsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSBudWxsO1xuXG4gICAgICB0aGlzLl9jbGVhblVwU3Vic2NyaXB0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIF9vblBhbmVsRG9uZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLm9uT3Blbi5lbWl0KHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGxldCB0b3BEaWFsb2cgPSB0aGlzLl9vcGVuRGlhbG9nc1t0aGlzLl9vcGVuRGlhbG9ncy5sZW5ndGggLSAxXTtcblxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdG9wRGlhbG9nICYmXG4gICAgICAhdG9wRGlhbG9nLmNvbmZpZy5kaXNhYmxlQ2xvc2UpIHtcbiAgICAgIHRvcERpYWxvZy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvQmFja2Ryb3AoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5kaXNhYmxlQ2xvc2UpIHtcbiAgICAgIHRoaXMuX2JhY2tkcm9wU3Vic2NyaXB0aW9uID0gdGhpcy5fb3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgdGhpcy5jbG9zZSgpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgbGV0IGNvbmZpZyA9IG5ldyBPdmVybGF5U3RhdGUoKTtcbiAgICAgIGNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgIC5nbG9iYWwoKVxuICAgICAgICAuY2VudGVySG9yaXpvbnRhbGx5KClcbiAgICAgICAgLmNlbnRlclZlcnRpY2FsbHkoKTtcbiAgICAgIGNvbmZpZy5oYXNCYWNrZHJvcCA9IHRydWU7XG5cbiAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZShjb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NsZWFuVXBTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9iYWNrZHJvcFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fYmFja2Ryb3BTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxufVxuXG4vKipcbiAqIEFwcGxpZXMgZGVmYXVsdCBvcHRpb25zIHRvIHRoZSBkaWFsb2cgY29uZmlnLlxuICogQHBhcmFtIGRpYWxvZ0NvbmZpZyBDb25maWcgdG8gYmUgbW9kaWZpZWQuXG4gKiBAcmV0dXJucyBUaGUgbmV3IGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBfYXBwbHlDb25maWdEZWZhdWx0cyhkaWFsb2dDb25maWc6IE1kMkRpYWxvZ0NvbmZpZyk6IE1kMkRpYWxvZ0NvbmZpZyB7XG4gIHJldHVybiBleHRlbmRPYmplY3QobmV3IE1kMkRpYWxvZ0NvbmZpZygpLCBkaWFsb2dDb25maWcpO1xufVxuIl19