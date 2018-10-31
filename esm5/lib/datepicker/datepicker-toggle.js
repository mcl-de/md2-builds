/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Md2Datepicker } from './datepicker';
/**
 * @template D
 */
var Md2DatepickerToggle = /** @class */ (function () {
    function Md2DatepickerToggle() {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    Md2DatepickerToggle.prototype._open = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.datepicker) {
            this.datepicker.open();
            event.stopPropagation();
        }
    };
    Md2DatepickerToggle.decorators = [
        { type: Component, args: [{
                    selector: 'button[md2DatepickerToggle]',
                    template: '',
                    host: {
                        'type': 'button',
                        'class': 'md2-datepicker-toggle',
                        'aria-label': 'Open calendar',
                        '(click)': '_open($event)',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".md2-datepicker-toggle{display:inline-block;background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDNoLTFWMWgtMnYySDhWMUg2djJINWMtMS4xMSAwLTEuOTkuOS0xLjk5IDJMMyAxOWMwIDEuMS44OSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlY1YzAtMS4xLS45LTItMi0yem0wIDE2SDVWOGgxNHYxMXpNNyAxMGg1djVIN3oiLz48L3N2Zz4=) 0 0/contain no-repeat;height:24px;width:24px;border:none;outline:0;vertical-align:middle}.md2-datepicker-toggle:not([disabled]){cursor:pointer}"]
                }] }
    ];
    Md2DatepickerToggle.propDecorators = {
        datepicker: [{ type: Input, args: ['md2DatepickerToggle',] }]
    };
    return Md2DatepickerToggle;
}());
export { Md2DatepickerToggle };
if (false) {
    /**
     * Datepicker instance that the button will toggle.
     * @type {?}
     */
    Md2DatepickerToggle.prototype.datepicker;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci10b2dnbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9kYXRlcGlja2VyL2RhdGVwaWNrZXItdG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7Ozs7OztJQXFCM0MsbUNBQUs7Ozs7SUFBTCxVQUFNLEtBQVk7UUFDaEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3pCO0tBQ0Y7O2dCQXZCRixTQUFTLFNBQUM7b0JBRVQsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsUUFBUSxFQUFFLEVBQUU7b0JBRVosSUFBSSxFQUFFO3dCQUNKLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixPQUFPLEVBQUUsdUJBQXVCO3dCQUNoQyxZQUFZLEVBQUUsZUFBZTt3QkFDN0IsU0FBUyxFQUFFLGVBQWU7cUJBQzNCO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7NkJBR0UsS0FBSyxTQUFDLHFCQUFxQjs7OEJBcEI5Qjs7U0FrQmEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZDJEYXRlcGlja2VyIH0gZnJvbSAnLi9kYXRlcGlja2VyJztcblxuXG5AQ29tcG9uZW50KHtcbiAgXG4gIHNlbGVjdG9yOiAnYnV0dG9uW21kMkRhdGVwaWNrZXJUb2dnbGVdJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBzdHlsZVVybHM6IFsnZGF0ZXBpY2tlci10b2dnbGUuc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ3R5cGUnOiAnYnV0dG9uJyxcbiAgICAnY2xhc3MnOiAnbWQyLWRhdGVwaWNrZXItdG9nZ2xlJyxcbiAgICAnYXJpYS1sYWJlbCc6ICdPcGVuIGNhbGVuZGFyJyxcbiAgICAnKGNsaWNrKSc6ICdfb3BlbigkZXZlbnQpJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kMkRhdGVwaWNrZXJUb2dnbGU8RD4ge1xuICAvKiogRGF0ZXBpY2tlciBpbnN0YW5jZSB0aGF0IHRoZSBidXR0b24gd2lsbCB0b2dnbGUuICovXG4gIEBJbnB1dCgnbWQyRGF0ZXBpY2tlclRvZ2dsZScpIGRhdGVwaWNrZXI6IE1kMkRhdGVwaWNrZXI7XG5cbiAgX29wZW4oZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0ZXBpY2tlcikge1xuICAgICAgdGhpcy5kYXRlcGlja2VyLm9wZW4oKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxufVxuIl19