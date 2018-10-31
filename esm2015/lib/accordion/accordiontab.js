/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Directive, Input, ViewEncapsulation, } from '@angular/core';
import { animate, state, style, transition, trigger, } from '@angular/animations';
import { Md2Accordion } from './accordion';
import { coerceBooleanProperty } from '../core';
export class Md2AccordionHeader {
}
Md2AccordionHeader.decorators = [
    { type: Directive, args: [{ selector: 'md2-accordion-header' },] }
];
export class Md2AccordionTab {
    /**
     * @param {?} _accordion
     */
    constructor(_accordion) {
        this._accordion = _accordion;
        this._disabled = false;
        this._active = false;
        this._accordion.addTab(this);
    }
    /**
     * @return {?}
     */
    get active() { return this._active; }
    /**
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        this._active = coerceBooleanProperty(value);
        if (this._active && !this._accordion.multiple) {
            for (let i = 0; i < this._accordion.tabs.length; i++) {
                if (this._accordion.tabs[i] !== this) {
                    this._accordion.tabs[i].active = false;
                }
            }
        }
    }
    /**
     * @return {?}
     */
    get slide() {
        return this.active ? 'down' : 'up';
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Toggle the accordion
     * @param {?} event
     * @return {?} if it is disabled
     */
    _handleClick(event) {
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        let index = this.findTabIndex();
        if (this.active) {
            this.active = !this.active;
            this._accordion.close.emit({ originalEvent: event, index: index });
        }
        else if (!this._accordion.multiple) {
            for (let i = 0; i < this._accordion.tabs.length; i++) {
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
    }
    /**
     * Find index of specific tab of accordion
     * @return {?} index number of this tab
     */
    findTabIndex() {
        /** @type {?} */
        let index = -1;
        for (let i = 0; i < this._accordion.tabs.length; i++) {
            if (this._accordion.tabs[i] === this) {
                index = i;
                break;
            }
        }
        return index;
    }
}
Md2AccordionTab.decorators = [
    { type: Component, args: [{
                selector: 'md2-accordion-tab',
                template: `
    <div class="md2-accordion-header" (click)="_handleClick($event)">
      <span>{{header}}</span>
      <ng-content select="md2-accordion-header"></ng-content>
      <span class="md2-accordion-header-icon"></span>
    </div>
    <div class="md2-accordion-tab-body" [@slide]="slide">
      <div class="md2-accordion-tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
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
Md2AccordionTab.ctorParameters = () => [
    { type: Md2Accordion }
];
Md2AccordionTab.propDecorators = {
    header: [{ type: Input }],
    active: [{ type: Input }],
    disabled: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9udGFiLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvYWNjb3JkaW9uL2FjY29yZGlvbnRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBR2hELE1BQU07OztZQURMLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTs7QUEyQy9DLE1BQU07Ozs7SUEwQkosWUFBb0IsVUFBd0I7UUFBeEIsZUFBVSxHQUFWLFVBQVUsQ0FBYzt5QkF4QmYsS0FBSzt1QkFDUCxLQUFLO1FBd0I5QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5Qjs7OztJQXJCRCxJQUNJLE1BQU0sS0FBYyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTs7Ozs7SUFDOUMsSUFBSSxNQUFNLENBQUMsS0FBSztRQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDcEQsSUFBSSxJQUFJLENB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RUFBRTs0QkFDdkIsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDOzRCQUN0QixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3lCQUNuQyxDQUFDO3dCQUNGLFVBQVUsQ0FBQyxZQUFZLEVBQUU7NEJBQ3ZCLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzs0QkFDcEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7Z0NBQ2pCLE1BQU0sRUFBRSxHQUFHOzZCQUNaLENBQUMsQ0FBQzt5QkFDSixDQUFDO3FCQUNILENBQUM7aUJBQ0g7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLE1BQU0sRUFBRSxlQUFlO29CQUN2QixrQ0FBa0MsRUFBRSxRQUFRO29CQUM1QyxvQ0FBb0MsRUFBRSxVQUFVO2lCQUNqRDtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLGlCQUFpQjs7YUFDNUI7Ozs7WUE3Q1EsWUFBWTs7O3FCQW1EbEIsS0FBSztxQkFFTCxLQUFLO3VCQWVMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIGFuaW1hdGUsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNZDJBY2NvcmRpb24gfSBmcm9tICcuL2FjY29yZGlvbic7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICcuLi9jb3JlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbWQyLWFjY29yZGlvbi1oZWFkZXInIH0pXG5leHBvcnQgY2xhc3MgTWQyQWNjb3JkaW9uSGVhZGVyIHsgfVxuXG5AQ29tcG9uZW50KHtcbiAgXG4gIHNlbGVjdG9yOiAnbWQyLWFjY29yZGlvbi10YWInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJtZDItYWNjb3JkaW9uLWhlYWRlclwiIChjbGljayk9XCJfaGFuZGxlQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgPHNwYW4+e3toZWFkZXJ9fTwvc3Bhbj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1kMi1hY2NvcmRpb24taGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgPHNwYW4gY2xhc3M9XCJtZDItYWNjb3JkaW9uLWhlYWRlci1pY29uXCI+PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtZDItYWNjb3JkaW9uLXRhYi1ib2R5XCIgW0BzbGlkZV09XCJzbGlkZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kMi1hY2NvcmRpb24tdGFiLWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWydhY2NvcmRpb24uc2NzcyddLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignc2xpZGUnLCBbXG4gICAgICBzdGF0ZSgndXAnLCBzdHlsZSh7IGhlaWdodDogMCB9KSksXG4gICAgICBzdGF0ZSgnZG93bicsIHN0eWxlKHsgaGVpZ2h0OiAnKicgfSkpLFxuICAgICAgdHJhbnNpdGlvbignZG93biA9PiB1cCcsIFtcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgzMDAsIHN0eWxlKHsgaGVpZ2h0OiAwIH0pKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCd1cCA9PiBkb3duJywgW1xuICAgICAgICBzdHlsZSh7IGhlaWdodDogMCB9KSxcbiAgICAgICAgYW5pbWF0ZSgzMDAsIHN0eWxlKHtcbiAgICAgICAgICBoZWlnaHQ6ICcqJ1xuICAgICAgICB9KSlcbiAgICAgIF0pXG4gICAgXSlcbiAgXSxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ2FjY29yZGlvbi10YWInLFxuICAgICdbY2xhc3MubWQyLWFjY29yZGlvbi10YWItYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICdbY2xhc3MubWQyLWFjY29yZGlvbi10YWItZGlzYWJsZWRdJzogJ2Rpc2FibGVkJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21kMkFjY29yZGlvblRhYidcbn0pXG5leHBvcnQgY2xhc3MgTWQyQWNjb3JkaW9uVGFiIHtcblxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9hY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fYWN0aXZlOyB9XG4gIHNldCBhY3RpdmUodmFsdWUpIHtcbiAgICB0aGlzLl9hY3RpdmUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLl9hY3RpdmUgJiYgIXRoaXMuX2FjY29yZGlvbi5tdWx0aXBsZSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hY2NvcmRpb24udGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5fYWNjb3JkaW9uLnRhYnNbaV0gIT09IHRoaXMpIHsgdGhpcy5fYWNjb3JkaW9uLnRhYnNbaV0uYWN0aXZlID0gZmFsc2U7IH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgc2xpZGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmUgPyAnZG93bicgOiAndXAnO1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7IHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FjY29yZGlvbjogTWQyQWNjb3JkaW9uKSB7XG4gICAgdGhpcy5fYWNjb3JkaW9uLmFkZFRhYih0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgdGhlIGFjY29yZGlvblxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQHJldHVybiBpZiBpdCBpcyBkaXNhYmxlZFxuICAgKi9cbiAgX2hhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgbGV0IGluZGV4ID0gdGhpcy5maW5kVGFiSW5kZXgoKTtcblxuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XG4gICAgICB0aGlzLl9hY2NvcmRpb24uY2xvc2UuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogaW5kZXggfSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5fYWNjb3JkaW9uLm11bHRpcGxlKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2FjY29yZGlvbi50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX2FjY29yZGlvbi50YWJzW2ldLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2FjY29yZGlvbi5vcGVuLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgaW5kZXg6IGluZGV4IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy5fYWNjb3JkaW9uLm9wZW4uZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogaW5kZXggfSk7XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGluZGV4IG9mIHNwZWNpZmljIHRhYiBvZiBhY2NvcmRpb25cbiAgICogQHJldHVybiBpbmRleCBudW1iZXIgb2YgdGhpcyB0YWJcbiAgICovXG4gIGZpbmRUYWJJbmRleCgpIHtcbiAgICBsZXQgaW5kZXggPSAtMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2FjY29yZGlvbi50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5fYWNjb3JkaW9uLnRhYnNbaV0gPT09IHRoaXMpIHtcbiAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG59XG4iXX0=