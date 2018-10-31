/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Injectable, ViewEncapsulation, } from '@angular/core';
import { Overlay, OverlayState, ComponentPortal, } from '../core/index';
export class Toast {
    /**
     * @param {?} message
     */
    constructor(message) {
        this.message = message;
    }
}
if (false) {
    /** @type {?} */
    Toast.prototype.id;
    /** @type {?} */
    Toast.prototype.isVisible;
    /** @type {?} */
    Toast.prototype.message;
}
export class Md2ToastConfig {
    constructor() {
        this.duration = 3000;
        this.viewContainerRef = null;
    }
}
if (false) {
    /** @type {?} */
    Md2ToastConfig.prototype.duration;
    /** @type {?} */
    Md2ToastConfig.prototype.viewContainerRef;
}
export class Md2Toast {
    /**
     * @param {?} _overlay
     * @param {?} _config
     */
    constructor(_overlay, _config) {
        this._overlay = _overlay;
        this._config = _config;
        this.index = 0;
    }
    /**
     * toast message
     * @param {?} message
     * @param {?=} duration
     * @return {?}
     */
    toast(message, duration) {
        this.show(message, duration);
    }
    /**
     * show toast
     * @param {?} message
     * @param {?=} duration
     * @return {?}
     */
    show(message, duration) {
        if (!message || !message.trim()) {
            return;
        }
        if (duration) {
            this._config.duration = duration;
        }
        /** @type {?} */
        let toast;
        toast = new Toast(message);
        if (toast) {
            if (!this._toastInstance) {
                this._createToast();
            }
            this._setToastMessage(toast);
        }
    }
    /**
     * Create the toast to display
     * @return {?}
     */
    _createToast() {
        this._createOverlay();
        /** @type {?} */
        let portal = new ComponentPortal(Md2ToastComponent, this._config.viewContainerRef);
        this._toastInstance = this._overlayRef.attach(portal).instance;
    }
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    _createOverlay() {
        if (!this._overlayRef) {
            /** @type {?} */
            let config = new OverlayState();
            config.positionStrategy = this._overlay.position()
                .global()
                .top('0').right('0');
            this._overlayRef = this._overlay.create(config);
        }
    }
    /**
     * Disposes the current toast and the overlay it is attached to
     * @return {?}
     */
    _disposeToast() {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._toastInstance = null;
    }
    /**
     * Updates the toast message and repositions the overlay according to the new message length
     * @param {?} toast
     * @return {?}
     */
    _setToastMessage(toast) {
        toast.id = ++this.index;
        this._toastInstance.addToast(toast);
        setTimeout(() => {
            this.clearToast(toast.id);
        }, this._config.duration);
    }
    /**
     * clear specific toast
     * @param {?} toastId
     * @return {?}
     */
    clearToast(toastId) {
        if (this._toastInstance) {
            this._toastInstance.removeToast(toastId);
            setTimeout(() => {
                if (!this._toastInstance.hasToast()) {
                    this._disposeToast();
                }
            }, 250);
        }
    }
    /**
     * clear all toasts
     * @return {?}
     */
    clearAllToasts() {
        if (this._toastInstance) {
            this._toastInstance.removeAllToasts();
            setTimeout(() => {
                if (!this._toastInstance.hasToast()) {
                    this._disposeToast();
                }
            }, 250);
        }
    }
}
Md2Toast.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Md2Toast.ctorParameters = () => [
    { type: Overlay },
    { type: Md2ToastConfig }
];
if (false) {
    /** @type {?} */
    Md2Toast.prototype.index;
    /** @type {?} */
    Md2Toast.prototype._overlayRef;
    /** @type {?} */
    Md2Toast.prototype._toastInstance;
    /** @type {?} */
    Md2Toast.prototype._overlay;
    /** @type {?} */
    Md2Toast.prototype._config;
}
export class Md2ToastComponent {
    constructor() {
        this.toasts = [];
        this.maxShown = 5;
    }
    /**
     * add toast
     * @param {?} toast toast object with all parameters
     * @return {?}
     */
    addToast(toast) {
        setTimeout(() => {
            toast.isVisible = true;
        }, 1);
        this.toasts.push(toast);
        if (this.toasts.length > this.maxShown) {
            this.toasts[0].isVisible = false;
            setTimeout(() => {
                this.toasts.splice(0, (this.toasts.length - this.maxShown));
            }, 250);
        }
    }
    /**
     * remove toast
     * @param {?} toastId number of toast id
     * @return {?}
     */
    removeToast(toastId) {
        this.toasts.forEach((t) => { if (t.id === toastId) {
            t.isVisible = false;
        } });
        setTimeout(() => {
            this.toasts = this.toasts.filter((toast) => { return toast.id !== toastId; });
        }, 250);
    }
    /**
     * remove all toasts
     * @return {?}
     */
    removeAllToasts() {
        this.toasts.forEach((t) => { t.isVisible = false; });
        setTimeout(() => {
            this.toasts = [];
        }, 250);
    }
    /**
     * check has any toast
     * @return {?} boolean
     */
    hasToast() { return this.toasts.length > 0; }
}
Md2ToastComponent.decorators = [
    { type: Component, args: [{
                selector: 'md2-toast',
                template: "<div *ngFor=\"let toast of toasts\"\n     class=\"md2-toast\"\n     [class.in]=\"toast.isVisible\"\n     (click)=\"removeToast(toast.id)\"\n     [innerHTML]=\"toast.message\">\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                styles: ["md2-toast{display:block;box-sizing:border-box;cursor:default;overflow:hidden;min-width:304px;max-width:100%;padding:8px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md2-toast{position:relative;padding:14px 24px;margin-bottom:5px;display:block;margin-top:-53px;opacity:0;background-color:#323232;color:#fafafa;box-shadow:0 2px 5px 0 rgba(0,0,0,.26);border-radius:2px;font-size:14px;overflow:hidden;word-wrap:break-word;transition:250ms linear}.md2-toast.in{margin-top:0;opacity:1}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;text-transform:none;width:1px}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}"]
            }] }
];
if (false) {
    /** @type {?} */
    Md2ToastComponent.prototype.toasts;
    /** @type {?} */
    Md2ToastComponent.prototype.maxShown;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi90b2FzdC90b2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBRVYsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsWUFBWSxFQUVaLGVBQWUsR0FDaEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsTUFBTTs7OztJQUdKLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO0tBQUs7Q0FDeEM7Ozs7Ozs7OztBQUVELE1BQU07O3dCQUNlLElBQUk7Z0NBQ2UsSUFBSTs7Q0FDM0M7Ozs7Ozs7QUFHRCxNQUFNOzs7OztJQU1KLFlBQW9CLFFBQWlCLEVBQVUsT0FBdUI7UUFBbEQsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWdCO3FCQUw5QyxDQUFDO0tBS2tEOzs7Ozs7O0lBTTNFLEtBQUssQ0FBQyxPQUFlLEVBQUUsUUFBaUI7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDOUI7Ozs7Ozs7SUFNRCxJQUFJLENBQUMsT0FBZSxFQUFFLFFBQWlCO1FBQ3JDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFNUMsSUFBSSxRQUFRLEVBQUU7WUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FBRTs7UUFFbkQsSUFBSSxLQUFLLENBQVE7UUFDakIsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTNCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxZQUFZ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RXpCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5qZWN0YWJsZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheVN0YXRlLFxuICBPdmVybGF5UmVmLFxuICBDb21wb25lbnRQb3J0YWwsXG59IGZyb20gJy4uL2NvcmUvaW5kZXgnO1xuXG5leHBvcnQgY2xhc3MgVG9hc3Qge1xuICBpZDogbnVtYmVyO1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgTWQyVG9hc3RDb25maWcge1xuICBkdXJhdGlvbjogbnVtYmVyID0gMzAwMDtcbiAgdmlld0NvbnRhaW5lclJlZj86IFZpZXdDb250YWluZXJSZWYgPSBudWxsO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWQyVG9hc3Qge1xuICBwcml2YXRlIGluZGV4OiBudW1iZXIgPSAwO1xuXG4gIF9vdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuICBfdG9hc3RJbnN0YW5jZTogTWQyVG9hc3RDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSwgcHJpdmF0ZSBfY29uZmlnOiBNZDJUb2FzdENvbmZpZykgeyB9XG5cbiAgLyoqXG4gICAqIHRvYXN0IG1lc3NhZ2VcbiAgICogQHBhcmFtIHRvYXN0IHN0cmluZyBvciBvYmplY3Qgd2l0aCBtZXNzYWdlIGFuZCBvdGhlciBwcm9wZXJ0aWVzIG9mIHRvYXN0XG4gICAqL1xuICB0b2FzdChtZXNzYWdlOiBzdHJpbmcsIGR1cmF0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5zaG93KG1lc3NhZ2UsIGR1cmF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaG93IHRvYXN0XG4gICAqIEBwYXJhbSB0b2FzdE9iaiBzdHJpbmcgb3Igb2JqZWN0IHdpdGggbWVzc2FnZSBhbmQgb3RoZXIgcHJvcGVydGllcyBvZiB0b2FzdFxuICAgKi9cbiAgc2hvdyhtZXNzYWdlOiBzdHJpbmcsIGR1cmF0aW9uPzogbnVtYmVyKSB7XG4gICAgaWYgKCFtZXNzYWdlIHx8ICFtZXNzYWdlLnRyaW0oKSkgeyByZXR1cm47IH1cblxuICAgIGlmIChkdXJhdGlvbikgeyB0aGlzLl9jb25maWcuZHVyYXRpb24gPSBkdXJhdGlvbjsgfVxuXG4gICAgbGV0IHRvYXN0OiBUb2FzdDtcbiAgICB0b2FzdCA9IG5ldyBUb2FzdChtZXNzYWdlKTtcblxuICAgIGlmICh0b2FzdCkge1xuICAgICAgaWYgKCF0aGlzLl90b2FzdEluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVRvYXN0KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldFRvYXN0TWVzc2FnZSh0b2FzdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIENyZWF0ZSB0aGUgdG9hc3QgdG8gZGlzcGxheSAqL1xuICBwcml2YXRlIF9jcmVhdGVUb2FzdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jcmVhdGVPdmVybGF5KCk7XG4gICAgbGV0IHBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoTWQyVG9hc3RDb21wb25lbnQsIHRoaXMuX2NvbmZpZy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICB0aGlzLl90b2FzdEluc3RhbmNlID0gdGhpcy5fb3ZlcmxheVJlZi5hdHRhY2gocG9ydGFsKS5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKiBDcmVhdGUgdGhlIG92ZXJsYXkgY29uZmlnIGFuZCBwb3NpdGlvbiBzdHJhdGVneSAqL1xuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgbGV0IGNvbmZpZyA9IG5ldyBPdmVybGF5U3RhdGUoKTtcbiAgICAgIGNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgIC5nbG9iYWwoKVxuICAgICAgICAudG9wKCcwJykucmlnaHQoJzAnKTtcblxuICAgICAgdGhpcy5fb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIERpc3Bvc2VzIHRoZSBjdXJyZW50IHRvYXN0IGFuZCB0aGUgb3ZlcmxheSBpdCBpcyBhdHRhY2hlZCB0byAqL1xuICBwcml2YXRlIF9kaXNwb3NlVG9hc3QoKTogdm9pZCB7XG4gICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgdGhpcy5fb3ZlcmxheVJlZiA9IG51bGw7XG4gICAgdGhpcy5fdG9hc3RJbnN0YW5jZSA9IG51bGw7XG4gIH1cblxuICAvKiogVXBkYXRlcyB0aGUgdG9hc3QgbWVzc2FnZSBhbmQgcmVwb3NpdGlvbnMgdGhlIG92ZXJsYXkgYWNjb3JkaW5nIHRvIHRoZSBuZXcgbWVzc2FnZSBsZW5ndGggKi9cbiAgcHJpdmF0ZSBfc2V0VG9hc3RNZXNzYWdlKHRvYXN0OiBUb2FzdCkge1xuICAgIHRvYXN0LmlkID0gKyt0aGlzLmluZGV4O1xuICAgIHRoaXMuX3RvYXN0SW5zdGFuY2UuYWRkVG9hc3QodG9hc3QpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbGVhclRvYXN0KHRvYXN0LmlkKTtcbiAgICB9LCB0aGlzLl9jb25maWcuZHVyYXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNsZWFyIHNwZWNpZmljIHRvYXN0XG4gICAqIEBwYXJhbSB0b2FzdElkXG4gICAqL1xuICBwcml2YXRlIGNsZWFyVG9hc3QodG9hc3RJZDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3RvYXN0SW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX3RvYXN0SW5zdGFuY2UucmVtb3ZlVG9hc3QodG9hc3RJZCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLl90b2FzdEluc3RhbmNlLmhhc1RvYXN0KCkpIHsgdGhpcy5fZGlzcG9zZVRvYXN0KCk7IH1cbiAgICAgIH0sIDI1MCk7XG5cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2xlYXIgYWxsIHRvYXN0c1xuICAgKi9cbiAgY2xlYXJBbGxUb2FzdHMoKSB7XG4gICAgaWYgKHRoaXMuX3RvYXN0SW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX3RvYXN0SW5zdGFuY2UucmVtb3ZlQWxsVG9hc3RzKCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLl90b2FzdEluc3RhbmNlLmhhc1RvYXN0KCkpIHsgdGhpcy5fZGlzcG9zZVRvYXN0KCk7IH1cbiAgICAgIH0sIDI1MCk7XG5cbiAgICB9XG4gIH1cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZDItdG9hc3QnLFxuICB0ZW1wbGF0ZVVybDogJ3RvYXN0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsndG9hc3Quc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNZDJUb2FzdENvbXBvbmVudCB7XG4gIHRvYXN0czogVG9hc3RbXSA9IFtdO1xuICBtYXhTaG93biA9IDU7XG5cbiAgLyoqXG4gICAqIGFkZCB0b2FzdFxuICAgKiBAcGFyYW0gdG9hc3QgdG9hc3Qgb2JqZWN0IHdpdGggYWxsIHBhcmFtZXRlcnNcbiAgICovXG4gIGFkZFRvYXN0KHRvYXN0OiBUb2FzdCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdG9hc3QuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9LCAxKTtcbiAgICB0aGlzLnRvYXN0cy5wdXNoKHRvYXN0KTtcbiAgICBpZiAodGhpcy50b2FzdHMubGVuZ3RoID4gdGhpcy5tYXhTaG93bikge1xuICAgICAgdGhpcy50b2FzdHNbMF0uaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy50b2FzdHMuc3BsaWNlKDAsICh0aGlzLnRvYXN0cy5sZW5ndGggLSB0aGlzLm1heFNob3duKSk7XG4gICAgICB9LCAyNTApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdG9hc3RcbiAgICogQHBhcmFtIHRvYXN0SWQgbnVtYmVyIG9mIHRvYXN0IGlkXG4gICAqL1xuICByZW1vdmVUb2FzdCh0b2FzdElkOiBudW1iZXIpIHtcbiAgICB0aGlzLnRvYXN0cy5mb3JFYWNoKCh0OiBhbnkpID0+IHsgaWYgKHQuaWQgPT09IHRvYXN0SWQpIHsgdC5pc1Zpc2libGUgPSBmYWxzZTsgfSB9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudG9hc3RzID0gdGhpcy50b2FzdHMuZmlsdGVyKCh0b2FzdCkgPT4geyByZXR1cm4gdG9hc3QuaWQgIT09IHRvYXN0SWQ7IH0pO1xuICAgIH0sIDI1MCk7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIGFsbCB0b2FzdHNcbiAgICogQHBhcmFtIHRvYXN0SWQgbnVtYmVyIG9mIHRvYXN0IGlkXG4gICAqL1xuICByZW1vdmVBbGxUb2FzdHMoKSB7XG4gICAgdGhpcy50b2FzdHMuZm9yRWFjaCgodDogYW55KSA9PiB7IHQuaXNWaXNpYmxlID0gZmFsc2U7IH0pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50b2FzdHMgPSBbXTtcbiAgICB9LCAyNTApO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIGhhcyBhbnkgdG9hc3RcbiAgICogQHJldHVybiBib29sZWFuXG4gICAqL1xuICBoYXNUb2FzdCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMudG9hc3RzLmxlbmd0aCA+IDA7IH1cblxufVxuIl19