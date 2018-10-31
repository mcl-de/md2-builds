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
var Dir = /** @class */ (function () {
    function Dir() {
        /**
         * Layout direction of the element.
         */
        this._dir = 'ltr';
        /**
         * Event emitted when the direction changes.
         */
        this.dirChange = new EventEmitter();
    }
    Object.defineProperty(Dir.prototype, "dir", {
        /** @docs-private */
        get: /**
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._dir;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            /** @type {?} */
            var old = this._dir;
            this._dir = v;
            if (old != this._dir) {
                this.dirChange.emit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "value", {
        /** Current layout direction of the element. */
        get: /**
         * Current layout direction of the element.
         * @return {?}
         */
        function () { return this.dir; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) { this.dir = v; },
        enumerable: true,
        configurable: true
    });
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
    return Dir;
}());
export { Dir };
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
var RtlModule = /** @class */ (function () {
    function RtlModule() {
    }
    RtlModule.decorators = [
        { type: NgModule, args: [{
                    exports: [Dir],
                    declarations: [Dir]
                },] }
    ];
    return RtlModule;
}());
export { RtlModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9ydGwvZGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLFNBQVMsRUFDVCxXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFDTCxZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7OztvQkFpQmlCLEtBQUs7Ozs7eUJBR3JCLElBQUksWUFBWSxFQUFROztJQUc5QyxzQkFDSSxvQkFBRztRQUZQLG9CQUFvQjs7Ozs7UUFDcEI7WUFFRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDbEI7Ozs7O1FBQ0QsVUFBUSxDQUFrQjs7WUFDeEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNkLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDdkI7U0FDRjs7O09BUEE7SUFVRCxzQkFBSSxzQkFBSztRQURULCtDQUErQzs7Ozs7UUFDL0MsY0FBK0IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Ozs7O1FBQ2pELFVBQVUsQ0FBa0IsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFOzs7T0FERTs7Z0JBMUJsRCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLE9BQU87O29CQUVqQixRQUFRLEVBQUUsV0FBVztpQkFDdEI7Ozt1QkFHRSxLQUFLLFNBQUMsS0FBSzs0QkFHWCxNQUFNO3NCQUdOLFdBQVcsU0FBQyxVQUFVOztjQTlCekI7O1NBc0JhLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQTBCZixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDO29CQUNkLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQztpQkFDcEI7O29CQW5ERDs7U0FvRGEsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE5nTW9kdWxlLFxuICBEaXJlY3RpdmUsXG4gIEhvc3RCaW5kaW5nLFxuICBPdXRwdXQsXG4gIElucHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCB0eXBlIExheW91dERpcmVjdGlvbiA9ICdsdHInIHwgJ3J0bCc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGxpc3RlbiBmb3IgY2hhbmdlcyBvZiBkaXJlY3Rpb24gb2YgcGFydCBvZiB0aGUgRE9NLlxuICpcbiAqIEFwcGxpY2F0aW9ucyBzaG91bGQgdXNlIHRoaXMgZGlyZWN0aXZlIGluc3RlYWQgb2YgdGhlIG5hdGl2ZSBhdHRyaWJ1dGUgc28gdGhhdCBNYXRlcmlhbFxuICogY29tcG9uZW50cyBjYW4gbGlzdGVuIG9uIGNoYW5nZXMgb2YgZGlyZWN0aW9uLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZGlyXScsXG4gIC8vIFRPRE8oaGFuc2wpOiBtYXliZSBgJGltcGxpY2l0YCBpc24ndCB0aGUgYmVzdCBvcHRpb24gaGVyZSwgYnV0IGZvciBub3cgdGhhdCdzIHRoZSBiZXN0IHdlIGdvdC5cbiAgZXhwb3J0QXM6ICckaW1wbGljaXQnXG59KVxuZXhwb3J0IGNsYXNzIERpciB7XG4gIC8qKiBMYXlvdXQgZGlyZWN0aW9uIG9mIHRoZSBlbGVtZW50LiAqL1xuICBASW5wdXQoJ2RpcicpIF9kaXI6IExheW91dERpcmVjdGlvbiA9ICdsdHInO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRpcmVjdGlvbiBjaGFuZ2VzLiAqL1xuICBAT3V0cHV0KCkgZGlyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBAZG9jcy1wcml2YXRlICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5kaXInKVxuICBnZXQgZGlyKCk6IExheW91dERpcmVjdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RpcjtcbiAgfVxuICBzZXQgZGlyKHY6IExheW91dERpcmVjdGlvbikge1xuICAgIGxldCBvbGQgPSB0aGlzLl9kaXI7XG4gICAgdGhpcy5fZGlyID0gdjtcbiAgICBpZiAob2xkICE9IHRoaXMuX2Rpcikge1xuICAgICAgdGhpcy5kaXJDaGFuZ2UuZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDdXJyZW50IGxheW91dCBkaXJlY3Rpb24gb2YgdGhlIGVsZW1lbnQuICovXG4gIGdldCB2YWx1ZSgpOiBMYXlvdXREaXJlY3Rpb24geyByZXR1cm4gdGhpcy5kaXI7IH1cbiAgc2V0IHZhbHVlKHY6IExheW91dERpcmVjdGlvbikgeyB0aGlzLmRpciA9IHY7IH1cbn1cblxuXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbRGlyXSxcbiAgZGVjbGFyYXRpb25zOiBbRGlyXVxufSlcbmV4cG9ydCBjbGFzcyBSdGxNb2R1bGUge31cbiJdfQ==