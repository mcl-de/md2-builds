/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var Md2DialogConfig = /** @class */ (function () {
    function Md2DialogConfig() {
        this.role = 'dialog';
        this.disableClose = false;
    }
    return Md2DialogConfig;
}());
export { Md2DialogConfig };
if (false) {
    /** @type {?} */
    Md2DialogConfig.prototype.role;
    /** @type {?} */
    Md2DialogConfig.prototype.disableClose;
}
var Md2DialogPortal = /** @class */ (function (_super) {
    tslib_1.__extends(Md2DialogPortal, _super);
    function Md2DialogPortal(templateRef, viewContainerRef) {
        return _super.call(this, templateRef, viewContainerRef) || this;
    }
    Md2DialogPortal.decorators = [
        { type: Directive, args: [{ selector: '[md2DialogPortal]' },] }
    ];
    /** @nocollapse */
    Md2DialogPortal.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    return Md2DialogPortal;
}(TemplatePortalDirective));
export { Md2DialogPortal };
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
var Md2DialogTitle = /** @class */ (function () {
    function Md2DialogTitle() {
    }
    Md2DialogTitle.decorators = [
        { type: Directive, args: [{ selector: 'md2-dialog-title' },] }
    ];
    return Md2DialogTitle;
}());
export { Md2DialogTitle };
/**
 * Scrollable content container of a dialog.
 */
var Md2DialogContent = /** @class */ (function () {
    function Md2DialogContent() {
    }
    Md2DialogContent.decorators = [
        { type: Directive, args: [{ selector: 'md2-dialog-content' },] }
    ];
    return Md2DialogContent;
}());
export { Md2DialogContent };
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
var Md2DialogActions = /** @class */ (function () {
    function Md2DialogActions() {
    }
    Md2DialogActions.decorators = [
        { type: Directive, args: [{ selector: 'md2-dialog-footer, md2-dialog-actions' },] }
    ];
    return Md2DialogActions;
}());
export { Md2DialogActions };
var Md2Dialog = /** @class */ (function () {
    function Md2Dialog(_overlay, _parentDialog) {
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
    Md2Dialog.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this.destroyPanel(); };
    Object.defineProperty(Md2Dialog.prototype, "_openDialogs", {
        get: /**
         * @return {?}
         */
        function () {
            return this._parentDialog ? this._parentDialog._openDialogs : this._openDialogsAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    /** Open the dialog */
    /**
     * Open the dialog
     * @param {?=} config
     * @return {?}
     */
    Md2Dialog.prototype.open = /**
     * Open the dialog
     * @param {?=} config
     * @return {?}
     */
    function (config) {
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
    };
    /** Close the dialog */
    /**
     * Close the dialog
     * @return {?}
     */
    Md2Dialog.prototype.close = /**
     * Close the dialog
     * @return {?}
     */
    function () {
        this._visibility = 'hidden';
        this._panelOpen = false;
        if (this._overlayRef) {
            this._overlayRef.detach();
            if (this._backdropSubscription) {
                this._backdropSubscription.unsubscribe();
            }
        }
        /** @type {?} */
        var index = this._openDialogs.indexOf(this);
        if (index > -1) {
            this._openDialogs.splice(index, 1);
            // no open dialogs are left, call next on afterAllClosed Subject
            if (!this._openDialogs.length) {
                document.removeEventListener('keydown', this._boundKeydown);
            }
        }
        return Promise.resolve(this);
    };
    /** Removes the panel from the DOM. */
    /**
     * Removes the panel from the DOM.
     * @return {?}
     */
    Md2Dialog.prototype.destroyPanel = /**
     * Removes the panel from the DOM.
     * @return {?}
     */
    function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    };
    /**
     * @return {?}
     */
    Md2Dialog.prototype._onPanelDone = /**
     * @return {?}
     */
    function () {
        if (this._panelOpen) {
            this.onOpen.emit(this);
        }
        else {
            this.onClose.emit(this);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Dialog.prototype._handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var topDialog = this._openDialogs[this._openDialogs.length - 1];
        if (event.keyCode === ESCAPE && topDialog &&
            !topDialog.config.disableClose) {
            topDialog.close();
        }
    };
    /**
     * @return {?}
     */
    Md2Dialog.prototype._subscribeToBackdrop = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.config.disableClose) {
            this._backdropSubscription = this._overlayRef.backdropClick().pipe(first()).subscribe(function () {
                return _this.close();
            });
        }
    };
    /**
     * @return {?}
     */
    Md2Dialog.prototype._createOverlay = /**
     * @return {?}
     */
    function () {
        if (!this._overlayRef) {
            /** @type {?} */
            var config = new OverlayState();
            config.positionStrategy = this._overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically();
            config.hasBackdrop = true;
            this._overlayRef = this._overlay.create(config);
        }
    };
    /**
     * @return {?}
     */
    Md2Dialog.prototype._cleanUpSubscriptions = /**
     * @return {?}
     */
    function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
    };
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
    Md2Dialog.ctorParameters = function () { return [
        { type: Overlay },
        { type: Md2Dialog, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    Md2Dialog.propDecorators = {
        onOpen: [{ type: Output }],
        onClose: [{ type: Output }],
        _portal: [{ type: ViewChild, args: [Md2DialogPortal,] }],
        dialogTitle: [{ type: Input, args: ['title',] }]
    };
    return Md2Dialog;
}());
export { Md2Dialog };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvZGlhbG9nL2RpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLEtBQUssRUFDTCxZQUFZLEVBQ1osUUFBUSxFQUNSLFFBQVEsRUFDUixTQUFTLEVBQ1QsaUJBQWlCLEVBRWpCLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxLQUFLLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUNMLE1BQU0sRUFDTixPQUFPLEVBQ1AsWUFBWSxFQUVaLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFMUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBS3ZDLElBQUE7O29CQUNzQixRQUFROzRCQUNILEtBQUs7OzBCQXJDaEM7SUFzQ0MsQ0FBQTtBQUhELDJCQUdDOzs7Ozs7OztJQUdvQywyQ0FBdUI7SUFDMUQseUJBQVksV0FBNkIsRUFBRSxnQkFBa0M7ZUFDM0Usa0JBQU0sV0FBVyxFQUFFLGdCQUFnQixDQUFDO0tBQ3JDOztnQkFKRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7Ozs7Z0JBNUIxQyxXQUFXO2dCQURYLGdCQUFnQjs7MEJBWGxCO0VBeUNxQyx1QkFBdUI7U0FBL0MsZUFBZTs7Ozs7Ozs7Z0JBUzNCLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRTs7eUJBbEQzQzs7U0FtRGEsY0FBYzs7Ozs7Ozs7Z0JBSzFCLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFB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QUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsV0FBVzs7aUJBQ3RCOzs7O2dCQWhFQyxPQUFPO2dCQThFMEMsU0FBUyx1QkFBdkQsUUFBUSxZQUFJLFFBQVE7Ozt5QkFFdEIsTUFBTTswQkFDTixNQUFNOzBCQUdOLFNBQVMsU0FBQyxlQUFlOzhCQUV6QixLQUFLLFNBQUMsT0FBTzs7b0JBN0doQjs7U0F3RmEsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFJdEIsOEJBQThCLFlBQTZCO0lBQ3pELE9BQU8sWUFBWSxDQUFDLElBQUksZUFBZSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Q0FDMUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE91dHB1dCxcbiAgSW5wdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBPbkRlc3Ryb3ksXG4gIERpcmVjdGl2ZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgc3R5bGUsXG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICB0cmFuc2l0aW9uLFxuICBhbmltYXRlLFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIEVTQ0FQRSxcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheVN0YXRlLFxuICBPdmVybGF5UmVmLFxuICBUZW1wbGF0ZVBvcnRhbERpcmVjdGl2ZVxufSBmcm9tICcuLi9jb3JlL2luZGV4JztcbmltcG9ydCB7IGV4dGVuZE9iamVjdCB9IGZyb20gJy4uL2NvcmUvdXRpbC9vYmplY3QtZXh0ZW5kJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCB0eXBlIERpYWxvZ1Zpc2liaWxpdHkgPSAnaW5pdGlhbCcgfCAndmlzaWJsZScgfCAnaGlkZGVuJztcbmV4cG9ydCB0eXBlIERpYWxvZ1JvbGUgPSAnZGlhbG9nJyB8ICdhbGVydGRpYWxvZyc7XG5cbmV4cG9ydCBjbGFzcyBNZDJEaWFsb2dDb25maWcge1xuICByb2xlPzogRGlhbG9nUm9sZSA9ICdkaWFsb2cnO1xuICBkaXNhYmxlQ2xvc2U/OiBib29sZWFuID0gZmFsc2U7XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1ttZDJEaWFsb2dQb3J0YWxdJyB9KVxuZXhwb3J0IGNsYXNzIE1kMkRpYWxvZ1BvcnRhbCBleHRlbmRzIFRlbXBsYXRlUG9ydGFsRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IodGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcih0ZW1wbGF0ZVJlZiwgdmlld0NvbnRhaW5lclJlZik7XG4gIH1cbn1cblxuLyoqXG4gKiBUaXRsZSBvZiBhIGRpYWxvZyBlbGVtZW50LiBTdGF5cyBmaXhlZCB0byB0aGUgdG9wIG9mIHRoZSBkaWFsb2cgd2hlbiBzY3JvbGxpbmcuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ21kMi1kaWFsb2ctdGl0bGUnIH0pXG5leHBvcnQgY2xhc3MgTWQyRGlhbG9nVGl0bGUgeyB9XG5cbi8qKlxuICogU2Nyb2xsYWJsZSBjb250ZW50IGNvbnRhaW5lciBvZiBhIGRpYWxvZy5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbWQyLWRpYWxvZy1jb250ZW50JyB9KVxuZXhwb3J0IGNsYXNzIE1kMkRpYWxvZ0NvbnRlbnQgeyB9XG5cbi8qKlxuICogQ29udGFpbmVyIGZvciB0aGUgYm90dG9tIGFjdGlvbiBidXR0b25zIGluIGEgZGlhbG9nLlxuICogU3RheXMgZml4ZWQgdG8gdGhlIGJvdHRvbSB3aGVuIHNjcm9sbGluZy5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbWQyLWRpYWxvZy1mb290ZXIsIG1kMi1kaWFsb2ctYWN0aW9ucycgfSlcbmV4cG9ydCBjbGFzcyBNZDJEaWFsb2dBY3Rpb25zIHsgfVxuXG5AQ29tcG9uZW50KHtcbiAgXG4gIHNlbGVjdG9yOiAnbWQyLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnZGlhbG9nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZGlhbG9nLnNjc3MnXSxcbiAgaG9zdDoge1xuICAgICd0YWJpbmRleCc6ICcwJyxcbiAgICAnW2F0dHIucm9sZV0nOiAnY29uZmlnPy5yb2xlJyxcbiAgfSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3N0YXRlJywgW1xuICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDAuMyknIH0pKSxcbiAgICAgIHN0YXRlKCdpbml0aWFsJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgwLjMpJyB9KSksXG4gICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMSknIH0pKSxcbiAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDAuMyknIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gdmlzaWJsZScsIGFuaW1hdGUoJzE1MG1zIGN1YmljLWJlemllcigwLjAsIDAuMCwgMC4yLCAxKScpKSxcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gaGlkZGVuJywgYW5pbWF0ZSgnMTUwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAxLCAxKScpKSxcbiAgICBdKVxuICBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21kMkRpYWxvZydcbn0pXG5leHBvcnQgY2xhc3MgTWQyRGlhbG9nIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9vcGVuRGlhbG9nc0F0VGhpc0xldmVsOiBBcnJheTxhbnk+ID0gW107XG4gIHByaXZhdGUgX2JvdW5kS2V5ZG93biA9IHRoaXMuX2hhbmRsZUtleWRvd24uYmluZCh0aGlzKTtcbiAgcHJpdmF0ZSBfcGFuZWxPcGVuID0gZmFsc2U7XG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWYgPSBudWxsO1xuICBwcml2YXRlIF9iYWNrZHJvcFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBjb25maWc6IE1kMkRpYWxvZ0NvbmZpZztcblxuICAvKiogUHJvcGVydHkgd2F0Y2hlZCBieSB0aGUgYW5pbWF0aW9uIGZyYW1ld29yayB0byBzaG93IG9yIGhpZGUgdGhlIGRpYWxvZyAqL1xuICBfdmlzaWJpbGl0eTogRGlhbG9nVmlzaWJpbGl0eSA9ICdpbml0aWFsJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHByaXZhdGUgX3BhcmVudERpYWxvZzogTWQyRGlhbG9nKSB7IH1cblxuICBAT3V0cHV0KCkgb25PcGVuOiBFdmVudEVtaXR0ZXI8TWQyRGlhbG9nPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWQyRGlhbG9nPigpO1xuICBAT3V0cHV0KCkgb25DbG9zZTogRXZlbnRFbWl0dGVyPE1kMkRpYWxvZz4gPSBuZXcgRXZlbnRFbWl0dGVyPE1kMkRpYWxvZz4oKTtcblxuICAvKiogVGhlIHBvcnRhbCB0byBzZW5kIHRoZSBkaWFsb2cgY29udGVudCB0aHJvdWdoICovXG4gIEBWaWV3Q2hpbGQoTWQyRGlhbG9nUG9ydGFsKSBfcG9ydGFsOiBNZDJEaWFsb2dQb3J0YWw7XG5cbiAgQElucHV0KCd0aXRsZScpIGRpYWxvZ1RpdGxlOiBzdHJpbmc7XG5cbiAgbmdPbkRlc3Ryb3koKSB7IHRoaXMuZGVzdHJveVBhbmVsKCk7IH1cblxuICBnZXQgX29wZW5EaWFsb2dzKCk6IEFycmF5PGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnREaWFsb2cgPyB0aGlzLl9wYXJlbnREaWFsb2cuX29wZW5EaWFsb2dzIDogdGhpcy5fb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbDtcbiAgfVxuXG4gIC8qKiBPcGVuIHRoZSBkaWFsb2cgKi9cbiAgb3Blbihjb25maWc/OiBNZDJEaWFsb2dDb25maWcpOiBQcm9taXNlPE1kMkRpYWxvZz4ge1xuICAgIHRoaXMuY29uZmlnID0gX2FwcGx5Q29uZmlnRGVmYXVsdHMoY29uZmlnKTtcbiAgICBpZiAodGhpcy5fcGFuZWxPcGVuKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlPE1kMkRpYWxvZz4odGhpcyk7XG4gICAgfVxuICAgIHRoaXMuX2NyZWF0ZU92ZXJsYXkoKTtcbiAgICB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaCh0aGlzLl9wb3J0YWwpO1xuICAgIHRoaXMuX3N1YnNjcmliZVRvQmFja2Ryb3AoKTtcblxuICAgIGlmICghdGhpcy5fb3BlbkRpYWxvZ3MubGVuZ3RoICYmICF0aGlzLl9wYXJlbnREaWFsb2cpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9ib3VuZEtleWRvd24pO1xuICAgIH1cblxuICAgIHRoaXMuX29wZW5EaWFsb2dzLnB1c2godGhpcyk7XG4gICAgdGhpcy5fcGFuZWxPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLl92aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmU8TWQyRGlhbG9nPih0aGlzKTtcbiAgfVxuXG4gIC8qKiBDbG9zZSB0aGUgZGlhbG9nICovXG4gIGNsb3NlKCk6IFByb21pc2U8TWQyRGlhbG9nPiB7XG4gICAgdGhpcy5fdmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIHRoaXMuX3BhbmVsT3BlbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgaWYgKHRoaXMuX2JhY2tkcm9wU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGluZGV4ID0gdGhpcy5fb3BlbkRpYWxvZ3MuaW5kZXhPZih0aGlzKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLl9vcGVuRGlhbG9ncy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAvLyBubyBvcGVuIGRpYWxvZ3MgYXJlIGxlZnQsIGNhbGwgbmV4dCBvbiBhZnRlckFsbENsb3NlZCBTdWJqZWN0XG4gICAgICBpZiAoIXRoaXMuX29wZW5EaWFsb2dzLmxlbmd0aCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fYm91bmRLZXlkb3duKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZTxNZDJEaWFsb2c+KHRoaXMpO1xuICB9XG5cbiAgLyoqIFJlbW92ZXMgdGhlIHBhbmVsIGZyb20gdGhlIERPTS4gKi9cbiAgZGVzdHJveVBhbmVsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSBudWxsO1xuXG4gICAgICB0aGlzLl9jbGVhblVwU3Vic2NyaXB0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIF9vblBhbmVsRG9uZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLm9uT3Blbi5lbWl0KHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGxldCB0b3BEaWFsb2cgPSB0aGlzLl9vcGVuRGlhbG9nc1t0aGlzLl9vcGVuRGlhbG9ncy5sZW5ndGggLSAxXTtcblxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdG9wRGlhbG9nICYmXG4gICAgICAhdG9wRGlhbG9nLmNvbmZpZy5kaXNhYmxlQ2xvc2UpIHtcbiAgICAgIHRvcERpYWxvZy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvQmFja2Ryb3AoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5kaXNhYmxlQ2xvc2UpIHtcbiAgICAgIHRoaXMuX2JhY2tkcm9wU3Vic2NyaXB0aW9uID0gdGhpcy5fb3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgdGhpcy5jbG9zZSgpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgbGV0IGNvbmZpZyA9IG5ldyBPdmVybGF5U3RhdGUoKTtcbiAgICAgIGNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgIC5nbG9iYWwoKVxuICAgICAgICAuY2VudGVySG9yaXpvbnRhbGx5KClcbiAgICAgICAgLmNlbnRlclZlcnRpY2FsbHkoKTtcbiAgICAgIGNvbmZpZy5oYXNCYWNrZHJvcCA9IHRydWU7XG5cbiAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZShjb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NsZWFuVXBTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9iYWNrZHJvcFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fYmFja2Ryb3BTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxufVxuXG4vKipcbiAqIEFwcGxpZXMgZGVmYXVsdCBvcHRpb25zIHRvIHRoZSBkaWFsb2cgY29uZmlnLlxuICogQHBhcmFtIGRpYWxvZ0NvbmZpZyBDb25maWcgdG8gYmUgbW9kaWZpZWQuXG4gKiBAcmV0dXJucyBUaGUgbmV3IGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBfYXBwbHlDb25maWdEZWZhdWx0cyhkaWFsb2dDb25maWc6IE1kMkRpYWxvZ0NvbmZpZyk6IE1kMkRpYWxvZ0NvbmZpZyB7XG4gIHJldHVybiBleHRlbmRPYmplY3QobmV3IE1kMkRpYWxvZ0NvbmZpZygpLCBkaWFsb2dDb25maWcpO1xufVxuIl19