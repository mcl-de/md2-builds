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
export class MdLine {
}
MdLine.decorators = [
    { type: Directive, args: [{
                selector: '[md-line], [mat-line], [mdLine], [matLine]',
                host: { 'class': 'mat-line' }
            },] }
];
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
export class MdLineSetter {
    /**
     * @param {?} _lines
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(_lines, _renderer, _element) {
        this._lines = _lines;
        this._renderer = _renderer;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(() => {
            this._setLineClass(this._lines.length);
        });
    }
    /**
     * @param {?} count
     * @return {?}
     */
    _setLineClass(count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass(`mat-${count}-line`, true);
        }
        else if (count > 3) {
            this._setClass(`mat-multi-line`, true);
        }
    }
    /**
     * @return {?}
     */
    _resetClasses() {
        this._setClass('mat-2-line', false);
        this._setClass('mat-3-line', false);
        this._setClass('mat-multi-line', false);
    }
    /**
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    _setClass(className, isAdd) {
        if (isAdd) {
            this._renderer.addClass(this._element.nativeElement, className);
        }
        else {
            this._renderer.removeClass(this._element.nativeElement, className);
        }
    }
}
if (false) {
    /** @type {?} */
    MdLineSetter.prototype._lines;
    /** @type {?} */
    MdLineSetter.prototype._renderer;
    /** @type {?} */
    MdLineSetter.prototype._element;
}
export class MdLineModule {
}
MdLineModule.decorators = [
    { type: NgModule, args: [{
                imports: [MdCommonModule],
                exports: [MdLine, MdCommonModule],
                declarations: [MdLine],
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbGluZS9saW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLFNBQVMsR0FJVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7Ozs7OztBQVlqRSxNQUFNOzs7WUFKTCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRDQUE0QztnQkFDdEQsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQzthQUM1Qjs7Ozs7O0FBT0QsTUFBTTs7Ozs7O0lBQ0osWUFBb0IsTUFBeUIsRUFBVSxTQUFvQixFQUN2RDtRQURBLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUN2RCxhQUFRLEdBQVIsUUFBUTtRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEMsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRU8sYUFBYSxDQUFDLEtBQWE7UUFDakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzQzthQUFNLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3hDOzs7OztJQUdLLGFBQWE7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQzs7Ozs7OztJQUdsQyxTQUFTLENBQUMsU0FBaUIsRUFBRSxLQUFjO1FBQ2pELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDakU7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3BFOztDQUdKOzs7Ozs7Ozs7QUFPRCxNQUFNOzs7WUFMTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUN6QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDO2dCQUNqQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7YUFDdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBOZ01vZHVsZSxcbiAgRGlyZWN0aXZlLFxuICBSZW5kZXJlcjIsXG4gIEVsZW1lbnRSZWYsXG4gIFF1ZXJ5TGlzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01kQ29tbW9uTW9kdWxlfSBmcm9tICcuLi9jb21tb24tYmVoYXZpb3JzL2NvbW1vbi1tb2R1bGUnO1xuXG5cbi8qKlxuICogU2hhcmVkIGRpcmVjdGl2ZSB0byBjb3VudCBsaW5lcyBpbnNpZGUgYSB0ZXh0IGFyZWEsIHN1Y2ggYXMgYSBsaXN0IGl0ZW0uXG4gKiBMaW5lIGVsZW1lbnRzIGNhbiBiZSBleHRyYWN0ZWQgd2l0aCBhIEBDb250ZW50Q2hpbGRyZW4oTWRMaW5lKSBxdWVyeSwgdGhlblxuICogY291bnRlZCBieSBjaGVja2luZyB0aGUgcXVlcnkgbGlzdCdzIGxlbmd0aC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21kLWxpbmVdLCBbbWF0LWxpbmVdLCBbbWRMaW5lXSwgW21hdExpbmVdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbGluZSd9XG59KVxuZXhwb3J0IGNsYXNzIE1kTGluZSB7fVxuXG4vKipcbiAqIEhlbHBlciB0aGF0IHRha2VzIGEgcXVlcnkgbGlzdCBvZiBsaW5lcyBhbmQgc2V0cyB0aGUgY29ycmVjdCBjbGFzcyBvbiB0aGUgaG9zdC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1kTGluZVNldHRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xpbmVzOiBRdWVyeUxpc3Q8TWRMaW5lPiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX3NldExpbmVDbGFzcyh0aGlzLl9saW5lcy5sZW5ndGgpO1xuXG4gICAgdGhpcy5fbGluZXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fc2V0TGluZUNsYXNzKHRoaXMuX2xpbmVzLmxlbmd0aCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRMaW5lQ2xhc3MoY291bnQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2V0Q2xhc3NlcygpO1xuICAgIGlmIChjb3VudCA9PT0gMiB8fCBjb3VudCA9PT0gMykge1xuICAgICAgdGhpcy5fc2V0Q2xhc3MoYG1hdC0ke2NvdW50fS1saW5lYCwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChjb3VudCA+IDMpIHtcbiAgICAgIHRoaXMuX3NldENsYXNzKGBtYXQtbXVsdGktbGluZWAsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0Q2xhc3NlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXRDbGFzcygnbWF0LTItbGluZScsIGZhbHNlKTtcbiAgICB0aGlzLl9zZXRDbGFzcygnbWF0LTMtbGluZScsIGZhbHNlKTtcbiAgICB0aGlzLl9zZXRDbGFzcygnbWF0LW11bHRpLWxpbmUnLCBmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDbGFzcyhjbGFzc05hbWU6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNBZGQpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuXG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNZENvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNZExpbmUsIE1kQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTWRMaW5lXSxcbn0pXG5leHBvcnQgY2xhc3MgTWRMaW5lTW9kdWxlIHsgfVxuIl19