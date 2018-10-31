/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChildren, Directive, ElementRef, EventEmitter, Input, Output, QueryList, TemplateRef, ViewContainerRef, ViewEncapsulation, NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * Change event object that is emitted when the tab has changed.
 */
var /**
 * Change event object that is emitted when the tab has changed.
 */
Md2TabChange = /** @class */ (function () {
    function Md2TabChange(tab, index) {
        this.tab = tab;
        this.index = index;
    }
    return Md2TabChange;
}());
/**
 * Change event object that is emitted when the tab has changed.
 */
export { Md2TabChange };
if (false) {
    /** @type {?} */
    Md2TabChange.prototype.tab;
    /** @type {?} */
    Md2TabChange.prototype.index;
}
var Md2Transclude = /** @class */ (function () {
    function Md2Transclude(viewRef) {
        this.viewRef = viewRef;
    }
    Object.defineProperty(Md2Transclude.prototype, "md2Transclude", {
        get: /**
         * @return {?}
         */
        function () { return this._md2Transclude; },
        set: /**
         * @param {?} templateRef
         * @return {?}
         */
        function (templateRef) {
            this._md2Transclude = templateRef;
            if (templateRef) {
                this.viewRef.createEmbeddedView(templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    Md2Transclude.decorators = [
        { type: Directive, args: [{ selector: '[md2Transclude]' },] }
    ];
    /** @nocollapse */
    Md2Transclude.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    Md2Transclude.propDecorators = {
        md2Transclude: [{ type: Input }]
    };
    return Md2Transclude;
}());
export { Md2Transclude };
if (false) {
    /** @type {?} */
    Md2Transclude.prototype._md2Transclude;
    /** @type {?} */
    Md2Transclude.prototype.viewRef;
}
var Md2Tab = /** @class */ (function () {
    function Md2Tab() {
    }
    Md2Tab.decorators = [
        { type: Component, args: [{
                    selector: 'md2-tab',
                    template: "<ng-content></ng-content>",
                    host: {
                        '[class]': 'class',
                        '[class.active]': 'active'
                    }
                }] }
    ];
    Md2Tab.propDecorators = {
        label: [{ type: Input }],
        active: [{ type: Input }],
        disabled: [{ type: Input }],
        class: [{ type: Input }]
    };
    return Md2Tab;
}());
export { Md2Tab };
if (false) {
    /** @type {?} */
    Md2Tab.prototype.label;
    /** @type {?} */
    Md2Tab.prototype.active;
    /** @type {?} */
    Md2Tab.prototype.disabled;
    /** @type {?} */
    Md2Tab.prototype.class;
    /** @type {?} */
    Md2Tab.prototype.labelRef;
}
var Md2TabLabel = /** @class */ (function () {
    function Md2TabLabel(templateRef, tab) {
        this.templateRef = templateRef;
        tab.labelRef = templateRef;
    }
    Md2TabLabel.decorators = [
        { type: Directive, args: [{ selector: '[md2-tab-label]' },] }
    ];
    /** @nocollapse */
    Md2TabLabel.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: Md2Tab }
    ]; };
    return Md2TabLabel;
}());
export { Md2TabLabel };
if (false) {
    /** @type {?} */
    Md2TabLabel.prototype.templateRef;
}
var Md2Tabs = /** @class */ (function () {
    function Md2Tabs(elementRef) {
        this.elementRef = elementRef;
        this._isInitialized = false;
        this._focusIndex = 0;
        this._selectedIndex = 0;
        this._shouldPaginate = false;
        this._offsetLeft = 0;
        this._inkBarLeft = '0';
        this._inkBarWidth = '0';
        this.change = new EventEmitter();
        this.selectedIndexChange = new EventEmitter();
    }
    Object.defineProperty(Md2Tabs.prototype, "selectedIndex", {
        get: /**
         * @return {?}
         */
        function () { return this._selectedIndex; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                value = parseInt(value);
            }
            if (value !== this._selectedIndex) {
                this._selectedIndex = value;
                this.adjustOffset(value);
                this._updateInkBar();
                if (this.tabs) {
                    /** @type {?} */
                    var tabs = this.tabs.toArray();
                    if (!tabs[value].disabled) {
                        tabs.forEach(function (tab) { return tab.active = false; });
                        tabs[value].active = true;
                    }
                }
                if (this._isInitialized) {
                    this._emitChangeEvent();
                    this.selectedIndexChange.emit(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tabs.prototype, "focusIndex", {
        get: /**
         * @return {?}
         */
        function () { return this._focusIndex; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._focusIndex = value;
            this.adjustOffset(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tabs.prototype, "element", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var elements = {
                root: this.elementRef.nativeElement,
                wrapper: null,
                canvas: null,
                paging: null,
                tabs: null
            };
            elements.wrapper = elements.root.querySelector('.md2-tabs-header-wrapper');
            elements.canvas = elements.wrapper.querySelector('.md2-tabs-canvas');
            elements.paging = elements.canvas.querySelector('.md2-tabs-header');
            elements.tabs = elements.paging.querySelectorAll('.md2-tab-label');
            return elements;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After Content Init
     */
    /**
     * After Content Init
     * @return {?}
     */
    Md2Tabs.prototype.ngAfterContentInit = /**
     * After Content Init
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.updatePagination();
        }, 0);
        setTimeout(function () {
            /** @type {?} */
            var tabs = _this.tabs.toArray();
            if (_this.selectedIndex) {
                if (_this.selectedIndex >= tabs.length) {
                    _this.selectedIndex = 0;
                }
                tabs.forEach(function (tab) { return tab.active = false; });
                tabs[_this.selectedIndex].active = true;
                _this.adjustOffset(_this.selectedIndex);
            }
            else {
                /** @type {?} */
                var index = tabs.findIndex(function (t) { return t.active; });
                if (index < 0) {
                    tabs[0].active = true;
                }
                else {
                    _this.selectedIndex = index;
                }
            }
            _this._updateInkBar();
        }, 0);
        this._isInitialized = true;
    };
    /**
     * Calculates the styles from the selected tab for the ink-bar.
     * @return {?}
     */
    Md2Tabs.prototype._updateInkBar = /**
     * Calculates the styles from the selected tab for the ink-bar.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elements = this.element;
        if (!elements.tabs[this.selectedIndex]) {
            return;
        }
        /** @type {?} */
        var tab = elements.tabs[this.selectedIndex];
        this._inkBarLeft = tab.offsetLeft + 'px';
        this._inkBarWidth = tab.offsetWidth + 'px';
    };
    /** Emits an event when the user selects an option. */
    /**
     * Emits an event when the user selects an option.
     * @return {?}
     */
    Md2Tabs.prototype._emitChangeEvent = /**
     * Emits an event when the user selects an option.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var index = this._selectedIndex;
        this.change.emit(new Md2TabChange(this.tabs.toArray()[index], index));
    };
    /**
     * Focus next Tab
     */
    /**
     * Focus next Tab
     * @return {?}
     */
    Md2Tabs.prototype.focusNextTab = /**
     * Focus next Tab
     * @return {?}
     */
    function () { this.incrementIndex(1); };
    /**
     * Focus previous Tab
     */
    /**
     * Focus previous Tab
     * @return {?}
     */
    Md2Tabs.prototype.focusPreviousTab = /**
     * Focus previous Tab
     * @return {?}
     */
    function () { this.incrementIndex(-1); };
    /**
     * Mouse Wheel scroll
     * @param event
     */
    /**
     * Mouse Wheel scroll
     * @param {?} event
     * @return {?}
     */
    Md2Tabs.prototype.scroll = /**
     * Mouse Wheel scroll
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this._shouldPaginate) {
            return;
        }
        event.preventDefault();
        this._offsetLeft = this.fixOffset(this._offsetLeft - event.wheelDelta);
    };
    /**
     * Next Page
     */
    /**
     * Next Page
     * @return {?}
     */
    Md2Tabs.prototype.nextPage = /**
     * Next Page
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elements = this.element;
        /** @type {?} */
        var viewportWidth = elements.canvas.clientWidth;
        /** @type {?} */
        var totalWidth = viewportWidth + this._offsetLeft;
        /** @type {?} */
        var i;
        /** @type {?} */
        var tab;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth > totalWidth) {
                break;
            }
        }
        this._offsetLeft = this.fixOffset(tab.offsetLeft);
    };
    /**
     * Previous Page
     */
    /**
     * Previous Page
     * @return {?}
     */
    Md2Tabs.prototype.previousPage = /**
     * Previous Page
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i;
        /** @type {?} */
        var tab;
        /** @type {?} */
        var elements = this.element;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth >= this._offsetLeft) {
                break;
            }
        }
        this._offsetLeft = this.fixOffset(tab.offsetLeft +
            tab.offsetWidth - elements.canvas.clientWidth);
    };
    /**
     * On Window Resize
     * @param event
     */
    /**
     * On Window Resize
     * @return {?}
     */
    Md2Tabs.prototype.onWindowResize = /**
     * On Window Resize
     * @return {?}
     */
    function () {
        this._offsetLeft = this.fixOffset(this._offsetLeft);
        this.updatePagination();
    };
    /**
     * Can page Back
     */
    /**
     * Can page Back
     * @return {?}
     */
    Md2Tabs.prototype.canPageBack = /**
     * Can page Back
     * @return {?}
     */
    function () { return this._offsetLeft > 0; };
    /**
     * Can page Previous
     */
    /**
     * Can page Previous
     * @return {?}
     */
    Md2Tabs.prototype.canPageForward = /**
     * Can page Previous
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elements = this.element;
        /** @type {?} */
        var lastTab = elements.tabs[elements.tabs.length - 1];
        return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth +
            this._offsetLeft;
    };
    /**
     * Update Pagination
     */
    /**
     * Update Pagination
     * @return {?}
     */
    Md2Tabs.prototype.updatePagination = /**
     * Update Pagination
     * @return {?}
     */
    function () {
        /** @type {?} */
        var canvasWidth = this.element.root.clientWidth;
        /** @type {?} */
        var tabs = this.element.tabs ? this.element.tabs : [];
        for (var i = 0; i < tabs.length; i++) {
            canvasWidth -= tabs[i].offsetWidth;
        }
        this._shouldPaginate = canvasWidth < 0;
    };
    /**
     * Increment Focus Tab
     * @param inc
     */
    /**
     * Increment Focus Tab
     * @param {?} inc
     * @return {?}
     */
    Md2Tabs.prototype.incrementIndex = /**
     * Increment Focus Tab
     * @param {?} inc
     * @return {?}
     */
    function (inc) {
        /** @type {?} */
        var newIndex;
        /** @type {?} */
        var index = this.focusIndex;
        for (newIndex = index + inc; this.tabs.toArray()[newIndex] && this.tabs.toArray()[newIndex].disabled; newIndex += inc) { }
        if (this.tabs.toArray()[newIndex]) {
            this.focusIndex = newIndex;
        }
    };
    /**
     * Adjust Offset of Tab
     * @param index
     */
    /**
     * Adjust Offset of Tab
     * @param {?} index
     * @return {?}
     */
    Md2Tabs.prototype.adjustOffset = /**
     * Adjust Offset of Tab
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var elements = this.element;
        if (!elements.tabs[index]) {
            return;
        }
        /** @type {?} */
        var tab = elements.tabs[index];
        /** @type {?} */
        var left = tab.offsetLeft;
        /** @type {?} */
        var right = tab.offsetWidth + left;
        this._offsetLeft = Math.max(this._offsetLeft, this.fixOffset(right - elements.canvas.clientWidth + 32 * 2));
        this._offsetLeft = Math.min(this._offsetLeft, this.fixOffset(left));
    };
    /**
     * Fix Offset of Tab
     * @param value
     * @return value
     */
    /**
     * Fix Offset of Tab
     * @param {?} value
     * @return {?} value
     */
    Md2Tabs.prototype.fixOffset = /**
     * Fix Offset of Tab
     * @param {?} value
     * @return {?} value
     */
    function (value) {
        /** @type {?} */
        var elements = this.element;
        if (!elements.tabs.length || !this._shouldPaginate) {
            return 0;
        }
        /** @type {?} */
        var lastTab = elements.tabs[elements.tabs.length - 1];
        /** @type {?} */
        var totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
        value = Math.min(totalWidth - elements.canvas.clientWidth, value);
        value = Math.max(0, value);
        return value;
    };
    Md2Tabs.decorators = [
        { type: Component, args: [{
                    selector: 'md2-tabs',
                    template: "<div class=\"md2-tabs-header-wrapper\">\n  <div role=\"button\" class=\"md2-prev-button\" [class.disabled]=\"!canPageBack()\" *ngIf=\"_shouldPaginate\" (click)=\"previousPage()\">\n    <em class=\"prev-icon\">Prev</em>\n  </div>\n  <div role=\"button\" class=\"md2-next-button\" [class.disabled]=\"!canPageForward()\" *ngIf=\"_shouldPaginate\" (click)=\"nextPage()\">\n    <em class=\"next-icon\">Next</em>\n  </div>\n  <div class=\"md2-tabs-canvas\" [class.md2-paginated]=\"_shouldPaginate\" role=\"tablist\" tabindex=\"0\" (keydown.arrowRight)=\"focusNextTab()\" (keydown.arrowLeft)=\"focusPreviousTab()\" (keydown.enter)=\"selectedIndex = focusIndex\" (mousewheel)=\"scroll($event)\">\n    <div class=\"md2-tabs-header\" [style.marginLeft.px]=\"-_offsetLeft\">\n      <div class=\"md2-tab-label\" role=\"tab\" *ngFor=\"let tab of tabs; let i = index\" [class.focus]=\"focusIndex === i\" [class.active]=\"selectedIndex === i\" [class.disabled]=\"tab.disabled\" (click)=\"focusIndex = selectedIndex = i\">\n        <span [md2Transclude]=\"tab.labelRef\">{{tab.label}}</span>\n      </div>\n      <div class=\"md2-tab-ink-bar\" [style.left]=\"_inkBarLeft\" [style.width]=\"_inkBarWidth\"></div>\n    </div>\n  </div>\n</div>\n<div class=\"md2-tabs-body-wrapper\">\n  <ng-content></ng-content>\n</div>\n",
                    host: {
                        '[class]': 'class',
                        '(window:resize)': 'onWindowResize()'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: ["md2-tabs{position:relative;overflow:hidden;display:block;margin:0;border:1px solid #e1e1e1;border-radius:2px}.md2-tabs-header-wrapper{position:relative;display:block;height:48px;background:#fff;border-width:0 0 1px;border-style:solid;border-color:rgba(0,0,0,.12);margin:0;padding:0;list-style:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md2-tabs-header-wrapper::after{content:'';display:table;clear:both}.md2-next-button,.md2-prev-button{position:absolute;top:0;height:100%;width:32px;padding:8px 0;z-index:2;cursor:pointer}.md2-next-button.disabled,.md2-prev-button.disabled{opacity:.25;cursor:default}.md2-prev-button{left:0}.md2-next-button{right:0}.md2-next-button .next-icon,.md2-prev-button .prev-icon{display:block;width:12px;height:12px;font-size:0;border-width:0 0 2px 2px;border-style:solid;border-color:#757575;border-radius:1px;-webkit-transform:rotate(45deg);transform:rotate(45deg);margin:10px}.md2-next-button .next-icon{border-width:2px 2px 0 0}.md2-tabs-canvas{position:relative;height:100%;overflow:hidden;display:block;outline:0}.md2-tabs-canvas.md2-paginated{margin:0 32px}.md2-tabs-header{position:relative;display:inline-block;height:100%;white-space:nowrap;transition:.5s cubic-bezier(.35,0,.25,1)}.md2-tab-label{position:relative;height:100%;color:rgba(0,0,0,.54);font-size:14px;text-align:center;line-height:24px;padding:12px 24px;transition:background-color 350ms cubic-bezier(.35,0,.25,1);cursor:pointer;white-space:nowrap;text-transform:uppercase;display:inline-block;font-weight:500;box-sizing:border-box;overflow:hidden;-ms-text-overflow:ellipsis;text-overflow:ellipsis}.md2-tab-label.active{color:#106cc8}.md2-tabs-canvas:focus .md2-tab-label.focus{background:rgba(0,0,0,.05)}.md2-tab-label.disabled{color:rgba(0,0,0,.26);pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none;opacity:.5;cursor:default}.md2-tab-ink-bar{position:absolute;bottom:0;height:2px;background:#ff5252;transition:250ms cubic-bezier(.35,0,.25,1)}.md2-tabs-body-wrapper{position:relative;min-height:0;display:block;clear:both}md2-tab{padding:16px;display:none;position:relative}md2-tab.active{display:block;position:relative}"]
                }] }
    ];
    /** @nocollapse */
    Md2Tabs.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    Md2Tabs.propDecorators = {
        tabs: [{ type: ContentChildren, args: [Md2Tab,] }],
        class: [{ type: Input }],
        selectedIndex: [{ type: Input }],
        change: [{ type: Output }],
        selectedIndexChange: [{ type: Output }]
    };
    return Md2Tabs;
}());
export { Md2Tabs };
if (false) {
    /** @type {?} */
    Md2Tabs.prototype.tabs;
    /** @type {?} */
    Md2Tabs.prototype._isInitialized;
    /** @type {?} */
    Md2Tabs.prototype._focusIndex;
    /** @type {?} */
    Md2Tabs.prototype._selectedIndex;
    /** @type {?} */
    Md2Tabs.prototype._shouldPaginate;
    /** @type {?} */
    Md2Tabs.prototype._offsetLeft;
    /** @type {?} */
    Md2Tabs.prototype._inkBarLeft;
    /** @type {?} */
    Md2Tabs.prototype._inkBarWidth;
    /** @type {?} */
    Md2Tabs.prototype.class;
    /** @type {?} */
    Md2Tabs.prototype.change;
    /** @type {?} */
    Md2Tabs.prototype.selectedIndexChange;
    /** @type {?} */
    Md2Tabs.prototype.elementRef;
}
/** @type {?} */
export var MD2_TABS_DIRECTIVES = [Md2TabLabel, Md2Tabs, Md2Tab];
var Md2TabsModule = /** @class */ (function () {
    function Md2TabsModule() {
    }
    Md2TabsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: MD2_TABS_DIRECTIVES,
                    declarations: [Md2Transclude, Md2TabLabel, Md2Tabs, Md2Tab],
                },] }
    ];
    return Md2TabsModule;
}());
export { Md2TabsModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL3RhYnMvdGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUcvQzs7O0FBQUE7SUFDRSxzQkFBbUIsR0FBVyxFQUFTLEtBQWE7UUFBakMsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7S0FBSzt1QkFuQjNEO0lBb0JDLENBQUE7Ozs7QUFGRCx3QkFFQzs7Ozs7Ozs7SUFPQyx1QkFBbUIsT0FBeUI7UUFBekIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7S0FBSztJQUVqRCxzQkFDSSx3Q0FBYTs7OztRQURqQixjQUNzQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTs7Ozs7UUFDbkQsVUFBa0IsV0FBNkI7WUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUM7WUFDbEMsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM5QztTQUNGOzs7T0FOa0Q7O2dCQVJwRCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUU7Ozs7Z0JBWHhDLGdCQUFnQjs7O2dDQWtCZixLQUFLOzt3QkE3QlI7O1NBdUJhLGFBQWE7Ozs7Ozs7Ozs7O2dCQWlCekIsU0FBUyxTQUFDO29CQUVULFFBQVEsRUFBRSxTQUFTO29CQUNuQixRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxJ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a3lDQUF3QjtvQkFFeEIsSUFBSSxFQUFFO3dCQUNKLFNBQVMsRUFBRSxPQUFPO3dCQUNsQixpQkFBaUIsRUFBRSxrQkFBa0I7cUJBQ3RDO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7Ozs7Z0JBM0VDLFVBQVU7Ozt1QkE4RVQsZUFBZSxTQUFDLE1BQU07d0JBVXRCLEtBQUs7Z0NBRUwsS0FBSzt5QkEyQ0wsTUFBTTtzQ0FDTixNQUFNOztrQkEzSVQ7O1NBaUZhLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnUHBCLFdBQWEsbUJBQW1CLEdBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7OztnQkFFeEUsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLG1CQUFtQjtvQkFDNUIsWUFBWSxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO2lCQUM1RDs7d0JBdlVEOztTQXdVYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgTmdNb2R1bGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIHRhYiBoYXMgY2hhbmdlZC4gKi9cbmV4cG9ydCBjbGFzcyBNZDJUYWJDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFiOiBNZDJUYWIsIHB1YmxpYyBpbmRleDogbnVtYmVyKSB7IH1cbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW21kMlRyYW5zY2x1ZGVdJyB9KVxuZXhwb3J0IGNsYXNzIE1kMlRyYW5zY2x1ZGUge1xuXG4gIHByaXZhdGUgX21kMlRyYW5zY2x1ZGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBtZDJUcmFuc2NsdWRlKCkgeyByZXR1cm4gdGhpcy5fbWQyVHJhbnNjbHVkZTsgfVxuICBzZXQgbWQyVHJhbnNjbHVkZSh0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge1xuICAgIHRoaXMuX21kMlRyYW5zY2x1ZGUgPSB0ZW1wbGF0ZVJlZjtcbiAgICBpZiAodGVtcGxhdGVSZWYpIHtcbiAgICAgIHRoaXMudmlld1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGVSZWYpO1xuICAgIH1cbiAgfVxuXG59XG5cbkBDb21wb25lbnQoe1xuICBcbiAgc2VsZWN0b3I6ICdtZDItdGFiJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3NdJzogJ2NsYXNzJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1kMlRhYiB7XG5cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICBASW5wdXQoKSBhY3RpdmU6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgY2xhc3M6IHN0cmluZztcblxuICBsYWJlbFJlZjogVGVtcGxhdGVSZWY8YW55PjtcblxufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbWQyLXRhYi1sYWJlbF0nIH0pXG5leHBvcnQgY2xhc3MgTWQyVGFiTGFiZWwge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIHRhYjogTWQyVGFiKSB7XG4gICAgdGFiLmxhYmVsUmVmID0gdGVtcGxhdGVSZWY7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIFxuICBzZWxlY3RvcjogJ21kMi10YWJzJyxcbiAgdGVtcGxhdGVVcmw6ICd0YWJzLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGFicy5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzXSc6ICdjbGFzcycsXG4gICAgJyh3aW5kb3c6cmVzaXplKSc6ICdvbldpbmRvd1Jlc2l6ZSgpJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1kMlRhYnMgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICBAQ29udGVudENoaWxkcmVuKE1kMlRhYikgdGFiczogUXVlcnlMaXN0PE1kMlRhYj47XG5cbiAgcHJpdmF0ZSBfaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9mb2N1c0luZGV4OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9zZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuICBfc2hvdWxkUGFnaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX29mZnNldExlZnQ6IG51bWJlciA9IDA7XG4gIF9pbmtCYXJMZWZ0OiBzdHJpbmcgPSAnMCc7XG4gIF9pbmtCYXJXaWR0aDogc3RyaW5nID0gJzAnO1xuXG4gIEBJbnB1dCgpIGNsYXNzOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkSW5kZXgoKSB7IHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4OyB9XG4gIHNldCBzZWxlY3RlZEluZGV4KHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgeyB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTsgfVxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fc2VsZWN0ZWRJbmRleCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHZhbHVlO1xuICAgICAgdGhpcy5hZGp1c3RPZmZzZXQodmFsdWUpO1xuICAgICAgdGhpcy5fdXBkYXRlSW5rQmFyKCk7XG4gICAgICBpZiAodGhpcy50YWJzKSB7XG4gICAgICAgIGNvbnN0IHRhYnMgPSB0aGlzLnRhYnMudG9BcnJheSgpO1xuICAgICAgICBpZiAoIXRhYnNbdmFsdWVdLmRpc2FibGVkKSB7XG4gICAgICAgICAgdGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgICAgIHRhYnNbdmFsdWVdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9pc0luaXRpYWxpemVkKSB7XG4gICAgICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXhDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IGZvY3VzSW5kZXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2ZvY3VzSW5kZXg7IH1cbiAgc2V0IGZvY3VzSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2ZvY3VzSW5kZXggPSB2YWx1ZTtcbiAgICB0aGlzLmFkanVzdE9mZnNldCh2YWx1ZSk7XG4gIH1cblxuICBnZXQgZWxlbWVudCgpIHtcbiAgICBjb25zdCBlbGVtZW50czogYW55ID0ge1xuICAgICAgcm9vdDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICB3cmFwcGVyOiBudWxsLFxuICAgICAgY2FudmFzOiBudWxsLFxuICAgICAgcGFnaW5nOiBudWxsLFxuICAgICAgdGFiczogbnVsbFxuICAgIH07XG4gICAgZWxlbWVudHMud3JhcHBlciA9IGVsZW1lbnRzLnJvb3QucXVlcnlTZWxlY3RvcignLm1kMi10YWJzLWhlYWRlci13cmFwcGVyJyk7XG4gICAgZWxlbWVudHMuY2FudmFzID0gZWxlbWVudHMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcubWQyLXRhYnMtY2FudmFzJyk7XG4gICAgZWxlbWVudHMucGFnaW5nID0gZWxlbWVudHMuY2FudmFzLnF1ZXJ5U2VsZWN0b3IoJy5tZDItdGFicy1oZWFkZXInKTtcbiAgICBlbGVtZW50cy50YWJzID0gZWxlbWVudHMucGFnaW5nLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZDItdGFiLWxhYmVsJyk7XG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9XG5cbiAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPE1kMlRhYkNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1kMlRhYkNoYW5nZT4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdGVkSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cblxuICAvKipcbiAgICogQWZ0ZXIgQ29udGVudCBJbml0XG4gICAqL1xuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb24oKTtcbiAgICB9LCAwKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHRhYnMgPSB0aGlzLnRhYnMudG9BcnJheSgpO1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4ID49IHRhYnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0YWJzLmZvckVhY2godGFiID0+IHRhYi5hY3RpdmUgPSBmYWxzZSk7XG4gICAgICAgIHRhYnNbdGhpcy5zZWxlY3RlZEluZGV4XS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmFkanVzdE9mZnNldCh0aGlzLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGFicy5maW5kSW5kZXgoKHQ6IGFueSkgPT4gdC5hY3RpdmUpO1xuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgdGFic1swXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl91cGRhdGVJbmtCYXIoKTtcbiAgICB9LCAwKTtcbiAgICB0aGlzLl9pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzdHlsZXMgZnJvbSB0aGUgc2VsZWN0ZWQgdGFiIGZvciB0aGUgaW5rLWJhci5cbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZUlua0JhcigpOiB2b2lkIHtcbiAgICBsZXQgZWxlbWVudHMgPSB0aGlzLmVsZW1lbnQ7XG4gICAgaWYgKCFlbGVtZW50cy50YWJzW3RoaXMuc2VsZWN0ZWRJbmRleF0pIHsgcmV0dXJuOyB9XG4gICAgbGV0IHRhYiA9IGVsZW1lbnRzLnRhYnNbdGhpcy5zZWxlY3RlZEluZGV4XTtcbiAgICB0aGlzLl9pbmtCYXJMZWZ0ID0gdGFiLm9mZnNldExlZnQgKyAncHgnO1xuICAgIHRoaXMuX2lua0JhcldpZHRoID0gdGFiLm9mZnNldFdpZHRoICsgJ3B4JztcbiAgfVxuXG4gIC8qKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYW4gb3B0aW9uLiAqL1xuICBfZW1pdENoYW5nZUV2ZW50KCk6IHZvaWQge1xuICAgIGxldCBpbmRleCA9IHRoaXMuX3NlbGVjdGVkSW5kZXg7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChuZXcgTWQyVGFiQ2hhbmdlKHRoaXMudGFicy50b0FycmF5KClbaW5kZXhdLCBpbmRleCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIG5leHQgVGFiXG4gICAqL1xuICBmb2N1c05leHRUYWIoKSB7IHRoaXMuaW5jcmVtZW50SW5kZXgoMSk7IH1cblxuICAvKipcbiAgICogRm9jdXMgcHJldmlvdXMgVGFiXG4gICAqL1xuICBmb2N1c1ByZXZpb3VzVGFiKCkgeyB0aGlzLmluY3JlbWVudEluZGV4KC0xKTsgfVxuXG4gIC8qKlxuICAgKiBNb3VzZSBXaGVlbCBzY3JvbGxcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBzY3JvbGwoZXZlbnQ6IGFueSkge1xuICAgIGlmICghdGhpcy5fc2hvdWxkUGFnaW5hdGUpIHsgcmV0dXJuOyB9XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLl9vZmZzZXRMZWZ0ID0gdGhpcy5maXhPZmZzZXQodGhpcy5fb2Zmc2V0TGVmdCAtIGV2ZW50LndoZWVsRGVsdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5leHQgUGFnZVxuICAgKi9cbiAgbmV4dFBhZ2UoKSB7XG4gICAgbGV0IGVsZW1lbnRzID0gdGhpcy5lbGVtZW50O1xuICAgIGxldCB2aWV3cG9ydFdpZHRoID0gZWxlbWVudHMuY2FudmFzLmNsaWVudFdpZHRoLFxuICAgICAgdG90YWxXaWR0aCA9IHZpZXdwb3J0V2lkdGggKyB0aGlzLl9vZmZzZXRMZWZ0LFxuICAgICAgaTogbnVtYmVyLCB0YWI6IGFueTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgZWxlbWVudHMudGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgdGFiID0gZWxlbWVudHMudGFic1tpXTtcbiAgICAgIGlmICh0YWIub2Zmc2V0TGVmdCArIHRhYi5vZmZzZXRXaWR0aCA+IHRvdGFsV2lkdGgpIHsgYnJlYWs7IH1cbiAgICB9XG4gICAgdGhpcy5fb2Zmc2V0TGVmdCA9IHRoaXMuZml4T2Zmc2V0KHRhYi5vZmZzZXRMZWZ0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmV2aW91cyBQYWdlXG4gICAqL1xuICBwcmV2aW91c1BhZ2UoKSB7XG4gICAgbGV0IGk6IG51bWJlciwgdGFiOiBhbnksIGVsZW1lbnRzID0gdGhpcy5lbGVtZW50O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGVsZW1lbnRzLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRhYiA9IGVsZW1lbnRzLnRhYnNbaV07XG4gICAgICBpZiAodGFiLm9mZnNldExlZnQgKyB0YWIub2Zmc2V0V2lkdGggPj0gdGhpcy5fb2Zmc2V0TGVmdCkgeyBicmVhazsgfVxuICAgIH1cbiAgICB0aGlzLl9vZmZzZXRMZWZ0ID0gdGhpcy5maXhPZmZzZXQodGFiLm9mZnNldExlZnQgK1xuICAgICAgdGFiLm9mZnNldFdpZHRoIC0gZWxlbWVudHMuY2FudmFzLmNsaWVudFdpZHRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBXaW5kb3cgUmVzaXplXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgb25XaW5kb3dSZXNpemUoKSB7XG4gICAgdGhpcy5fb2Zmc2V0TGVmdCA9IHRoaXMuZml4T2Zmc2V0KHRoaXMuX29mZnNldExlZnQpO1xuICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbiBwYWdlIEJhY2tcbiAgICovXG4gIGNhblBhZ2VCYWNrKCkgeyByZXR1cm4gdGhpcy5fb2Zmc2V0TGVmdCA+IDA7IH1cblxuICAvKipcbiAgICogQ2FuIHBhZ2UgUHJldmlvdXNcbiAgICovXG4gIGNhblBhZ2VGb3J3YXJkKCkge1xuICAgIGxldCBlbGVtZW50cyA9IHRoaXMuZWxlbWVudDtcbiAgICBsZXQgbGFzdFRhYiA9IGVsZW1lbnRzLnRhYnNbZWxlbWVudHMudGFicy5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gbGFzdFRhYiAmJiBsYXN0VGFiLm9mZnNldExlZnQgKyBsYXN0VGFiLm9mZnNldFdpZHRoID4gZWxlbWVudHMuY2FudmFzLmNsaWVudFdpZHRoICtcbiAgICAgIHRoaXMuX29mZnNldExlZnQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIFBhZ2luYXRpb25cbiAgICovXG4gIHVwZGF0ZVBhZ2luYXRpb24oKSB7XG4gICAgbGV0IGNhbnZhc1dpZHRoID0gdGhpcy5lbGVtZW50LnJvb3QuY2xpZW50V2lkdGg7XG4gICAgbGV0IHRhYnM6IGFueVtdID0gdGhpcy5lbGVtZW50LnRhYnMgPyB0aGlzLmVsZW1lbnQudGFicyA6IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgY2FudmFzV2lkdGggLT0gdGFic1tpXS5vZmZzZXRXaWR0aDtcbiAgICB9XG4gICAgdGhpcy5fc2hvdWxkUGFnaW5hdGUgPSBjYW52YXNXaWR0aCA8IDA7XG4gIH1cblxuICAvKipcbiAgICogSW5jcmVtZW50IEZvY3VzIFRhYlxuICAgKiBAcGFyYW0gaW5jXG4gICAqL1xuICBpbmNyZW1lbnRJbmRleChpbmM6IGFueSkge1xuICAgIGxldCBuZXdJbmRleDogbnVtYmVyLFxuICAgICAgaW5kZXggPSB0aGlzLmZvY3VzSW5kZXg7XG4gICAgZm9yIChuZXdJbmRleCA9IGluZGV4ICsgaW5jO1xuICAgICAgdGhpcy50YWJzLnRvQXJyYXkoKVtuZXdJbmRleF0gJiYgdGhpcy50YWJzLnRvQXJyYXkoKVtuZXdJbmRleF0uZGlzYWJsZWQ7XG4gICAgICBuZXdJbmRleCArPSBpbmMpIHsgfVxuICAgIGlmICh0aGlzLnRhYnMudG9BcnJheSgpW25ld0luZGV4XSkge1xuICAgICAgdGhpcy5mb2N1c0luZGV4ID0gbmV3SW5kZXg7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkanVzdCBPZmZzZXQgb2YgVGFiXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKi9cbiAgYWRqdXN0T2Zmc2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgZWxlbWVudHMgPSB0aGlzLmVsZW1lbnQ7XG4gICAgaWYgKCFlbGVtZW50cy50YWJzW2luZGV4XSkgeyByZXR1cm47IH1cbiAgICBsZXQgdGFiID0gZWxlbWVudHMudGFic1tpbmRleF0sXG4gICAgICBsZWZ0ID0gdGFiLm9mZnNldExlZnQsXG4gICAgICByaWdodCA9IHRhYi5vZmZzZXRXaWR0aCArIGxlZnQ7XG4gICAgdGhpcy5fb2Zmc2V0TGVmdCA9IE1hdGgubWF4KHRoaXMuX29mZnNldExlZnQsXG4gICAgICB0aGlzLmZpeE9mZnNldChyaWdodCAtIGVsZW1lbnRzLmNhbnZhcy5jbGllbnRXaWR0aCArIDMyICogMikpO1xuICAgIHRoaXMuX29mZnNldExlZnQgPSBNYXRoLm1pbih0aGlzLl9vZmZzZXRMZWZ0LCB0aGlzLmZpeE9mZnNldChsZWZ0KSk7XG4gIH1cblxuICAvKipcbiAgICogRml4IE9mZnNldCBvZiBUYWJcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEByZXR1cm4gdmFsdWVcbiAgICovXG4gIGZpeE9mZnNldCh2YWx1ZTogYW55KSB7XG4gICAgbGV0IGVsZW1lbnRzID0gdGhpcy5lbGVtZW50O1xuICAgIGlmICghZWxlbWVudHMudGFicy5sZW5ndGggfHwgIXRoaXMuX3Nob3VsZFBhZ2luYXRlKSB7IHJldHVybiAwOyB9XG4gICAgbGV0IGxhc3RUYWIgPSBlbGVtZW50cy50YWJzW2VsZW1lbnRzLnRhYnMubGVuZ3RoIC0gMV0sXG4gICAgICB0b3RhbFdpZHRoID0gbGFzdFRhYi5vZmZzZXRMZWZ0ICsgbGFzdFRhYi5vZmZzZXRXaWR0aDtcbiAgICB2YWx1ZSA9IE1hdGgubWluKHRvdGFsV2lkdGggLSBlbGVtZW50cy5jYW52YXMuY2xpZW50V2lkdGgsIHZhbHVlKTtcbiAgICB2YWx1ZSA9IE1hdGgubWF4KDAsIHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxufVxuXG5leHBvcnQgY29uc3QgTUQyX1RBQlNfRElSRUNUSVZFUzogYW55W10gPSBbTWQyVGFiTGFiZWwsIE1kMlRhYnMsIE1kMlRhYl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBNRDJfVEFCU19ESVJFQ1RJVkVTLFxuICBkZWNsYXJhdGlvbnM6IFtNZDJUcmFuc2NsdWRlLCBNZDJUYWJMYWJlbCwgTWQyVGFicywgTWQyVGFiXSxcbn0pXG5leHBvcnQgY2xhc3MgTWQyVGFic01vZHVsZSB7IH1cbiJdfQ==