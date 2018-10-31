/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger, } from '@angular/animations';
/** *
 * This animation shrinks the placeholder text to 75% of its normal size and translates
 * it to either the top left corner (ltr) or top right corner (rtl) of the trigger,
 * depending on the text direction of the application.
  @type {?} */
export const transformPlaceholder = trigger('transformPlaceholder', [
    state('floating-ltr', style({
        top: '-22px',
        left: '-2px',
        transform: `scale(0.75)`
    })),
    state('floating-rtl', style({
        top: '-22px',
        left: '2px',
        transform: `scale(0.75)`
    })),
    transition('* => *', animate(`400ms cubic-bezier(0.25, 0.8, 0.25, 1)`))
]);
/** *
 * This animation transforms the select's overlay panel on and off the page.
 *
 * When the panel is attached to the DOM, it expands its width 32px, scales it up to
 * 100% on the Y axis, fades in its border, and translates slightly up and to the
 * side to ensure the option text correctly overlaps the trigger text.
 *
 * When the panel is removed from the DOM, it simply fades out linearly.
  @type {?} */
export const transformPanel = trigger('transformPanel', [
    state('showing', style({
        opacity: 1,
        minWidth: 'calc(100% + 32px)',
        transform: `scaleY(1)`
    })),
    transition('void => *', [
        style({
            opacity: 0,
            minWidth: '100%',
            transform: `scaleY(0)`
        }),
        animate(`150ms cubic-bezier(0.25, 0.8, 0.25, 1)`)
    ]),
    transition('* => void', [
        animate('250ms 100ms linear', style({ opacity: 0 }))
    ])
]);
/** *
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
  @type {?} */
export const fadeInContent = trigger('fadeInContent', [
    state('showing', style({ opacity: 1 })),
    transition('void => showing', [
        style({ opacity: 0 }),
        animate(`150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)`)
    ])
]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWFuaW1hdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Qvc2VsZWN0LWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxPQUFPLEVBRVAsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQWM3QixhQUFhLG9CQUFvQixHQUE2QixPQUFPLENBQUMsc0JBQXNCLEVBQUU7SUFDNUYsS0FBSyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUM7UUFDMUIsR0FBRyxFQUFFLE9BQU87UUFDWixJQUFJLEVBQUUsTUFBTTtRQUNaLFNBQVMsRUFBRSxhQUFhO0tBQ3pCLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDO1FBQzFCLEdBQUcsRUFBRSxPQUFPO1FBQ1osSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsYUFBYTtLQUN6QixDQUFDLENBQUM7SUFDSCxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0NBQ3hFLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQVdILGFBQWEsY0FBYyxHQUE2QixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7SUFDaEYsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7UUFDckIsT0FBTyxFQUFFLENBQUM7UUFDVixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFNBQVMsRUFBRSxXQUFXO0tBQ3ZCLENBQUMsQ0FBQztJQUNILFVBQVUsQ0FBQyxXQUFXLEVBQUU7UUFDdEIsS0FBSyxDQUFDO1lBQ0osT0FBTyxFQUFFLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTTtZQUNoQixTQUFTLEVBQUUsV0FBVztTQUN2QixDQUFDO1FBQ0YsT0FBTyxDQUFDLHdDQUF3QyxDQUFDO0tBQ2xELENBQUM7SUFDRixVQUFVLENBQUMsV0FBVyxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztLQUNuRCxDQUFDO0NBQ0gsQ0FBQyxDQUFDOzs7Ozs7QUFPSCxhQUFhLGFBQWEsR0FBK0IsT0FBTyxDQUFDLGVBQWUsRUFBRTtJQUNoRixLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ3JDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTtRQUM1QixLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDbkIsT0FBTyxDQUFDLDhDQUE4QyxDQUFDO0tBQ3hELENBQUM7Q0FDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBhbmltYXRlLFxuICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbi8qKlxuICogVGhlIGZvbGxvd2luZyBhcmUgYWxsIHRoZSBhbmltYXRpb25zIGZvciB0aGUgbWQyLXNlbGVjdCBjb21wb25lbnQsIHdpdGggZWFjaFxuICogY29uc3QgY29udGFpbmluZyB0aGUgbWV0YWRhdGEgZm9yIG9uZSBhbmltYXRpb24uXG4gKlxuICogVGhlIHZhbHVlcyBiZWxvdyBtYXRjaCB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIEFuZ3VsYXJKUyBNYXRlcmlhbCBtZDItc2VsZWN0IGFuaW1hdGlvbi5cbiAqL1xuXG4vKipcbiAqIFRoaXMgYW5pbWF0aW9uIHNocmlua3MgdGhlIHBsYWNlaG9sZGVyIHRleHQgdG8gNzUlIG9mIGl0cyBub3JtYWwgc2l6ZSBhbmQgdHJhbnNsYXRlc1xuICogaXQgdG8gZWl0aGVyIHRoZSB0b3AgbGVmdCBjb3JuZXIgKGx0cikgb3IgdG9wIHJpZ2h0IGNvcm5lciAocnRsKSBvZiB0aGUgdHJpZ2dlcixcbiAqIGRlcGVuZGluZyBvbiB0aGUgdGV4dCBkaXJlY3Rpb24gb2YgdGhlIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtUGxhY2Vob2xkZXI6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSA9IHRyaWdnZXIoJ3RyYW5zZm9ybVBsYWNlaG9sZGVyJywgW1xuICBzdGF0ZSgnZmxvYXRpbmctbHRyJywgc3R5bGUoe1xuICAgIHRvcDogJy0yMnB4JyxcbiAgICBsZWZ0OiAnLTJweCcsXG4gICAgdHJhbnNmb3JtOiBgc2NhbGUoMC43NSlgXG4gIH0pKSxcbiAgc3RhdGUoJ2Zsb2F0aW5nLXJ0bCcsIHN0eWxlKHtcbiAgICB0b3A6ICctMjJweCcsXG4gICAgbGVmdDogJzJweCcsXG4gICAgdHJhbnNmb3JtOiBgc2NhbGUoMC43NSlgXG4gIH0pKSxcbiAgdHJhbnNpdGlvbignKiA9PiAqJywgYW5pbWF0ZShgNDAwbXMgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSlgKSlcbl0pO1xuXG4vKipcbiAqIFRoaXMgYW5pbWF0aW9uIHRyYW5zZm9ybXMgdGhlIHNlbGVjdCdzIG92ZXJsYXkgcGFuZWwgb24gYW5kIG9mZiB0aGUgcGFnZS5cbiAqXG4gKiBXaGVuIHRoZSBwYW5lbCBpcyBhdHRhY2hlZCB0byB0aGUgRE9NLCBpdCBleHBhbmRzIGl0cyB3aWR0aCAzMnB4LCBzY2FsZXMgaXQgdXAgdG9cbiAqIDEwMCUgb24gdGhlIFkgYXhpcywgZmFkZXMgaW4gaXRzIGJvcmRlciwgYW5kIHRyYW5zbGF0ZXMgc2xpZ2h0bHkgdXAgYW5kIHRvIHRoZVxuICogc2lkZSB0byBlbnN1cmUgdGhlIG9wdGlvbiB0ZXh0IGNvcnJlY3RseSBvdmVybGFwcyB0aGUgdHJpZ2dlciB0ZXh0LlxuICpcbiAqIFdoZW4gdGhlIHBhbmVsIGlzIHJlbW92ZWQgZnJvbSB0aGUgRE9NLCBpdCBzaW1wbHkgZmFkZXMgb3V0IGxpbmVhcmx5LlxuICovXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtUGFuZWw6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSA9IHRyaWdnZXIoJ3RyYW5zZm9ybVBhbmVsJywgW1xuICBzdGF0ZSgnc2hvd2luZycsIHN0eWxlKHtcbiAgICBvcGFjaXR5OiAxLFxuICAgIG1pbldpZHRoOiAnY2FsYygxMDAlICsgMzJweCknLFxuICAgIHRyYW5zZm9ybTogYHNjYWxlWSgxKWBcbiAgfSkpLFxuICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXG4gICAgc3R5bGUoe1xuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIG1pbldpZHRoOiAnMTAwJScsXG4gICAgICB0cmFuc2Zvcm06IGBzY2FsZVkoMClgXG4gICAgfSksXG4gICAgYW5pbWF0ZShgMTUwbXMgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSlgKVxuICBdKSxcbiAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgW1xuICAgIGFuaW1hdGUoJzI1MG1zIDEwMG1zIGxpbmVhcicsIHN0eWxlKHtvcGFjaXR5OiAwfSkpXG4gIF0pXG5dKTtcblxuLyoqXG4gKiBUaGlzIGFuaW1hdGlvbiBmYWRlcyBpbiB0aGUgYmFja2dyb3VuZCBjb2xvciBhbmQgdGV4dCBjb250ZW50IG9mIHRoZVxuICogc2VsZWN0J3Mgb3B0aW9ucy4gSXQgaXMgdGltZSBkZWxheWVkIHRvIG9jY3VyIDEwMG1zIGFmdGVyIHRoZSBvdmVybGF5XG4gKiBwYW5lbCBoYXMgdHJhbnNmb3JtZWQgaW4uXG4gKi9cbmV4cG9ydCBjb25zdCBmYWRlSW5Db250ZW50OiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEgID0gIHRyaWdnZXIoJ2ZhZGVJbkNvbnRlbnQnLCBbXG4gIHN0YXRlKCdzaG93aW5nJywgc3R5bGUoe29wYWNpdHk6IDF9KSksXG4gIHRyYW5zaXRpb24oJ3ZvaWQgPT4gc2hvd2luZycsIFtcbiAgICBzdHlsZSh7b3BhY2l0eTogMH0pLFxuICAgIGFuaW1hdGUoYDE1MG1zIDEwMG1zIGN1YmljLWJlemllcigwLjU1LCAwLCAwLjU1LCAwLjIpYClcbiAgXSlcbl0pO1xuIl19