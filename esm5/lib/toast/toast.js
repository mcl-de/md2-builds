/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Injectable, ViewEncapsulation, } from '@angular/core';
import { Overlay, OverlayState, ComponentPortal, } from '../core/index';
var Toast = /** @class */ (function () {
    function Toast(message) {
        this.message = message;
    }
    return Toast;
}());
export { Toast };
if (false) {
    /** @type {?} */
    Toast.prototype.id;
    /** @type {?} */
    Toast.prototype.isVisible;
    /** @type {?} */
    Toast.prototype.message;
}
var Md2ToastConfig = /** @class */ (function () {
    function Md2ToastConfig() {
        this.duration = 3000;
        this.viewContainerRef = null;
    }
    return Md2ToastConfig;
}());
export { Md2ToastConfig };
if (false) {
    /** @type {?} */
    Md2ToastConfig.prototype.duration;
    /** @type {?} */
    Md2ToastConfig.prototype.viewContainerRef;
}
var Md2Toast = /** @class */ (function () {
    function Md2Toast(_overlay, _config) {
        this._overlay = _overlay;
        this._config = _config;
        this.index = 0;
    }
    /**
     * toast message
     * @param toast string or object with message and other properties of toast
     */
    /**
     * toast message
     * @param {?} message
     * @param {?=} duration
     * @return {?}
     */
    Md2Toast.prototype.toast = /**
     * toast message
     * @param {?} message
     * @param {?=} duration
     * @return {?}
     */
    function (message, duration) {
        this.show(message, duration);
    };
    /**
     * show toast
     * @param toastObj string or object with message and other properties of toast
     */
    /**
     * show toast
     * @param {?} message
     * @param {?=} duration
     * @return {?}
     */
    Md2Toast.prototype.show = /**
     * show toast
     * @param {?} message
     * @param {?=} duration
     * @return {?}
     */
    function (message, duration) {
        if (!message || !message.trim()) {
            return;
        }
        if (duration) {
            this._config.duration = duration;
        }
        /** @type {?} */
        var toast;
        toast = new Toast(message);
        if (toast) {
            if (!this._toastInstance) {
                this._createToast();
            }
            this._setToastMessage(toast);
        }
    };
    /**
     * Create the toast to display
     * @return {?}
     */
    Md2Toast.prototype._createToast = /**
     * Create the toast to display
     * @return {?}
     */
    function () {
        this._createOverlay();
        /** @type {?} */
        var portal = new ComponentPortal(Md2ToastComponent, this._config.viewContainerRef);
        this._toastInstance = this._overlayRef.attach(portal).instance;
    };
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    Md2Toast.prototype._createOverlay = /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    function () {
        if (!this._overlayRef) {
            /** @type {?} */
            var config = new OverlayState();
            config.positionStrategy = this._overlay.position()
                .global()
                .top('0').right('0');
            this._overlayRef = this._overlay.create(config);
        }
    };
    /**
     * Disposes the current toast and the overlay it is attached to
     * @return {?}
     */
    Md2Toast.prototype._disposeToast = /**
     * Disposes the current toast and the overlay it is attached to
     * @return {?}
     */
    function () {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._toastInstance = null;
    };
    /**
     * Updates the toast message and repositions the overlay according to the new message length
     * @param {?} toast
     * @return {?}
     */
    Md2Toast.prototype._setToastMessage = /**
     * Updates the toast message and repositions the overlay according to the new message length
     * @param {?} toast
     * @return {?}
     */
    function (toast) {
        var _this = this;
        toast.id = ++this.index;
        this._toastInstance.addToast(toast);
        setTimeout(function () {
            _this.clearToast(toast.id);
        }, this._config.duration);
    };
    /**
     * clear specific toast
     * @param {?} toastId
     * @return {?}
     */
    Md2Toast.prototype.clearToast = /**
     * clear specific toast
     * @param {?} toastId
     * @return {?}
     */
    function (toastId) {
        var _this = this;
        if (this._toastInstance) {
            this._toastInstance.removeToast(toastId);
            setTimeout(function () {
                if (!_this._toastInstance.hasToast()) {
                    _this._disposeToast();
                }
            }, 250);
        }
    };
    /**
     * clear all toasts
     */
    /**
     * clear all toasts
     * @return {?}
     */
    Md2Toast.prototype.clearAllToasts = /**
     * clear all toasts
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._toastInstance) {
            this._toastInstance.removeAllToasts();
            setTimeout(function () {
                if (!_this._toastInstance.hasToast()) {
                    _this._disposeToast();
                }
            }, 250);
        }
    };
    Md2Toast.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Md2Toast.ctorParameters = function () { return [
        { type: Overlay },
        { type: Md2ToastConfig }
    ]; };
    return Md2Toast;
}());
export { Md2Toast };
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
var Md2ToastComponent = /** @class */ (function () {
    function Md2ToastComponent() {
        this.toasts = [];
        this.maxShown = 5;
    }
    /**
     * add toast
     * @param toast toast object with all parameters
     */
    /**
     * add toast
     * @param {?} toast toast object with all parameters
     * @return {?}
     */
    Md2ToastComponent.prototype.addToast = /**
     * add toast
     * @param {?} toast toast object with all parameters
     * @return {?}
     */
    function (toast) {
        var _this = this;
        setTimeout(function () {
            toast.isVisible = true;
        }, 1);
        this.toasts.push(toast);
        if (this.toasts.length > this.maxShown) {
            this.toasts[0].isVisible = false;
            setTimeout(function () {
                _this.toasts.splice(0, (_this.toasts.length - _this.maxShown));
            }, 250);
        }
    };
    /**
     * remove toast
     * @param toastId number of toast id
     */
    /**
     * remove toast
     * @param {?} toastId number of toast id
     * @return {?}
     */
    Md2ToastComponent.prototype.removeToast = /**
     * remove toast
     * @param {?} toastId number of toast id
     * @return {?}
     */
    function (toastId) {
        var _this = this;
        this.toasts.forEach(function (t) { if (t.id === toastId) {
            t.isVisible = false;
        } });
        setTimeout(function () {
            _this.toasts = _this.toasts.filter(function (toast) { return toast.id !== toastId; });
        }, 250);
    };
    /**
     * remove all toasts
     * @param toastId number of toast id
     */
    /**
     * remove all toasts
     * @return {?}
     */
    Md2ToastComponent.prototype.removeAllToasts = /**
     * remove all toasts
     * @return {?}
     */
    function () {
        var _this = this;
        this.toasts.forEach(function (t) { t.isVisible = false; });
        setTimeout(function () {
            _this.toasts = [];
        }, 250);
    };
    /**
     * check has any toast
     * @return boolean
     */
    /**
     * check has any toast
     * @return {?} boolean
     */
    Md2ToastComponent.prototype.hasToast = /**
     * check has any toast
     * @return {?} boolean
     */
    function () { return this.toasts.length > 0; };
    Md2ToastComponent.decorators = [
        { type: Component, args: [{
                    selector: 'md2-toast',
                    template: "<div *ngFor=\"let toast of toasts\"\n     class=\"md2-toast\"\n     [class.in]=\"toast.isVisible\"\n     (click)=\"removeToast(toast.id)\"\n     [innerHTML]=\"toast.message\">\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["md2-toast{display:block;box-sizing:border-box;cursor:default;overflow:hidden;min-width:304px;max-width:100%;padding:8px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md2-toast{position:relative;padding:14px 24px;margin-bottom:5px;display:block;margin-top:-53px;opacity:0;background-color:#323232;color:#fafafa;box-shadow:0 2px 5px 0 rgba(0,0,0,.26);border-radius:2px;font-size:14px;overflow:hidden;word-wrap:break-word;transition:250ms linear}.md2-toast.in{margin-top:0;opacity:1}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;text-transform:none;width:1px}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}"]
                }] }
    ];
    return Md2ToastComponent;
}());
export { Md2ToastComponent };
if (false) {
    /** @type {?} */
    Md2ToastComponent.prototype.toasts;
    /** @type {?} */
    Md2ToastComponent.prototype.maxShown;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi90b2FzdC90b2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBRVYsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsWUFBWSxFQUVaLGVBQWUsR0FDaEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsSUFBQTtJQUdFLGVBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO0tBQUs7Z0JBaEJ6QztJQWlCQyxDQUFBO0FBSkQsaUJBSUM7Ozs7Ozs7OztBQUVELElBQUE7O3dCQUNxQixJQUFJO2dDQUNlLElBQUk7O3lCQXJCNUM7SUFzQkMsQ0FBQTtBQUhELDBCQUdDOzs7Ozs7OztJQVNDLGtCQUFvQixRQUFpQixFQUFVLE9BQXVCO1FBQWxELGFBQVEsR0FBUixRQUFRLENBQVM7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFnQjtxQkFMOUMsQ0FBQztLQUtrRDtJQUUzRTs7O09BR0c7Ozs7Ozs7SUFDSCx3QkFBSzs7Ozs7O0lBQUwsVUFBTSxPQUFlLEVBQUUsUUFBaUI7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDOUI7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCx1QkFBSTs7Ozs7O0lBQUosVUFBSyxPQUFlLEVBQUUsUUFBaUI7UUFDckMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUU1QyxJQUFJLFFBQVEsRUFBRTtZQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUFFOztRQUVuRCxJQUFJLEtBQUssQ0FBUTtRQUNqQixLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENB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LEdBQUcsQ0FBQyxDQUFDO0tBQ1Q7SUFFRDs7O09BR0c7Ozs7O0lBQ0gsb0NBQVE7Ozs7SUFBUixjQUFzQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFOztnQkFyRHZELFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIscU1BQXlCO29CQUV6QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs0QkFuSUQ7O1NBb0lhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5qZWN0YWJsZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheVN0YXRlLFxuICBPdmVybGF5UmVmLFxuICBDb21wb25lbnRQb3J0YWwsXG59IGZyb20gJy4uL2NvcmUvaW5kZXgnO1xuXG5leHBvcnQgY2xhc3MgVG9hc3Qge1xuICBpZDogbnVtYmVyO1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgTWQyVG9hc3RDb25maWcge1xuICBkdXJhdGlvbjogbnVtYmVyID0gMzAwMDtcbiAgdmlld0NvbnRhaW5lclJlZj86IFZpZXdDb250YWluZXJSZWYgPSBudWxsO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWQyVG9hc3Qge1xuICBwcml2YXRlIGluZGV4OiBudW1iZXIgPSAwO1xuXG4gIF9vdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuICBfdG9hc3RJbnN0YW5jZTogTWQyVG9hc3RDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSwgcHJpdmF0ZSBfY29uZmlnOiBNZDJUb2FzdENvbmZpZykgeyB9XG5cbiAgLyoqXG4gICAqIHRvYXN0IG1lc3NhZ2VcbiAgICogQHBhcmFtIHRvYXN0IHN0cmluZyBvciBvYmplY3Qgd2l0aCBtZXNzYWdlIGFuZCBvdGhlciBwcm9wZXJ0aWVzIG9mIHRvYXN0XG4gICAqL1xuICB0b2FzdChtZXNzYWdlOiBzdHJpbmcsIGR1cmF0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5zaG93KG1lc3NhZ2UsIGR1cmF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaG93IHRvYXN0XG4gICAqIEBwYXJhbSB0b2FzdE9iaiBzdHJpbmcgb3Igb2JqZWN0IHdpdGggbWVzc2FnZSBhbmQgb3RoZXIgcHJvcGVydGllcyBvZiB0b2FzdFxuICAgKi9cbiAgc2hvdyhtZXNzYWdlOiBzdHJpbmcsIGR1cmF0aW9uPzogbnVtYmVyKSB7XG4gICAgaWYgKCFtZXNzYWdlIHx8ICFtZXNzYWdlLnRyaW0oKSkgeyByZXR1cm47IH1cblxuICAgIGlmIChkdXJhdGlvbikgeyB0aGlzLl9jb25maWcuZHVyYXRpb24gPSBkdXJhdGlvbjsgfVxuXG4gICAgbGV0IHRvYXN0OiBUb2FzdDtcbiAgICB0b2FzdCA9IG5ldyBUb2FzdChtZXNzYWdlKTtcblxuICAgIGlmICh0b2FzdCkge1xuICAgICAgaWYgKCF0aGlzLl90b2FzdEluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVRvYXN0KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldFRvYXN0TWVzc2FnZSh0b2FzdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIENyZWF0ZSB0aGUgdG9hc3QgdG8gZGlzcGxheSAqL1xuICBwcml2YXRlIF9jcmVhdGVUb2FzdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jcmVhdGVPdmVybGF5KCk7XG4gICAgbGV0IHBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoTWQyVG9hc3RDb21wb25lbnQsIHRoaXMuX2NvbmZpZy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICB0aGlzLl90b2FzdEluc3RhbmNlID0gdGhpcy5fb3ZlcmxheVJlZi5hdHRhY2gocG9ydGFsKS5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKiBDcmVhdGUgdGhlIG92ZXJsYXkgY29uZmlnIGFuZCBwb3NpdGlvbiBzdHJhdGVneSAqL1xuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgbGV0IGNvbmZpZyA9IG5ldyBPdmVybGF5U3RhdGUoKTtcbiAgICAgIGNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgIC5nbG9iYWwoKVxuICAgICAgICAudG9wKCcwJykucmlnaHQoJzAnKTtcblxuICAgICAgdGhpcy5fb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIERpc3Bvc2VzIHRoZSBjdXJyZW50IHRvYXN0IGFuZCB0aGUgb3ZlcmxheSBpdCBpcyBhdHRhY2hlZCB0byAqL1xuICBwcml2YXRlIF9kaXNwb3NlVG9hc3QoKTogdm9pZCB7XG4gICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgdGhpcy5fb3ZlcmxheVJlZiA9IG51bGw7XG4gICAgdGhpcy5fdG9hc3RJbnN0YW5jZSA9IG51bGw7XG4gIH1cblxuICAvKiogVXBkYXRlcyB0aGUgdG9hc3QgbWVzc2FnZSBhbmQgcmVwb3NpdGlvbnMgdGhlIG92ZXJsYXkgYWNjb3JkaW5nIHRvIHRoZSBuZXcgbWVzc2FnZSBsZW5ndGggKi9cbiAgcHJpdmF0ZSBfc2V0VG9hc3RNZXNzYWdlKHRvYXN0OiBUb2FzdCkge1xuICAgIHRvYXN0LmlkID0gKyt0aGlzLmluZGV4O1xuICAgIHRoaXMuX3RvYXN0SW5zdGFuY2UuYWRkVG9hc3QodG9hc3QpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbGVhclRvYXN0KHRvYXN0LmlkKTtcbiAgICB9LCB0aGlzLl9jb25maWcuZHVyYXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNsZWFyIHNwZWNpZmljIHRvYXN0XG4gICAqIEBwYXJhbSB0b2FzdElkXG4gICAqL1xuICBwcml2YXRlIGNsZWFyVG9hc3QodG9hc3RJZDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3RvYXN0SW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX3RvYXN0SW5zdGFuY2UucmVtb3ZlVG9hc3QodG9hc3RJZCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLl90b2FzdEluc3RhbmNlLmhhc1RvYXN0KCkpIHsgdGhpcy5fZGlzcG9zZVRvYXN0KCk7IH1cbiAgICAgIH0sIDI1MCk7XG5cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2xlYXIgYWxsIHRvYXN0c1xuICAgKi9cbiAgY2xlYXJBbGxUb2FzdHMoKSB7XG4gICAgaWYgKHRoaXMuX3RvYXN0SW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX3RvYXN0SW5zdGFuY2UucmVtb3ZlQWxsVG9hc3RzKCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLl90b2FzdEluc3RhbmNlLmhhc1RvYXN0KCkpIHsgdGhpcy5fZGlzcG9zZVRvYXN0KCk7IH1cbiAgICAgIH0sIDI1MCk7XG5cbiAgICB9XG4gIH1cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZDItdG9hc3QnLFxuICB0ZW1wbGF0ZVVybDogJ3RvYXN0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsndG9hc3Quc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNZDJUb2FzdENvbXBvbmVudCB7XG4gIHRvYXN0czogVG9hc3RbXSA9IFtdO1xuICBtYXhTaG93biA9IDU7XG5cbiAgLyoqXG4gICAqIGFkZCB0b2FzdFxuICAgKiBAcGFyYW0gdG9hc3QgdG9hc3Qgb2JqZWN0IHdpdGggYWxsIHBhcmFtZXRlcnNcbiAgICovXG4gIGFkZFRvYXN0KHRvYXN0OiBUb2FzdCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdG9hc3QuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9LCAxKTtcbiAgICB0aGlzLnRvYXN0cy5wdXNoKHRvYXN0KTtcbiAgICBpZiAodGhpcy50b2FzdHMubGVuZ3RoID4gdGhpcy5tYXhTaG93bikge1xuICAgICAgdGhpcy50b2FzdHNbMF0uaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy50b2FzdHMuc3BsaWNlKDAsICh0aGlzLnRvYXN0cy5sZW5ndGggLSB0aGlzLm1heFNob3duKSk7XG4gICAgICB9LCAyNTApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdG9hc3RcbiAgICogQHBhcmFtIHRvYXN0SWQgbnVtYmVyIG9mIHRvYXN0IGlkXG4gICAqL1xuICByZW1vdmVUb2FzdCh0b2FzdElkOiBudW1iZXIpIHtcbiAgICB0aGlzLnRvYXN0cy5mb3JFYWNoKCh0OiBhbnkpID0+IHsgaWYgKHQuaWQgPT09IHRvYXN0SWQpIHsgdC5pc1Zpc2libGUgPSBmYWxzZTsgfSB9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudG9hc3RzID0gdGhpcy50b2FzdHMuZmlsdGVyKCh0b2FzdCkgPT4geyByZXR1cm4gdG9hc3QuaWQgIT09IHRvYXN0SWQ7IH0pO1xuICAgIH0sIDI1MCk7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIGFsbCB0b2FzdHNcbiAgICogQHBhcmFtIHRvYXN0SWQgbnVtYmVyIG9mIHRvYXN0IGlkXG4gICAqL1xuICByZW1vdmVBbGxUb2FzdHMoKSB7XG4gICAgdGhpcy50b2FzdHMuZm9yRWFjaCgodDogYW55KSA9PiB7IHQuaXNWaXNpYmxlID0gZmFsc2U7IH0pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50b2FzdHMgPSBbXTtcbiAgICB9LCAyNTApO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIGhhcyBhbnkgdG9hc3RcbiAgICogQHJldHVybiBib29sZWFuXG4gICAqL1xuICBoYXNUb2FzdCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMudG9hc3RzLmxlbmd0aCA+IDA7IH1cblxufVxuIl19