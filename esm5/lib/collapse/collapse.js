/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Input, Output, } from '@angular/core';
var Md2Collapse = /** @class */ (function () {
    function Md2Collapse() {
        this._collapse = true;
        this._collapsing = false;
        this.collapsed = new EventEmitter();
        this.expanded = new EventEmitter();
    }
    Object.defineProperty(Md2Collapse.prototype, "collapse", {
        get: /**
         * @return {?}
         */
        function () { return this._collapse; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._collapse = value;
            this.toggle();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * toggle collapse
     */
    /**
     * toggle collapse
     * @return {?}
     */
    Md2Collapse.prototype.toggle = /**
     * toggle collapse
     * @return {?}
     */
    function () {
        if (this._collapse) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /**
    * show collapse
    */
    /**
     * show collapse
     * @return {?}
     */
    Md2Collapse.prototype.show = /**
     * show collapse
     * @return {?}
     */
    function () {
        var _this = this;
        this._collapsing = true;
        this._collapse = true;
        setTimeout(function () {
            _this._collapsing = false;
        }, 4);
        this.expanded.emit();
    };
    /**
     * hide collapse
     */
    /**
     * hide collapse
     * @return {?}
     */
    Md2Collapse.prototype.hide = /**
     * hide collapse
     * @return {?}
     */
    function () {
        var _this = this;
        this._collapsing = true;
        this._collapse = false;
        setTimeout(function () {
            _this._collapsing = false;
        }, 4);
        this.collapsed.emit();
    };
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
    return Md2Collapse;
}());
export { Md2Collapse };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb2xsYXBzZS9jb2xsYXBzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQzs7O3lCQWVBLElBQUk7MkJBQ0YsS0FBSzt5QkFFYyxJQUFJLFlBQVksRUFBUTt3QkFDekIsSUFBSSxZQUFZLEVBQVE7O0lBRWpFLHNCQUNJLGlDQUFROzs7O1FBRFosY0FDMEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Ozs7O1FBQ2xELFVBQWEsS0FBYztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjs7O09BSmlEO0lBTWxEOztPQUVHOzs7OztJQUNILDRCQUFNOzs7O0lBQU47UUFDRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FBRTthQUFNO1lBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQUU7S0FDM0Q7SUFFRDs7TUFFRTs7Ozs7SUFDRiwwQkFBSTs7OztJQUFKO1FBQUEsaUJBT0M7UUFOQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixVQUFVLENBQUM7WUFDVCxLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUMxQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN0QjtJQUVEOztPQUVHOzs7OztJQUNILDBCQUFJOzs7O0lBQUo7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLFVBQVUsQ0FBQztZQUNULEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3ZCOztnQkF2REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLFVBQVU7d0JBQ2xCLFlBQVksRUFBRSxXQUFXO3dCQUN6QixrQkFBa0IsRUFBRSxNQUFNO3dCQUMxQixvQkFBb0IsRUFBRSxhQUFhO3dCQUNuQyxzQkFBc0IsRUFBRSxXQUFXO3dCQUNuQyxvQkFBb0IsRUFBRSxZQUFZO3FCQUNuQztvQkFDRCxRQUFRLEVBQUUsYUFBYTtpQkFDeEI7Ozs0QkFLRSxNQUFNOzJCQUNOLE1BQU07MkJBRU4sS0FBSzs7c0JBMUJSOztTQW1CYSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY29sbGFwc2VdJyxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ2NvbGxhcHNlJyxcbiAgICAnW2NsYXNzLmluXSc6ICdfY29sbGFwc2UnLFxuICAgICdbY2xhc3MuY29sbGFwc2VdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuY29sbGFwc2luZ10nOiAnX2NvbGxhcHNpbmcnLFxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdfY29sbGFwc2UnLFxuICAgICdbYXR0ci5hcmlhLWhpZGRlbl0nOiAnIV9jb2xsYXBzZSdcbiAgfSxcbiAgZXhwb3J0QXM6ICdtZDJDb2xsYXBzZSdcbn0pXG5leHBvcnQgY2xhc3MgTWQyQ29sbGFwc2Uge1xuICBfY29sbGFwc2U6IGJvb2xlYW4gPSB0cnVlO1xuICBfY29sbGFwc2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBjb2xsYXBzZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGV4cGFuZGVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQElucHV0KClcbiAgZ2V0IGNvbGxhcHNlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY29sbGFwc2U7IH1cbiAgc2V0IGNvbGxhcHNlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY29sbGFwc2UgPSB2YWx1ZTtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRvZ2dsZSBjb2xsYXBzZVxuICAgKi9cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLl9jb2xsYXBzZSkgeyB0aGlzLmhpZGUoKTsgfSBlbHNlIHsgdGhpcy5zaG93KCk7IH1cbiAgfVxuXG4gIC8qKlxuICAqIHNob3cgY29sbGFwc2VcbiAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLl9jb2xsYXBzaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9jb2xsYXBzZSA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9jb2xsYXBzaW5nID0gZmFsc2U7XG4gICAgfSwgNCk7XG4gICAgdGhpcy5leHBhbmRlZC5lbWl0KCk7XG4gIH1cblxuICAvKipcbiAgICogaGlkZSBjb2xsYXBzZVxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLl9jb2xsYXBzaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9jb2xsYXBzZSA9IGZhbHNlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fY29sbGFwc2luZyA9IGZhbHNlO1xuICAgIH0sIDQpO1xuICAgIHRoaXMuY29sbGFwc2VkLmVtaXQoKTtcbiAgfVxuXG59XG4iXX0=