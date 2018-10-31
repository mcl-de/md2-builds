/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, NgModule, Output, Input, EventEmitter, Injectable, } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * \@docs-private
 */
var MdMutationObserverFactory = /** @class */ (function () {
    function MdMutationObserverFactory() {
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    MdMutationObserverFactory.prototype.create = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        return typeof MutationObserver === 'undefined' ? null : new MutationObserver(callback);
    };
    MdMutationObserverFactory.decorators = [
        { type: Injectable }
    ];
    return MdMutationObserverFactory;
}());
export { MdMutationObserverFactory };
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
var ObserveContent = /** @class */ (function () {
    function ObserveContent(_mutationObserverFactory, _elementRef) {
        this._mutationObserverFactory = _mutationObserverFactory;
        this._elementRef = _elementRef;
        /**
         * Event emitted for each change in the element's content.
         */
        this.event = new EventEmitter();
        /**
         * Used for debouncing the emitted values to the observeContent event.
         */
        this._debouncer = new Subject();
    }
    /**
     * @return {?}
     */
    ObserveContent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.debounce > 0) {
            this._debouncer
                .pipe(debounceTime(this.debounce))
                .subscribe(function (mutations) { return _this.event.emit(mutations); });
        }
        else {
            this._debouncer.subscribe(function (mutations) { return _this.event.emit(mutations); });
        }
        this._observer = this._mutationObserverFactory.create(function (mutations) {
            _this._debouncer.next(mutations);
        });
        if (this._observer) {
            this._observer.observe(this._elementRef.nativeElement, {
                characterData: true,
                childList: true,
                subtree: true
            });
        }
    };
    /**
     * @return {?}
     */
    ObserveContent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._observer) {
            this._observer.disconnect();
            this._debouncer.complete();
            this._debouncer = this._observer = null;
        }
    };
    ObserveContent.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkObserveContent]'
                },] }
    ];
    /** @nocollapse */
    ObserveContent.ctorParameters = function () { return [
        { type: MdMutationObserverFactory },
        { type: ElementRef }
    ]; };
    ObserveContent.propDecorators = {
        event: [{ type: Output, args: ['cdkObserveContent',] }],
        debounce: [{ type: Input }]
    };
    return ObserveContent;
}());
export { ObserveContent };
if (false) {
    /** @type {?} */
    ObserveContent.prototype._observer;
    /**
     * Event emitted for each change in the element's content.
     * @type {?}
     */
    ObserveContent.prototype.event;
    /**
     * Used for debouncing the emitted values to the observeContent event.
     * @type {?}
     */
    ObserveContent.prototype._debouncer;
    /**
     * Debounce interval for emitting the changes.
     * @type {?}
     */
    ObserveContent.prototype.debounce;
    /** @type {?} */
    ObserveContent.prototype._mutationObserverFactory;
    /** @type {?} */
    ObserveContent.prototype._elementRef;
}
var ObserveContentModule = /** @class */ (function () {
    function ObserveContentModule() {
    }
    ObserveContentModule.decorators = [
        { type: NgModule, args: [{
                    exports: [ObserveContent],
                    declarations: [ObserveContent],
                    providers: [MdMutationObserverFactory]
                },] }
    ];
    return ObserveContentModule;
}());
export { ObserveContentModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZS1jb250ZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9vYnNlcnZlLWNvbnRlbnQvb2JzZXJ2ZS1jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssRUFDTCxZQUFZLEVBR1osVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7SUFRMUMsMENBQU07Ozs7SUFBTixVQUFPLFFBQWE7UUFDbEIsT0FBTyxPQUFPLGdCQUFnQixLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3hGOztnQkFKRixVQUFVOztvQ0FsQlg7O1NBbUJhLHlCQUF5Qjs7Ozs7O0lBeUJwQyx3QkFDVSwwQkFDQTtRQURBLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXOzs7O3FCQVZnQixJQUFJLFlBQVksRUFBb0I7Ozs7MEJBR3BELElBQUksT0FBTyxFQUFvQjtLQU9kOzs7O0lBRXRDLDJDQUFrQjs7O0lBQWxCO1FBQUEsaUJBb0JDO1FBbkJDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLFVBQVU7aUJBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ2pDLFNBQVMsQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7U0FDdkQ7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztTQUNwRTtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxVQUFDLFNBQTJCO1lBQ2hGLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2pDLENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRTtnQkFDckQsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFNBQVMsRUFBRSxJQUFJO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2QsQ0FBQyxDQUFDO1NBQ0o7S0FDRjs7OztJQUVELG9DQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN6QztLQUNGOztnQkEvQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7aUJBQ2hDOzs7O2dCQWNxQyx5QkFBeUI7Z0JBM0M3RCxVQUFVOzs7d0JBa0NULE1BQU0sU0FBQyxtQkFBbUI7MkJBTTFCLEtBQUs7O3lCQTFDUjs7U0FnQ2EsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFnRDFCLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7b0JBQ3pCLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDOUIsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7aUJBQ3ZDOzsrQkFwRkQ7O1NBcUZhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgTmdNb2R1bGUsXG4gIE91dHB1dCxcbiAgSW5wdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25EZXN0cm95LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBJbmplY3RhYmxlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlYm91bmNlVGltZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIEZhY3RvcnkgdGhhdCBjcmVhdGVzIGEgbmV3IE11dGF0aW9uT2JzZXJ2ZXIgYW5kIGFsbG93cyB1cyB0byBzdHViIGl0IG91dCBpbiB1bml0IHRlc3RzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWRNdXRhdGlvbk9ic2VydmVyRmFjdG9yeSB7XG4gIGNyZWF0ZShjYWxsYmFjazogYW55KTogTXV0YXRpb25PYnNlcnZlciB7XG4gICAgcmV0dXJuIHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBuZXcgTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXJlY3RpdmUgdGhhdCB0cmlnZ2VycyBhIGNhbGxiYWNrIHdoZW5ldmVyIHRoZSBjb250ZW50IG9mXG4gKiBpdHMgYXNzb2NpYXRlZCBlbGVtZW50IGhhcyBjaGFuZ2VkLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2RrT2JzZXJ2ZUNvbnRlbnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBPYnNlcnZlQ29udGVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX29ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIGZvciBlYWNoIGNoYW5nZSBpbiB0aGUgZWxlbWVudCdzIGNvbnRlbnQuICovXG4gIEBPdXRwdXQoJ2Nka09ic2VydmVDb250ZW50JykgZXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPE11dGF0aW9uUmVjb3JkW10+KCk7XG5cbiAgLyoqIFVzZWQgZm9yIGRlYm91bmNpbmcgdGhlIGVtaXR0ZWQgdmFsdWVzIHRvIHRoZSBvYnNlcnZlQ29udGVudCBldmVudC4gKi9cbiAgcHJpdmF0ZSBfZGVib3VuY2VyID0gbmV3IFN1YmplY3Q8TXV0YXRpb25SZWNvcmRbXT4oKTtcblxuICAvKiogRGVib3VuY2UgaW50ZXJ2YWwgZm9yIGVtaXR0aW5nIHRoZSBjaGFuZ2VzLiAqL1xuICBASW5wdXQoKSBkZWJvdW5jZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX211dGF0aW9uT2JzZXJ2ZXJGYWN0b3J5OiBNZE11dGF0aW9uT2JzZXJ2ZXJGYWN0b3J5LFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5kZWJvdW5jZSA+IDApIHtcbiAgICAgIHRoaXMuX2RlYm91bmNlclxuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUodGhpcy5kZWJvdW5jZSkpXG4gICAgICAgIC5zdWJzY3JpYmUobXV0YXRpb25zID0+IHRoaXMuZXZlbnQuZW1pdChtdXRhdGlvbnMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGVib3VuY2VyLnN1YnNjcmliZShtdXRhdGlvbnMgPT4gdGhpcy5ldmVudC5lbWl0KG11dGF0aW9ucykpO1xuICAgIH1cblxuICAgIHRoaXMuX29ic2VydmVyID0gdGhpcy5fbXV0YXRpb25PYnNlcnZlckZhY3RvcnkuY3JlYXRlKChtdXRhdGlvbnM6IE11dGF0aW9uUmVjb3JkW10pID0+IHtcbiAgICAgIHRoaXMuX2RlYm91bmNlci5uZXh0KG11dGF0aW9ucyk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5fb2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuX29ic2VydmVyLm9ic2VydmUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB7XG4gICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX29ic2VydmVyKSB7XG4gICAgICB0aGlzLl9vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB0aGlzLl9kZWJvdW5jZXIuY29tcGxldGUoKTtcbiAgICAgIHRoaXMuX2RlYm91bmNlciA9IHRoaXMuX29ic2VydmVyID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cblxuXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbT2JzZXJ2ZUNvbnRlbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtPYnNlcnZlQ29udGVudF0sXG4gIHByb3ZpZGVyczogW01kTXV0YXRpb25PYnNlcnZlckZhY3RvcnldXG59KVxuZXhwb3J0IGNsYXNzIE9ic2VydmVDb250ZW50TW9kdWxlIHt9XG4iXX0=