/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, Directive, } from '@angular/core';
import { MdCommonModule } from '../common-behaviors/common-module';
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a \@ContentChildren(MdLine) query, then
 * counted by checking the query list's length.
 */
var MdLine = /** @class */ (function () {
    function MdLine() {
    }
    MdLine.decorators = [
        { type: Directive, args: [{
                    selector: '[md-line], [mat-line], [mdLine], [matLine]',
                    host: { 'class': 'mat-line' }
                },] }
    ];
    return MdLine;
}());
export { MdLine };
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
var /**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
MdLineSetter = /** @class */ (function () {
    function MdLineSetter(_lines, _renderer, _element) {
        var _this = this;
        this._lines = _lines;
        this._renderer = _renderer;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(function () {
            _this._setLineClass(_this._lines.length);
        });
    }
    /**
     * @param {?} count
     * @return {?}
     */
    MdLineSetter.prototype._setLineClass = /**
     * @param {?} count
     * @return {?}
     */
    function (count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass("mat-" + count + "-line", true);
        }
        else if (count > 3) {
            this._setClass("mat-multi-line", true);
        }
    };
    /**
     * @return {?}
     */
    MdLineSetter.prototype._resetClasses = /**
     * @return {?}
     */
    function () {
        this._setClass('mat-2-line', false);
        this._setClass('mat-3-line', false);
        this._setClass('mat-multi-line', false);
    };
    /**
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    MdLineSetter.prototype._setClass = /**
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    function (className, isAdd) {
        if (isAdd) {
            this._renderer.addClass(this._element.nativeElement, className);
        }
        else {
            this._renderer.removeClass(this._element.nativeElement, className);
        }
    };
    return MdLineSetter;
}());
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
export { MdLineSetter };
if (false) {
    /** @type {?} */
    MdLineSetter.prototype._lines;
    /** @type {?} */
    MdLineSetter.prototype._renderer;
    /** @type {?} */
    MdLineSetter.prototype._element;
}
var MdLineModule = /** @class */ (function () {
    function MdLineModule() {
    }
    MdLineModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MdCommonModule],
                    exports: [MdLine, MdCommonModule],
                    declarations: [MdLine],
                },] }
    ];
    return MdLineModule;
}());
export { MdLineModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbGluZS9saW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLFNBQVMsR0FJVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7Ozs7Z0JBUWhFLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNENBQTRDO29CQUN0RCxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDO2lCQUM1Qjs7aUJBbEJEOztTQW1CYSxNQUFNOzs7OztBQU1uQjs7OztBQUFBO0lBQ0Usc0JBQW9CLE1BQXlCLEVBQVUsU0FBb0IsRUFDdkQ7UUFEcEIsaUJBT0M7UUFQbUIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3ZELGFBQVEsR0FBUixRQUFRO1FBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDNUIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDLENBQUMsQ0FBQztLQUNKOzs7OztJQUVPLG9DQUFhOzs7O2NBQUMsS0FBYTtRQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFPLEtBQUssVUFBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDeEM7Ozs7O0lBR0ssb0NBQWE7Ozs7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQzs7Ozs7OztJQUdsQyxnQ0FBUzs7Ozs7Y0FBQyxTQUFpQixFQUFFLEtBQWM7UUFDakQsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNqRTthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDcEU7O3VCQXZETDtJQTBEQyxDQUFBOzs7OztBQWpDRCx3QkFpQ0M7Ozs7Ozs7Ozs7Ozs7Z0JBRUEsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDekIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQztvQkFDakMsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDO2lCQUN2Qjs7dUJBaEVEOztTQWlFYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTmdNb2R1bGUsXG4gIERpcmVjdGl2ZSxcbiAgUmVuZGVyZXIyLFxuICBFbGVtZW50UmVmLFxuICBRdWVyeUxpc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZENvbW1vbk1vZHVsZX0gZnJvbSAnLi4vY29tbW9uLWJlaGF2aW9ycy9jb21tb24tbW9kdWxlJztcblxuXG4vKipcbiAqIFNoYXJlZCBkaXJlY3RpdmUgdG8gY291bnQgbGluZXMgaW5zaWRlIGEgdGV4dCBhcmVhLCBzdWNoIGFzIGEgbGlzdCBpdGVtLlxuICogTGluZSBlbGVtZW50cyBjYW4gYmUgZXh0cmFjdGVkIHdpdGggYSBAQ29udGVudENoaWxkcmVuKE1kTGluZSkgcXVlcnksIHRoZW5cbiAqIGNvdW50ZWQgYnkgY2hlY2tpbmcgdGhlIHF1ZXJ5IGxpc3QncyBsZW5ndGguXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZC1saW5lXSwgW21hdC1saW5lXSwgW21kTGluZV0sIFttYXRMaW5lXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LWxpbmUnfVxufSlcbmV4cG9ydCBjbGFzcyBNZExpbmUge31cblxuLyoqXG4gKiBIZWxwZXIgdGhhdCB0YWtlcyBhIHF1ZXJ5IGxpc3Qgb2YgbGluZXMgYW5kIHNldHMgdGhlIGNvcnJlY3QgY2xhc3Mgb24gdGhlIGhvc3QuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBNZExpbmVTZXR0ZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9saW5lczogUXVlcnlMaXN0PE1kTGluZT4sIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9zZXRMaW5lQ2xhc3ModGhpcy5fbGluZXMubGVuZ3RoKTtcblxuICAgIHRoaXMuX2xpbmVzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX3NldExpbmVDbGFzcyh0aGlzLl9saW5lcy5sZW5ndGgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TGluZUNsYXNzKGNvdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNldENsYXNzZXMoKTtcbiAgICBpZiAoY291bnQgPT09IDIgfHwgY291bnQgPT09IDMpIHtcbiAgICAgIHRoaXMuX3NldENsYXNzKGBtYXQtJHtjb3VudH0tbGluZWAsIHRydWUpO1xuICAgIH0gZWxzZSBpZiAoY291bnQgPiAzKSB7XG4gICAgICB0aGlzLl9zZXRDbGFzcyhgbWF0LW11bHRpLWxpbmVgLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZXNldENsYXNzZXMoKTogdm9pZCB7XG4gICAgdGhpcy5fc2V0Q2xhc3MoJ21hdC0yLWxpbmUnLCBmYWxzZSk7XG4gICAgdGhpcy5fc2V0Q2xhc3MoJ21hdC0zLWxpbmUnLCBmYWxzZSk7XG4gICAgdGhpcy5fc2V0Q2xhc3MoJ21hdC1tdWx0aS1saW5lJywgZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcsIGlzQWRkOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGlzQWRkKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWRDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbTWRMaW5lLCBNZENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW01kTGluZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1kTGluZU1vZHVsZSB7IH1cbiJdfQ==