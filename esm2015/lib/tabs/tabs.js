/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChildren, Directive, ElementRef, EventEmitter, Input, Output, QueryList, TemplateRef, ViewContainerRef, ViewEncapsulation, NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * Change event object that is emitted when the tab has changed.
 */
export class Md2TabChange {
    /**
     * @param {?} tab
     * @param {?} index
     */
    constructor(tab, index) {
        this.tab = tab;
        this.index = index;
    }
}
if (false) {
    /** @type {?} */
    Md2TabChange.prototype.tab;
    /** @type {?} */
    Md2TabChange.prototype.index;
}
export class Md2Transclude {
    /**
     * @param {?} viewRef
     */
    constructor(viewRef) {
        this.viewRef = viewRef;
    }
    /**
     * @return {?}
     */
    get md2Transclude() { return this._md2Transclude; }
    /**
     * @param {?} templateRef
     * @return {?}
     */
    set md2Transclude(templateRef) {
        this._md2Transclude = templateRef;
        if (templateRef) {
            this.viewRef.createEmbeddedView(templateRef);
        }
    }
}
Md2Transclude.decorators = [
    { type: Directive, args: [{ selector: '[md2Transclude]' },] }
];
/** @nocollapse */
Md2Transclude.ctorParameters = () => [
    { type: ViewContainerRef }
];
Md2Transclude.propDecorators = {
    md2Transclude: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    Md2Transclude.prototype._md2Transclude;
    /** @type {?} */
    Md2Transclude.prototype.viewRef;
}
export class Md2Tab {
}
Md2Tab.decorators = [
    { type: Component, args: [{
                selector: 'md2-tab',
                template: `<ng-content></ng-content>`,
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
export class Md2TabLabel {
    /**
     * @param {?} templateRef
     * @param {?} tab
     */
    constructor(templateRef, tab) {
        this.templateRef = templateRef;
        tab.labelRef = templateRef;
    }
}
Md2TabLabel.decorators = [
    { type: Directive, args: [{ selector: '[md2-tab-label]' },] }
];
/** @nocollapse */
Md2TabLabel.ctorParameters = () => [
    { type: TemplateRef },
    { type: Md2Tab }
];
if (false) {
    /** @type {?} */
    Md2TabLabel.prototype.templateRef;
}
export class Md2Tabs {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
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
    /**
     * @return {?}
     */
    get selectedIndex() { return this._selectedIndex; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectedIndex(value) {
        if (typeof value === 'string') {
            value = parseInt(value);
        }
        if (value !== this._selectedIndex) {
            this._selectedIndex = value;
            this.adjustOffset(value);
            this._updateInkBar();
            if (this.tabs) {
                /** @type {?} */
                const tabs = this.tabs.toArray();
                if (!tabs[value].disabled) {
                    tabs.forEach(tab => tab.active = false);
                    tabs[value].active = true;
                }
            }
            if (this._isInitialized) {
                this._emitChangeEvent();
                this.selectedIndexChange.emit(value);
            }
        }
    }
    /**
     * @return {?}
     */
    get focusIndex() { return this._focusIndex; }
    /**
     * @param {?} value
     * @return {?}
     */
    set focusIndex(value) {
        this._focusIndex = value;
        this.adjustOffset(value);
    }
    /**
     * @return {?}
     */
    get element() {
        /** @type {?} */
        const elements = {
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
    }
    /**
     * After Content Init
     * @return {?}
     */
    ngAfterContentInit() {
        setTimeout(() => {
            this.updatePagination();
        }, 0);
        setTimeout(() => {
            /** @type {?} */
            const tabs = this.tabs.toArray();
            if (this.selectedIndex) {
                if (this.selectedIndex >= tabs.length) {
                    this.selectedIndex = 0;
                }
                tabs.forEach(tab => tab.active = false);
                tabs[this.selectedIndex].active = true;
                this.adjustOffset(this.selectedIndex);
            }
            else {
                /** @type {?} */
                let index = tabs.findIndex((t) => t.active);
                if (index < 0) {
                    tabs[0].active = true;
                }
                else {
                    this.selectedIndex = index;
                }
            }
            this._updateInkBar();
        }, 0);
        this._isInitialized = true;
    }
    /**
     * Calculates the styles from the selected tab for the ink-bar.
     * @return {?}
     */
    _updateInkBar() {
        /** @type {?} */
        let elements = this.element;
        if (!elements.tabs[this.selectedIndex]) {
            return;
        }
        /** @type {?} */
        let tab = elements.tabs[this.selectedIndex];
        this._inkBarLeft = tab.offsetLeft + 'px';
        this._inkBarWidth = tab.offsetWidth + 'px';
    }
    /**
     * Emits an event when the user selects an option.
     * @return {?}
     */
    _emitChangeEvent() {
        /** @type {?} */
        let index = this._selectedIndex;
        this.change.emit(new Md2TabChange(this.tabs.toArray()[index], index));
    }
    /**
     * Focus next Tab
     * @return {?}
     */
    focusNextTab() { this.incrementIndex(1); }
    /**
     * Focus previous Tab
     * @return {?}
     */
    focusPreviousTab() { this.incrementIndex(-1); }
    /**
     * Mouse Wheel scroll
     * @param {?} event
     * @return {?}
     */
    scroll(event) {
        if (!this._shouldPaginate) {
            return;
        }
        event.preventDefault();
        this._offsetLeft = this.fixOffset(this._offsetLeft - event.wheelDelta);
    }
    /**
     * Next Page
     * @return {?}
     */
    nextPage() {
        /** @type {?} */
        let elements = this.element;
        /** @type {?} */
        let viewportWidth = elements.canvas.clientWidth;
        /** @type {?} */
        let totalWidth = viewportWidth + this._offsetLeft;
        /** @type {?} */
        let i;
        /** @type {?} */
        let tab;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth > totalWidth) {
                break;
            }
        }
        this._offsetLeft = this.fixOffset(tab.offsetLeft);
    }
    /**
     * Previous Page
     * @return {?}
     */
    previousPage() {
        /** @type {?} */
        let i;
        /** @type {?} */
        let tab;
        /** @type {?} */
        let elements = this.element;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth >= this._offsetLeft) {
                break;
            }
        }
        this._offsetLeft = this.fixOffset(tab.offsetLeft +
            tab.offsetWidth - elements.canvas.clientWidth);
    }
    /**
     * On Window Resize
     * @return {?}
     */
    onWindowResize() {
        this._offsetLeft = this.fixOffset(this._offsetLeft);
        this.updatePagination();
    }
    /**
     * Can page Back
     * @return {?}
     */
    canPageBack() { return this._offsetLeft > 0; }
    /**
     * Can page Previous
     * @return {?}
     */
    canPageForward() {
        /** @type {?} */
        let elements = this.element;
        /** @type {?} */
        let lastTab = elements.tabs[elements.tabs.length - 1];
        return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth +
            this._offsetLeft;
    }
    /**
     * Update Pagination
     * @return {?}
     */
    updatePagination() {
        /** @type {?} */
        let canvasWidth = this.element.root.clientWidth;
        /** @type {?} */
        let tabs = this.element.tabs ? this.element.tabs : [];
        for (let i = 0; i < tabs.length; i++) {
            canvasWidth -= tabs[i].offsetWidth;
        }
        this._shouldPaginate = canvasWidth < 0;
    }
    /**
     * Increment Focus Tab
     * @param {?} inc
     * @return {?}
     */
    incrementIndex(inc) {
        /** @type {?} */
        let newIndex;
        /** @type {?} */
        let index = this.focusIndex;
        for (newIndex = index + inc; this.tabs.toArray()[newIndex] && this.tabs.toArray()[newIndex].disabled; newIndex += inc) { }
        if (this.tabs.toArray()[newIndex]) {
            this.focusIndex = newIndex;
        }
    }
    /**
     * Adjust Offset of Tab
     * @param {?} index
     * @return {?}
     */
    adjustOffset(index) {
        /** @type {?} */
        let elements = this.element;
        if (!elements.tabs[index]) {
            return;
        }
        /** @type {?} */
        let tab = elements.tabs[index];
        /** @type {?} */
        let left = tab.offsetLeft;
        /** @type {?} */
        let right = tab.offsetWidth + left;
        this._offsetLeft = Math.max(this._offsetLeft, this.fixOffset(right - elements.canvas.clientWidth + 32 * 2));
        this._offsetLeft = Math.min(this._offsetLeft, this.fixOffset(left));
    }
    /**
     * Fix Offset of Tab
     * @param {?} value
     * @return {?} value
     */
    fixOffset(value) {
        /** @type {?} */
        let elements = this.element;
        if (!elements.tabs.length || !this._shouldPaginate) {
            return 0;
        }
        /** @type {?} */
        let lastTab = elements.tabs[elements.tabs.length - 1];
        /** @type {?} */
        let totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
        value = Math.min(totalWidth - elements.canvas.clientWidth, value);
        value = Math.max(0, value);
        return value;
    }
}
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
Md2Tabs.ctorParameters = () => [
    { type: ElementRef }
];
Md2Tabs.propDecorators = {
    tabs: [{ type: ContentChildren, args: [Md2Tab,] }],
    class: [{ type: Input }],
    selectedIndex: [{ type: Input }],
    change: [{ type: Output }],
    selectedIndexChange: [{ type: Output }]
};
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
export const MD2_TABS_DIRECTIVES = [Md2TabLabel, Md2Tabs, Md2Tab];
export class Md2TabsModule {
}
Md2TabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: MD2_TABS_DIRECTIVES,
                declarations: [Md2Transclude, Md2TabLabel, Md2Tabs, Md2Tab],
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL3RhYnMvdGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUcvQyxNQUFNOzs7OztJQUNKLFlBQW1CLEdBQVcsRUFBUyxLQUFhO1FBQWpDLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFRO0tBQUs7Q0FDMUQ7Ozs7Ozs7QUFHRCxNQUFNOzs7O0lBSUosWUFBbUIsT0FBeUI7UUFBekIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7S0FBSzs7OztJQUVqRCxJQUNJLGFBQWEsS0FBSyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTs7Ozs7SUFDbkQsSUFBSSxhQUFhLENBQUMsV0FBNkI7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUM7UUFDbEMsSUFBSSxXQUFXLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzlDO0tBQ0Y7OztZQWRGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTs7OztZQVh4QyxnQkFBZ0I7Ozs0QkFrQmYsS0FBSzs7Ozs7Ozs7QUFvQlIsTUFBTTs7O1lBVEwsU0FBUyxTQUFDO2dCQUVULFFBQVEsRUFBRSxTQUFTO2dCQUNuQixRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0osU0FBUyxFQUFFLE9BQU87b0JBQ2xCLGdCQUFnQixFQUFFLFFBQVE7aUJBQzNCO2FBQ0Y7OztvQkFHRSxLQUFLO3FCQUVMLEtBQUs7dUJBRUwsS0FBSztvQkFFTCxLQUFLOzs7Ozs7Ozs7Ozs7OztBQU9SLE1BQU07Ozs7O0lBQ0osWUFBbUIsV0FBNkIsRUFBRSxHQUFXO1FBQTFDLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM5QyxHQUFHLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztLQUM1Qjs7O1lBSkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFOzs7O1lBckR4QyxXQUFXO1lBdUQ0QyxNQUFNOzs7Ozs7QUFnQi9ELE1BQU07Ozs7SUE0REosWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTs4QkF4RFIsS0FBSzsyQkFDVCxDQUFDOzhCQUNFLENBQUM7K0JBQ1AsS0FBSzsyQkFDVixDQUFDOzJCQUNELEdBQUc7NEJBQ0YsR0FBRztzQkErQ3FCLElBQUksWUFBWSxFQUFnQjttQ0FDekIsSUFBSSxZQUFZLEVBQVU7S0FFakM7Ozs7SUE5Qy9DLElBQ0ksYUFBYSxLQUFLLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFOzs7OztJQUNuRCxJQUFJLGFBQWEsQ0FBQyxLQUFVO1FBQzFCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQUUsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUFFO1FBQzNELElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFOztnQkFDYixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRTtvQkFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUMzQjthQUNGO1lBQ0QsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QztTQUNGO0tBQ0Y7Ozs7SUFFRCxJQUFJLFVBQVUsS0FBYSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTs7Ozs7SUFDckQsSUFBSSxVQUFVLENBQUMsS0FBYTtRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFCOzs7O0lBRUQsSUFBSSxPQUFPOztRQUNULE1BQU0sUUFBUSxHQUFRO1lBQ3BCLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWE7WUFDbkMsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsSUFBSTtZQUNaLE1BQU0sRUFBRSxJQUFJO1lBQ1osSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO1FBQ0YsUUFBUSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQzNFLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyRSxRQUFRLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDcEUsUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkUsT0FBTyxRQUFRLENBQUM7S0FDakI7Ozs7O0lBVUQsa0JBQWtCO1FBQ2hCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ04sVUFBVSxDQUFDLEdBQUcsRUFBRTs7WUFDZCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdEIsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QjtnQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN2QztpQkFBTTs7Z0JBQ0wsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQ3ZCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2lCQUM1QjthQUNGO1lBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDTixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztLQUM1Qjs7Ozs7SUFLTyxhQUFhOztRQUNuQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUFFLE9BQU87U0FBRTs7UUFDbkQsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDOzs7Ozs7SUFJN0MsZ0JBQWdCOztRQUNkLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ3ZFOzs7OztJQUtELFlBQVksS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBSzFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7Ozs7SUFNL0MsTUFBTSxDQUFDLEtBQVU7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUN0QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3hFOzs7OztJQUtELFFBQVE7O1FBQ04sSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7UUFDNUIsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBRXpCOztRQUZ0QixJQUNFLFVBQVUsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FDekI7O1FBRnRCLElBRUUsQ0FBQyxDQUFtQjs7UUFGdEIsSUFFYSxHQUFHLENBQU07UUFDdEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxVQUFVLEVBQUU7Z0JBQUUsTUFBTTthQUFFO1NBQzlEO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNuRDs7Ozs7SUFLRCxZQUFZOztRQUNWLElBQUksQ0FBQyxDQUE0Qzs7UUFBakQsSUFBZSxHQUFHLENBQStCOztRQUFqRCxJQUF5QixRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVqRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQUUsTUFBTTthQUFFO1NBQ3JFO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVO1lBQzlDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNsRDs7Ozs7SUFNRCxjQUFjO1FBQ1osSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFLRCxXQUFXLEtBQUssT0FBTyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFOzs7OztJQUs5QyxjQUFjOztRQUNaLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7O1FBQzVCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEQsT0FBTyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVztZQUN0RixJQUFJLENBQUMsV0FBVyxDQUFDO0tBQ3BCOzs7OztJQUtELGdCQUFnQjs7UUFDZCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7O1FBQ2hELElBQUksSUFBSSxHQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0tBQ3hDOzs7Ozs7SUFNRCxjQUFjLENBQUMsR0FBUTs7UUFDckIsSUFBSSxRQUFRLENBQ2M7O1FBRDFCLElBQ0UsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDMUIsS0FBSyxRQUFRLEdBQUcsS0FBSyxHQUFHLEdBQUcsRUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFDdkUsUUFBUSxJQUFJLEdBQUcsRUFBRSxHQUFHO1FBQ3RCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztTQUM1QjtLQUNGOzs7Ozs7SUFNRCxZQUFZLENBQUMsS0FBYTs7UUFDeEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUFFLE9BQU87U0FBRTs7UUFDdEMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FFRzs7UUFGakMsSUFDRSxJQUFJLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FDVTs7UUFGakMsSUFFRSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUNyRTs7Ozs7O0lBT0QsU0FBUyxDQUFDLEtBQVU7O1FBQ2xCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQUU7O1FBQ2pFLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQ0c7O1FBRHhELElBQ0UsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUN4RCxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEUsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7OztZQXZQRixTQUFTLFNBQUM7Z0JBRVQsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLGt5Q0FBd0I7Z0JBRXhCLElBQUksRUFBRTtvQkFDSixTQUFTLEVBQUUsT0FBTztvQkFDbEIsaUJBQWlCLEVBQUUsa0JBQWtCO2lCQUN0QztnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7Ozs7WUEzRUMsVUFBVTs7O21CQThFVCxlQUFlLFNBQUMsTUFBTTtvQkFVdEIsS0FBSzs0QkFFTCxLQUFLO3FCQTJDTCxNQUFNO2tDQUNOLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0xULGFBQWEsbUJBQW1CLEdBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBT3pFLE1BQU07OztZQUxMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxtQkFBbUI7Z0JBQzVCLFlBQVksRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQzthQUM1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE5nTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSB0YWIgaGFzIGNoYW5nZWQuICovXG5leHBvcnQgY2xhc3MgTWQyVGFiQ2hhbmdlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRhYjogTWQyVGFiLCBwdWJsaWMgaW5kZXg6IG51bWJlcikgeyB9XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1ttZDJUcmFuc2NsdWRlXScgfSlcbmV4cG9ydCBjbGFzcyBNZDJUcmFuc2NsdWRlIHtcblxuICBwcml2YXRlIF9tZDJUcmFuc2NsdWRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3UmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7IH1cblxuICBASW5wdXQoKVxuICBnZXQgbWQyVHJhbnNjbHVkZSgpIHsgcmV0dXJuIHRoaXMuX21kMlRyYW5zY2x1ZGU7IH1cbiAgc2V0IG1kMlRyYW5zY2x1ZGUodGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB0aGlzLl9tZDJUcmFuc2NsdWRlID0gdGVtcGxhdGVSZWY7XG4gICAgaWYgKHRlbXBsYXRlUmVmKSB7XG4gICAgICB0aGlzLnZpZXdSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRlbXBsYXRlUmVmKTtcbiAgICB9XG4gIH1cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgXG4gIHNlbGVjdG9yOiAnbWQyLXRhYicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzXSc6ICdjbGFzcycsXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZDJUYWIge1xuXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgYWN0aXZlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGNsYXNzOiBzdHJpbmc7XG5cbiAgbGFiZWxSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW21kMi10YWItbGFiZWxdJyB9KVxuZXhwb3J0IGNsYXNzIE1kMlRhYkxhYmVsIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LCB0YWI6IE1kMlRhYikge1xuICAgIHRhYi5sYWJlbFJlZiA9IHRlbXBsYXRlUmVmO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBcbiAgc2VsZWN0b3I6ICdtZDItdGFicycsXG4gIHRlbXBsYXRlVXJsOiAndGFicy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RhYnMuc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzc10nOiAnY2xhc3MnLFxuICAgICcod2luZG93OnJlc2l6ZSknOiAnb25XaW5kb3dSZXNpemUoKSdcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNZDJUYWJzIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihNZDJUYWIpIHRhYnM6IFF1ZXJ5TGlzdDxNZDJUYWI+O1xuXG4gIHByaXZhdGUgX2lzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZm9jdXNJbmRleDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJbmRleDogbnVtYmVyID0gMDtcbiAgX3Nob3VsZFBhZ2luYXRlOiBib29sZWFuID0gZmFsc2U7XG4gIF9vZmZzZXRMZWZ0OiBudW1iZXIgPSAwO1xuICBfaW5rQmFyTGVmdDogc3RyaW5nID0gJzAnO1xuICBfaW5rQmFyV2lkdGg6IHN0cmluZyA9ICcwJztcblxuICBASW5wdXQoKSBjbGFzczogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZEluZGV4KCkgeyByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJbmRleDsgfVxuICBzZXQgc2VsZWN0ZWRJbmRleCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHsgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSk7IH1cbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3NlbGVjdGVkSW5kZXgpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSB2YWx1ZTtcbiAgICAgIHRoaXMuYWRqdXN0T2Zmc2V0KHZhbHVlKTtcbiAgICAgIHRoaXMuX3VwZGF0ZUlua0JhcigpO1xuICAgICAgaWYgKHRoaXMudGFicykge1xuICAgICAgICBjb25zdCB0YWJzID0gdGhpcy50YWJzLnRvQXJyYXkoKTtcbiAgICAgICAgaWYgKCF0YWJzW3ZhbHVlXS5kaXNhYmxlZCkge1xuICAgICAgICAgIHRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFjdGl2ZSA9IGZhbHNlKTtcbiAgICAgICAgICB0YWJzW3ZhbHVlXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5faXNJbml0aWFsaXplZCkge1xuICAgICAgICB0aGlzLl9lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4Q2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBmb2N1c0luZGV4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9mb2N1c0luZGV4OyB9XG4gIHNldCBmb2N1c0luZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9mb2N1c0luZGV4ID0gdmFsdWU7XG4gICAgdGhpcy5hZGp1c3RPZmZzZXQodmFsdWUpO1xuICB9XG5cbiAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgY29uc3QgZWxlbWVudHM6IGFueSA9IHtcbiAgICAgIHJvb3Q6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgd3JhcHBlcjogbnVsbCxcbiAgICAgIGNhbnZhczogbnVsbCxcbiAgICAgIHBhZ2luZzogbnVsbCxcbiAgICAgIHRhYnM6IG51bGxcbiAgICB9O1xuICAgIGVsZW1lbnRzLndyYXBwZXIgPSBlbGVtZW50cy5yb290LnF1ZXJ5U2VsZWN0b3IoJy5tZDItdGFicy1oZWFkZXItd3JhcHBlcicpO1xuICAgIGVsZW1lbnRzLmNhbnZhcyA9IGVsZW1lbnRzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLm1kMi10YWJzLWNhbnZhcycpO1xuICAgIGVsZW1lbnRzLnBhZ2luZyA9IGVsZW1lbnRzLmNhbnZhcy5xdWVyeVNlbGVjdG9yKCcubWQyLXRhYnMtaGVhZGVyJyk7XG4gICAgZWxlbWVudHMudGFicyA9IGVsZW1lbnRzLnBhZ2luZy5xdWVyeVNlbGVjdG9yQWxsKCcubWQyLXRhYi1sYWJlbCcpO1xuICAgIHJldHVybiBlbGVtZW50cztcbiAgfVxuXG4gIEBPdXRwdXQoKSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNZDJUYWJDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNZDJUYWJDaGFuZ2U+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZEluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG5cbiAgLyoqXG4gICAqIEFmdGVyIENvbnRlbnQgSW5pdFxuICAgKi9cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKCk7XG4gICAgfSwgMCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB0YWJzID0gdGhpcy50YWJzLnRvQXJyYXkoKTtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCA+PSB0YWJzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgICB0YWJzW3RoaXMuc2VsZWN0ZWRJbmRleF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZGp1c3RPZmZzZXQodGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRhYnMuZmluZEluZGV4KCh0OiBhbnkpID0+IHQuYWN0aXZlKTtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgIHRhYnNbMF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fdXBkYXRlSW5rQmFyKCk7XG4gICAgfSwgMCk7XG4gICAgdGhpcy5faXNJbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3R5bGVzIGZyb20gdGhlIHNlbGVjdGVkIHRhYiBmb3IgdGhlIGluay1iYXIuXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVJbmtCYXIoKTogdm9pZCB7XG4gICAgbGV0IGVsZW1lbnRzID0gdGhpcy5lbGVtZW50O1xuICAgIGlmICghZWxlbWVudHMudGFic1t0aGlzLnNlbGVjdGVkSW5kZXhdKSB7IHJldHVybjsgfVxuICAgIGxldCB0YWIgPSBlbGVtZW50cy50YWJzW3RoaXMuc2VsZWN0ZWRJbmRleF07XG4gICAgdGhpcy5faW5rQmFyTGVmdCA9IHRhYi5vZmZzZXRMZWZ0ICsgJ3B4JztcbiAgICB0aGlzLl9pbmtCYXJXaWR0aCA9IHRhYi5vZmZzZXRXaWR0aCArICdweCc7XG4gIH1cblxuICAvKiogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGFuIG9wdGlvbi4gKi9cbiAgX2VtaXRDaGFuZ2VFdmVudCgpOiB2b2lkIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLl9zZWxlY3RlZEluZGV4O1xuICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1kMlRhYkNoYW5nZSh0aGlzLnRhYnMudG9BcnJheSgpW2luZGV4XSwgaW5kZXgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1cyBuZXh0IFRhYlxuICAgKi9cbiAgZm9jdXNOZXh0VGFiKCkgeyB0aGlzLmluY3JlbWVudEluZGV4KDEpOyB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIHByZXZpb3VzIFRhYlxuICAgKi9cbiAgZm9jdXNQcmV2aW91c1RhYigpIHsgdGhpcy5pbmNyZW1lbnRJbmRleCgtMSk7IH1cblxuICAvKipcbiAgICogTW91c2UgV2hlZWwgc2Nyb2xsXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgc2Nyb2xsKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuX3Nob3VsZFBhZ2luYXRlKSB7IHJldHVybjsgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5fb2Zmc2V0TGVmdCA9IHRoaXMuZml4T2Zmc2V0KHRoaXMuX29mZnNldExlZnQgLSBldmVudC53aGVlbERlbHRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOZXh0IFBhZ2VcbiAgICovXG4gIG5leHRQYWdlKCkge1xuICAgIGxldCBlbGVtZW50cyA9IHRoaXMuZWxlbWVudDtcbiAgICBsZXQgdmlld3BvcnRXaWR0aCA9IGVsZW1lbnRzLmNhbnZhcy5jbGllbnRXaWR0aCxcbiAgICAgIHRvdGFsV2lkdGggPSB2aWV3cG9ydFdpZHRoICsgdGhpcy5fb2Zmc2V0TGVmdCxcbiAgICAgIGk6IG51bWJlciwgdGFiOiBhbnk7XG4gICAgZm9yIChpID0gMDsgaSA8IGVsZW1lbnRzLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRhYiA9IGVsZW1lbnRzLnRhYnNbaV07XG4gICAgICBpZiAodGFiLm9mZnNldExlZnQgKyB0YWIub2Zmc2V0V2lkdGggPiB0b3RhbFdpZHRoKSB7IGJyZWFrOyB9XG4gICAgfVxuICAgIHRoaXMuX29mZnNldExlZnQgPSB0aGlzLmZpeE9mZnNldCh0YWIub2Zmc2V0TGVmdCk7XG4gIH1cblxuICAvKipcbiAgICogUHJldmlvdXMgUGFnZVxuICAgKi9cbiAgcHJldmlvdXNQYWdlKCkge1xuICAgIGxldCBpOiBudW1iZXIsIHRhYjogYW55LCBlbGVtZW50cyA9IHRoaXMuZWxlbWVudDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBlbGVtZW50cy50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0YWIgPSBlbGVtZW50cy50YWJzW2ldO1xuICAgICAgaWYgKHRhYi5vZmZzZXRMZWZ0ICsgdGFiLm9mZnNldFdpZHRoID49IHRoaXMuX29mZnNldExlZnQpIHsgYnJlYWs7IH1cbiAgICB9XG4gICAgdGhpcy5fb2Zmc2V0TGVmdCA9IHRoaXMuZml4T2Zmc2V0KHRhYi5vZmZzZXRMZWZ0ICtcbiAgICAgIHRhYi5vZmZzZXRXaWR0aCAtIGVsZW1lbnRzLmNhbnZhcy5jbGllbnRXaWR0aCk7XG4gIH1cblxuICAvKipcbiAgICogT24gV2luZG93IFJlc2l6ZVxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIG9uV2luZG93UmVzaXplKCkge1xuICAgIHRoaXMuX29mZnNldExlZnQgPSB0aGlzLmZpeE9mZnNldCh0aGlzLl9vZmZzZXRMZWZ0KTtcbiAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW4gcGFnZSBCYWNrXG4gICAqL1xuICBjYW5QYWdlQmFjaygpIHsgcmV0dXJuIHRoaXMuX29mZnNldExlZnQgPiAwOyB9XG5cbiAgLyoqXG4gICAqIENhbiBwYWdlIFByZXZpb3VzXG4gICAqL1xuICBjYW5QYWdlRm9yd2FyZCgpIHtcbiAgICBsZXQgZWxlbWVudHMgPSB0aGlzLmVsZW1lbnQ7XG4gICAgbGV0IGxhc3RUYWIgPSBlbGVtZW50cy50YWJzW2VsZW1lbnRzLnRhYnMubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIGxhc3RUYWIgJiYgbGFzdFRhYi5vZmZzZXRMZWZ0ICsgbGFzdFRhYi5vZmZzZXRXaWR0aCA+IGVsZW1lbnRzLmNhbnZhcy5jbGllbnRXaWR0aCArXG4gICAgICB0aGlzLl9vZmZzZXRMZWZ0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBQYWdpbmF0aW9uXG4gICAqL1xuICB1cGRhdGVQYWdpbmF0aW9uKCkge1xuICAgIGxldCBjYW52YXNXaWR0aCA9IHRoaXMuZWxlbWVudC5yb290LmNsaWVudFdpZHRoO1xuICAgIGxldCB0YWJzOiBhbnlbXSA9IHRoaXMuZWxlbWVudC50YWJzID8gdGhpcy5lbGVtZW50LnRhYnMgOiBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNhbnZhc1dpZHRoIC09IHRhYnNbaV0ub2Zmc2V0V2lkdGg7XG4gICAgfVxuICAgIHRoaXMuX3Nob3VsZFBhZ2luYXRlID0gY2FudmFzV2lkdGggPCAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY3JlbWVudCBGb2N1cyBUYWJcbiAgICogQHBhcmFtIGluY1xuICAgKi9cbiAgaW5jcmVtZW50SW5kZXgoaW5jOiBhbnkpIHtcbiAgICBsZXQgbmV3SW5kZXg6IG51bWJlcixcbiAgICAgIGluZGV4ID0gdGhpcy5mb2N1c0luZGV4O1xuICAgIGZvciAobmV3SW5kZXggPSBpbmRleCArIGluYztcbiAgICAgIHRoaXMudGFicy50b0FycmF5KClbbmV3SW5kZXhdICYmIHRoaXMudGFicy50b0FycmF5KClbbmV3SW5kZXhdLmRpc2FibGVkO1xuICAgICAgbmV3SW5kZXggKz0gaW5jKSB7IH1cbiAgICBpZiAodGhpcy50YWJzLnRvQXJyYXkoKVtuZXdJbmRleF0pIHtcbiAgICAgIHRoaXMuZm9jdXNJbmRleCA9IG5ld0luZGV4O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGp1c3QgT2Zmc2V0IG9mIFRhYlxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICovXG4gIGFkanVzdE9mZnNldChpbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IGVsZW1lbnRzID0gdGhpcy5lbGVtZW50O1xuICAgIGlmICghZWxlbWVudHMudGFic1tpbmRleF0pIHsgcmV0dXJuOyB9XG4gICAgbGV0IHRhYiA9IGVsZW1lbnRzLnRhYnNbaW5kZXhdLFxuICAgICAgbGVmdCA9IHRhYi5vZmZzZXRMZWZ0LFxuICAgICAgcmlnaHQgPSB0YWIub2Zmc2V0V2lkdGggKyBsZWZ0O1xuICAgIHRoaXMuX29mZnNldExlZnQgPSBNYXRoLm1heCh0aGlzLl9vZmZzZXRMZWZ0LFxuICAgICAgdGhpcy5maXhPZmZzZXQocmlnaHQgLSBlbGVtZW50cy5jYW52YXMuY2xpZW50V2lkdGggKyAzMiAqIDIpKTtcbiAgICB0aGlzLl9vZmZzZXRMZWZ0ID0gTWF0aC5taW4odGhpcy5fb2Zmc2V0TGVmdCwgdGhpcy5maXhPZmZzZXQobGVmdCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpeCBPZmZzZXQgb2YgVGFiXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcmV0dXJuIHZhbHVlXG4gICAqL1xuICBmaXhPZmZzZXQodmFsdWU6IGFueSkge1xuICAgIGxldCBlbGVtZW50cyA9IHRoaXMuZWxlbWVudDtcbiAgICBpZiAoIWVsZW1lbnRzLnRhYnMubGVuZ3RoIHx8ICF0aGlzLl9zaG91bGRQYWdpbmF0ZSkgeyByZXR1cm4gMDsgfVxuICAgIGxldCBsYXN0VGFiID0gZWxlbWVudHMudGFic1tlbGVtZW50cy50YWJzLmxlbmd0aCAtIDFdLFxuICAgICAgdG90YWxXaWR0aCA9IGxhc3RUYWIub2Zmc2V0TGVmdCArIGxhc3RUYWIub2Zmc2V0V2lkdGg7XG4gICAgdmFsdWUgPSBNYXRoLm1pbih0b3RhbFdpZHRoIC0gZWxlbWVudHMuY2FudmFzLmNsaWVudFdpZHRoLCB2YWx1ZSk7XG4gICAgdmFsdWUgPSBNYXRoLm1heCgwLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbn1cblxuZXhwb3J0IGNvbnN0IE1EMl9UQUJTX0RJUkVDVElWRVM6IGFueVtdID0gW01kMlRhYkxhYmVsLCBNZDJUYWJzLCBNZDJUYWJdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogTUQyX1RBQlNfRElSRUNUSVZFUyxcbiAgZGVjbGFyYXRpb25zOiBbTWQyVHJhbnNjbHVkZSwgTWQyVGFiTGFiZWwsIE1kMlRhYnMsIE1kMlRhYl0sXG59KVxuZXhwb3J0IGNsYXNzIE1kMlRhYnNNb2R1bGUgeyB9XG4iXX0=