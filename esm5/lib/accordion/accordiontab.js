/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Directive, Input, ViewEncapsulation, } from '@angular/core';
import { animate, state, style, transition, trigger, } from '@angular/animations';
import { Md2Accordion } from './accordion';
import { coerceBooleanProperty } from '../core';
var Md2AccordionHeader = /** @class */ (function () {
    function Md2AccordionHeader() {
    }
    Md2AccordionHeader.decorators = [
        { type: Directive, args: [{ selector: 'md2-accordion-header' },] }
    ];
    return Md2AccordionHeader;
}());
export { Md2AccordionHeader };
var Md2AccordionTab = /** @class */ (function () {
    function Md2AccordionTab(_accordion) {
        this._accordion = _accordion;
        this._disabled = false;
        this._active = false;
        this._accordion.addTab(this);
    }
    Object.defineProperty(Md2AccordionTab.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () { return this._active; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._active = coerceBooleanProperty(value);
            if (this._active && !this._accordion.multiple) {
                for (var i = 0; i < this._accordion.tabs.length; i++) {
                    if (this._accordion.tabs[i] !== this) {
                        this._accordion.tabs[i].active = false;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2AccordionTab.prototype, "slide", {
        get: /**
         * @return {?}
         */
        function () {
            return this.active ? 'down' : 'up';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2AccordionTab.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle the accordion
     * @param event
     * @return if it is disabled
     */
    /**
     * Toggle the accordion
     * @param {?} event
     * @return {?} if it is disabled
     */
    Md2AccordionTab.prototype._handleClick = /**
     * Toggle the accordion
     * @param {?} event
     * @return {?} if it is disabled
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        var index = this.findTabIndex();
        if (this.active) {
            this.active = !this.active;
            this._accordion.close.emit({ originalEvent: event, index: index });
        }
        else if (!this._accordion.multiple) {
            for (var i = 0; i < this._accordion.tabs.length; i++) {
                this._accordion.tabs[i].active = false;
            }
            this._active = true;
            this._accordion.open.emit({ originalEvent: event, index: index });
        }
        else {
            this._active = true;
            this._accordion.open.emit({ originalEvent: event, index: index });
        }
        event.preventDefault();
    };
    /**
     * Find index of specific tab of accordion
     * @return index number of this tab
     */
    /**
     * Find index of specific tab of accordion
     * @return {?} index number of this tab
     */
    Md2AccordionTab.prototype.findTabIndex = /**
     * Find index of specific tab of accordion
     * @return {?} index number of this tab
     */
    function () {
        /** @type {?} */
        var index = -1;
        for (var i = 0; i < this._accordion.tabs.length; i++) {
            if (this._accordion.tabs[i] === this) {
                index = i;
                break;
            }
        }
        return index;
    };
    Md2AccordionTab.decorators = [
        { type: Component, args: [{
                    selector: 'md2-accordion-tab',
                    template: "\n    <div class=\"md2-accordion-header\" (click)=\"_handleClick($event)\">\n      <span>{{header}}</span>\n      <ng-content select=\"md2-accordion-header\"></ng-content>\n      <span class=\"md2-accordion-header-icon\"></span>\n    </div>\n    <div class=\"md2-accordion-tab-body\" [@slide]=\"slide\">\n      <div class=\"md2-accordion-tab-content\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
                    animations: [
                        trigger('slide', [
                            state('up', style({ height: 0 })),
                            state('down', style({ height: '*' })),
                            transition('down => up', [
                                style({ height: '*' }),
                                animate(300, style({ height: 0 }))
                            ]),
                            transition('up => down', [
                                style({ height: 0 }),
                                animate(300, style({
                                    height: '*'
                                }))
                            ])
                        ])
                    ],
                    host: {
                        'role': 'accordion-tab',
                        '[class.md2-accordion-tab-active]': 'active',
                        '[class.md2-accordion-tab-disabled]': 'disabled'
                    },
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'md2AccordionTab',
                    styles: ["md2-accordion{display:block}md2-accordion-tab{position:relative;display:block;outline:0;box-sizing:border-box}md2-accordion-tab[hidden]{display:none}.md2-accordion-header{position:relative;display:block;padding-right:30px;font-weight:500;line-height:40px;text-align:left;color:rgba(0,0,0,.87);cursor:pointer;white-space:nowrap;border-bottom:1px solid rgba(0,0,0,.12);border-radius:0;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}md2-accordion-tab.md2-accordion-tab-active>.md2-accordion-header{border-color:#106cc8;box-shadow:0 1px 0 #106cc8}md2-accordion-tab.md2-accordion-tab-disabled>.md2-accordion-header{pointer-events:none;color:rgba(0,0,0,.26);background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;background-position:0 bottom;border-color:transparent;box-shadow:none;cursor:default}.md2-accordion-header-icon{position:absolute;top:12px;right:8px;width:8px;height:8px;overflow:hidden;display:inline-block;border-width:0 2px 2px 0;border-style:solid;border-color:currentColor;opacity:.64;-webkit-transform:rotate(45deg);transform:rotate(45deg);transition:.3s ease-in-out}md2-accordion-tab.md2-accordion-tab-active>.md2-accordion-header>.md2-accordion-header-icon{-webkit-transform:rotate(225deg);transform:rotate(225deg);top:16px}.md2-accordion-tab-body{position:relative;overflow:hidden}md2-accordion-tab.md2-accordion-tab-active .md2-accordion-tab-body{overflow:visible}.md2-accordion-tab-content{position:relative;padding:20px 0;border-bottom:1px solid rgba(0,0,0,.12)}"]
                }] }
    ];
    /** @nocollapse */
    Md2AccordionTab.ctorParameters = function () { return [
        { type: Md2Accordion }
    ]; };
    Md2AccordionTab.propDecorators = {
        header: [{ type: Input }],
        active: [{ type: Input }],
        disabled: [{ type: Input }]
    };
    return Md2AccordionTab;
}());
export { Md2AccordionTab };
if (false) {
    /** @type {?} */
    Md2AccordionTab.prototype._disabled;
    /** @type {?} */
    Md2AccordionTab.prototype._active;
    /** @type {?} */
    Md2AccordionTab.prototype.header;
    /** @type {?} */
    Md2AccordionTab.prototype._accordion;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9udGFiLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvYWNjb3JkaW9uL2FjY29yZGlvbnRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sU0FBUyxDQUFDOzs7OztnQkFFL0MsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFOzs2QkFoQi9DOztTQWlCYSxrQkFBa0I7O0lBb0U3Qix5QkFBb0IsVUFBd0I7UUFBeEIsZUFBVSxHQUFWLFVBQVUsQ0FBYzt5QkF4QmYsS0FBSzt1QkFDUCxLQUFLO1FBd0I5QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5QjtJQXJCRCxzQkFDSSxtQ0FBTTs7OztRQURWLGNBQ3dCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFOzs7OztRQUM5QyxVQUFXLEtBQUs7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO2dCQUM3QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNwRCxJQUFJLElBQUks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S0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7NEJBQ3JDLFVBQVUsQ0FBQyxZQUFZLEVBQUU7Z0NBQ3ZCLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztnQ0FDdEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs2QkFDbkMsQ0FBQzs0QkFDRixVQUFVLENBQUMsWUFBWSxFQUFFO2dDQUN2QixLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0NBQ3BCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO29DQUNqQixNQUFNLEVBQUUsR0FBRztpQ0FDWixDQUFDLENBQUM7NkJBQ0osQ0FBQzt5QkFDSCxDQUFDO3FCQUNIO29CQUNELElBQUksRUFBRTt3QkFDSixNQUFNLEVBQUUsZUFBZTt3QkFDdkIsa0NBQWtDLEVBQUUsUUFBUTt3QkFDNUMsb0NBQW9DLEVBQUUsVUFBVTtxQkFDakQ7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxpQkFBaUI7O2lCQUM1Qjs7OztnQkE3Q1EsWUFBWTs7O3lCQW1EbEIsS0FBSzt5QkFFTCxLQUFLOzJCQWVMLEtBQUs7OzBCQWpGUjs7U0EyRGEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1kMkFjY29yZGlvbiB9IGZyb20gJy4vYWNjb3JkaW9uJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJy4uL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdtZDItYWNjb3JkaW9uLWhlYWRlcicgfSlcbmV4cG9ydCBjbGFzcyBNZDJBY2NvcmRpb25IZWFkZXIgeyB9XG5cbkBDb21wb25lbnQoe1xuICBcbiAgc2VsZWN0b3I6ICdtZDItYWNjb3JkaW9uLXRhYicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm1kMi1hY2NvcmRpb24taGVhZGVyXCIgKGNsaWNrKT1cIl9oYW5kbGVDbGljaygkZXZlbnQpXCI+XG4gICAgICA8c3Bhbj57e2hlYWRlcn19PC9zcGFuPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWQyLWFjY29yZGlvbi1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1kMi1hY2NvcmRpb24taGVhZGVyLWljb25cIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1kMi1hY2NvcmRpb24tdGFiLWJvZHlcIiBbQHNsaWRlXT1cInNsaWRlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWQyLWFjY29yZGlvbi10YWItY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJ2FjY29yZGlvbi5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdzbGlkZScsIFtcbiAgICAgIHN0YXRlKCd1cCcsIHN0eWxlKHsgaGVpZ2h0OiAwIH0pKSxcbiAgICAgIHN0YXRlKCdkb3duJywgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCdkb3duID0+IHVwJywgW1xuICAgICAgICBzdHlsZSh7IGhlaWdodDogJyonIH0pLFxuICAgICAgICBhbmltYXRlKDMwMCwgc3R5bGUoeyBoZWlnaHQ6IDAgfSkpXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJ3VwID0+IGRvd24nLCBbXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAwIH0pLFxuICAgICAgICBhbmltYXRlKDMwMCwgc3R5bGUoe1xuICAgICAgICAgIGhlaWdodDogJyonXG4gICAgICAgIH0pKVxuICAgICAgXSlcbiAgICBdKVxuICBdLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAnYWNjb3JkaW9uLXRhYicsXG4gICAgJ1tjbGFzcy5tZDItYWNjb3JkaW9uLXRhYi1hY3RpdmVdJzogJ2FjdGl2ZScsXG4gICAgJ1tjbGFzcy5tZDItYWNjb3JkaW9uLXRhYi1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWQyQWNjb3JkaW9uVGFiJ1xufSlcbmV4cG9ydCBjbGFzcyBNZDJBY2NvcmRpb25UYWIge1xuXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9hY3RpdmU7IH1cbiAgc2V0IGFjdGl2ZSh2YWx1ZSkge1xuICAgIHRoaXMuX2FjdGl2ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX2FjdGl2ZSAmJiAhdGhpcy5fYWNjb3JkaW9uLm11bHRpcGxlKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2FjY29yZGlvbi50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9hY2NvcmRpb24udGFic1tpXSAhPT0gdGhpcykgeyB0aGlzLl9hY2NvcmRpb24udGFic1tpXS5hY3RpdmUgPSBmYWxzZTsgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBzbGlkZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZSA/ICdkb3duJyA6ICd1cCc7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHsgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYWNjb3JkaW9uOiBNZDJBY2NvcmRpb24pIHtcbiAgICB0aGlzLl9hY2NvcmRpb24uYWRkVGFiKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0aGUgYWNjb3JkaW9uXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcmV0dXJuIGlmIGl0IGlzIGRpc2FibGVkXG4gICAqL1xuICBfaGFuZGxlQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRUYWJJbmRleCgpO1xuXG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZTtcbiAgICAgIHRoaXMuX2FjY29yZGlvbi5jbG9zZS5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGluZGV4OiBpbmRleCB9KTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9hY2NvcmRpb24ubXVsdGlwbGUpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYWNjb3JkaW9uLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5fYWNjb3JkaW9uLnRhYnNbaV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy5fYWNjb3JkaW9uLm9wZW4uZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogaW5kZXggfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLl9hY2NvcmRpb24ub3Blbi5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGluZGV4OiBpbmRleCB9KTtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgaW5kZXggb2Ygc3BlY2lmaWMgdGFiIG9mIGFjY29yZGlvblxuICAgKiBAcmV0dXJuIGluZGV4IG51bWJlciBvZiB0aGlzIHRhYlxuICAgKi9cbiAgZmluZFRhYkluZGV4KCkge1xuICAgIGxldCBpbmRleCA9IC0xO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYWNjb3JkaW9uLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLl9hY2NvcmRpb24udGFic1tpXSA9PT0gdGhpcykge1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cbn1cbiJdfQ==