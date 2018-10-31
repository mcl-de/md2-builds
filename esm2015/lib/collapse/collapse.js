/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Input, Output, } from '@angular/core';
export class Md2Collapse {
    constructor() {
        this._collapse = true;
        this._collapsing = false;
        this.collapsed = new EventEmitter();
        this.expanded = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get collapse() { return this._collapse; }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapse(value) {
        this._collapse = value;
        this.toggle();
    }
    /**
     * toggle collapse
     * @return {?}
     */
    toggle() {
        if (this._collapse) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    /**
     * show collapse
     * @return {?}
     */
    show() {
        this._collapsing = true;
        this._collapse = true;
        setTimeout(() => {
            this._collapsing = false;
        }, 4);
        this.expanded.emit();
    }
    /**
     * hide collapse
     * @return {?}
     */
    hide() {
        this._collapsing = true;
        this._collapse = false;
        setTimeout(() => {
            this._collapsing = false;
        }, 4);
        this.collapsed.emit();
    }
}
Md2Collapse.decorators = [
    { type: Directive, args: [{
                selector: '[collapse]',
                host: {
                    'role': 'collapse',
                    '[class.in]': '_collapse',
                    '[class.collapse]': 'true',
                    '[class.collapsing]': '_collapsing',
                    '[attr.aria-expanded]': '_collapse',
                    '[attr.aria-hidden]': '!_collapse'
                },
                exportAs: 'md2Collapse'
            },] }
];
Md2Collapse.propDecorators = {
    collapsed: [{ type: Output }],
    expanded: [{ type: Output }],
    collapse: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    Md2Collapse.prototype._collapse;
    /** @type {?} */
    Md2Collapse.prototype._collapsing;
    /** @type {?} */
    Md2Collapse.prototype.collapsed;
    /** @type {?} */
    Md2Collapse.prototype.expanded;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb2xsYXBzZS9jb2xsYXBzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQWN2QixNQUFNOzt5QkFDaUIsSUFBSTsyQkFDRixLQUFLO3lCQUVjLElBQUksWUFBWSxFQUFRO3dCQUN6QixJQUFJLFlBQVksRUFBUTs7Ozs7SUFFakUsSUFDSSxRQUFRLEtBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Ozs7O0lBQ2xELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2Y7Ozs7O0lBS0QsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUFFO2FBQU07WUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FBRTtLQUMzRDs7Ozs7SUFLRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3RCOzs7OztJQUtELElBQUk7UUFDRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdkI7OztZQXZERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLElBQUksRUFBRTtvQkFDSixNQUFNLEVBQUUsVUFBVTtvQkFDbEIsWUFBWSxFQUFFLFdBQVc7b0JBQ3pCLGtCQUFrQixFQUFFLE1BQU07b0JBQzFCLG9CQUFvQixFQUFFLGFBQWE7b0JBQ25DLHNCQUFzQixFQUFFLFdBQVc7b0JBQ25DLG9CQUFvQixFQUFFLFlBQVk7aUJBQ25DO2dCQUNELFFBQVEsRUFBRSxhQUFhO2FBQ3hCOzs7d0JBS0UsTUFBTTt1QkFDTixNQUFNO3VCQUVOLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjb2xsYXBzZV0nLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAnY29sbGFwc2UnLFxuICAgICdbY2xhc3MuaW5dJzogJ19jb2xsYXBzZScsXG4gICAgJ1tjbGFzcy5jb2xsYXBzZV0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5jb2xsYXBzaW5nXSc6ICdfY29sbGFwc2luZycsXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ19jb2xsYXBzZScsXG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICchX2NvbGxhcHNlJ1xuICB9LFxuICBleHBvcnRBczogJ21kMkNvbGxhcHNlJ1xufSlcbmV4cG9ydCBjbGFzcyBNZDJDb2xsYXBzZSB7XG4gIF9jb2xsYXBzZTogYm9vbGVhbiA9IHRydWU7XG4gIF9jb2xsYXBzaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGNvbGxhcHNlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgZXhwYW5kZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBASW5wdXQoKVxuICBnZXQgY29sbGFwc2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9jb2xsYXBzZTsgfVxuICBzZXQgY29sbGFwc2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jb2xsYXBzZSA9IHZhbHVlO1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICAvKipcbiAgICogdG9nZ2xlIGNvbGxhcHNlXG4gICAqL1xuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuX2NvbGxhcHNlKSB7IHRoaXMuaGlkZSgpOyB9IGVsc2UgeyB0aGlzLnNob3coKTsgfVxuICB9XG5cbiAgLyoqXG4gICogc2hvdyBjb2xsYXBzZVxuICAqL1xuICBzaG93KCkge1xuICAgIHRoaXMuX2NvbGxhcHNpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2NvbGxhcHNlID0gdHJ1ZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2NvbGxhcHNpbmcgPSBmYWxzZTtcbiAgICB9LCA0KTtcbiAgICB0aGlzLmV4cGFuZGVkLmVtaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoaWRlIGNvbGxhcHNlXG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMuX2NvbGxhcHNpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2NvbGxhcHNlID0gZmFsc2U7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9jb2xsYXBzaW5nID0gZmFsc2U7XG4gICAgfSwgNCk7XG4gICAgdGhpcy5jb2xsYXBzZWQuZW1pdCgpO1xuICB9XG5cbn1cbiJdfQ==