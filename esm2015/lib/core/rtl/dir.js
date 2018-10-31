/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, Directive, HostBinding, Output, Input, EventEmitter } from '@angular/core';
/** @typedef {?} */
var LayoutDirection;
export { LayoutDirection };
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Applications should use this directive instead of the native attribute so that Material
 * components can listen on changes of direction.
 */
export class Dir {
    constructor() {
        /**
         * Layout direction of the element.
         */
        this._dir = 'ltr';
        /**
         * Event emitted when the direction changes.
         */
        this.dirChange = new EventEmitter();
    }
    /**
     * \@docs-private
     * @return {?}
     */
    get dir() {
        return this._dir;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set dir(v) {
        /** @type {?} */
        let old = this._dir;
        this._dir = v;
        if (old != this._dir) {
            this.dirChange.emit();
        }
    }
    /**
     * Current layout direction of the element.
     * @return {?}
     */
    get value() { return this.dir; }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) { this.dir = v; }
}
Dir.decorators = [
    { type: Directive, args: [{
                selector: '[dir]',
                // TODO(hansl): maybe `$implicit` isn't the best option here, but for now that's the best we got.
                exportAs: '$implicit'
            },] }
];
Dir.propDecorators = {
    _dir: [{ type: Input, args: ['dir',] }],
    dirChange: [{ type: Output }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }]
};
if (false) {
    /**
     * Layout direction of the element.
     * @type {?}
     */
    Dir.prototype._dir;
    /**
     * Event emitted when the direction changes.
     * @type {?}
     */
    Dir.prototype.dirChange;
}
export class RtlModule {
}
RtlModule.decorators = [
    { type: NgModule, args: [{
                exports: [Dir],
                declarations: [Dir]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9ydGwvZGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLFNBQVMsRUFDVCxXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFDTCxZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUFldkIsTUFBTTs7Ozs7b0JBRWtDLEtBQUs7Ozs7eUJBR3JCLElBQUksWUFBWSxFQUFROzs7Ozs7SUFHOUMsSUFDSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2xCOzs7OztJQUNELElBQUksR0FBRyxDQUFDLENBQWtCOztRQUN4QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3ZCO0tBQ0Y7Ozs7O0lBR0QsSUFBSSxLQUFLLEtBQXNCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFOzs7OztJQUNqRCxJQUFJLEtBQUssQ0FBQyxDQUFrQixJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7OztZQTNCaEQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxPQUFPOztnQkFFakIsUUFBUSxFQUFFLFdBQVc7YUFDdEI7OzttQkFHRSxLQUFLLFNBQUMsS0FBSzt3QkFHWCxNQUFNO2tCQUdOLFdBQVcsU0FBQyxVQUFVOzs7Ozs7Ozs7Ozs7OztBQXNCekIsTUFBTTs7O1lBSkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQztnQkFDZCxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUM7YUFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBOZ01vZHVsZSxcbiAgRGlyZWN0aXZlLFxuICBIb3N0QmluZGluZyxcbiAgT3V0cHV0LFxuICBJbnB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgdHlwZSBMYXlvdXREaXJlY3Rpb24gPSAnbHRyJyB8ICdydGwnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBsaXN0ZW4gZm9yIGNoYW5nZXMgb2YgZGlyZWN0aW9uIG9mIHBhcnQgb2YgdGhlIERPTS5cbiAqXG4gKiBBcHBsaWNhdGlvbnMgc2hvdWxkIHVzZSB0aGlzIGRpcmVjdGl2ZSBpbnN0ZWFkIG9mIHRoZSBuYXRpdmUgYXR0cmlidXRlIHNvIHRoYXQgTWF0ZXJpYWxcbiAqIGNvbXBvbmVudHMgY2FuIGxpc3RlbiBvbiBjaGFuZ2VzIG9mIGRpcmVjdGlvbi5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Rpcl0nLFxuICAvLyBUT0RPKGhhbnNsKTogbWF5YmUgYCRpbXBsaWNpdGAgaXNuJ3QgdGhlIGJlc3Qgb3B0aW9uIGhlcmUsIGJ1dCBmb3Igbm93IHRoYXQncyB0aGUgYmVzdCB3ZSBnb3QuXG4gIGV4cG9ydEFzOiAnJGltcGxpY2l0J1xufSlcbmV4cG9ydCBjbGFzcyBEaXIge1xuICAvKiogTGF5b3V0IGRpcmVjdGlvbiBvZiB0aGUgZWxlbWVudC4gKi9cbiAgQElucHV0KCdkaXInKSBfZGlyOiBMYXlvdXREaXJlY3Rpb24gPSAnbHRyJztcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkaXJlY3Rpb24gY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgpIGRpckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGlyJylcbiAgZ2V0IGRpcigpOiBMYXlvdXREaXJlY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl9kaXI7XG4gIH1cbiAgc2V0IGRpcih2OiBMYXlvdXREaXJlY3Rpb24pIHtcbiAgICBsZXQgb2xkID0gdGhpcy5fZGlyO1xuICAgIHRoaXMuX2RpciA9IHY7XG4gICAgaWYgKG9sZCAhPSB0aGlzLl9kaXIpIHtcbiAgICAgIHRoaXMuZGlyQ2hhbmdlLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQ3VycmVudCBsYXlvdXQgZGlyZWN0aW9uIG9mIHRoZSBlbGVtZW50LiAqL1xuICBnZXQgdmFsdWUoKTogTGF5b3V0RGlyZWN0aW9uIHsgcmV0dXJuIHRoaXMuZGlyOyB9XG4gIHNldCB2YWx1ZSh2OiBMYXlvdXREaXJlY3Rpb24pIHsgdGhpcy5kaXIgPSB2OyB9XG59XG5cblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Rpcl0sXG4gIGRlY2xhcmF0aW9uczogW0Rpcl1cbn0pXG5leHBvcnQgY2xhc3MgUnRsTW9kdWxlIHt9XG4iXX0=