/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Inject, NgZone, InjectionToken, Optional, } from '@angular/core';
import { RippleRenderer } from './ripple-renderer';
import { ViewportRuler } from '../overlay/position/viewport-ruler';
import { Platform } from '../platform/platform';
/**
 * @record
 */
export function RippleGlobalOptions() { }
/** @type {?|undefined} */
RippleGlobalOptions.prototype.disabled;
/** @type {?|undefined} */
RippleGlobalOptions.prototype.baseSpeedFactor;
/** *
 * Injection token that can be used to specify the global ripple options.
  @type {?} */
export const MD_RIPPLE_GLOBAL_OPTIONS = new InjectionToken('md-ripple-global-options');
export class MdRipple {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     * @param {?} ruler
     * @param {?} platform
     * @param {?} globalOptions
     */
    constructor(elementRef, ngZone, ruler, platform, globalOptions) {
        /**
         * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
         * will be the distance from the center of the ripple to the furthest corner of the host element's
         * bounding rectangle.
         */
        this.radius = 0;
        /**
         * If set, the normal duration of ripple animations is divided by this value. For example,
         * setting it to 0.5 will cause the animations to take twice as long.
         * A changed speedFactor will not modify the fade-out duration of the ripples.
         */
        this.speedFactor = 1;
        this._rippleRenderer = new RippleRenderer(elementRef, ngZone, ruler, platform);
        this._globalOptions = globalOptions ? globalOptions : {};
        this._updateRippleRenderer();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['trigger'] && this.trigger) {
            this._rippleRenderer.setTriggerElement(this.trigger);
        }
        this._updateRippleRenderer();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // Set the trigger element to null to cleanup all listeners.
        this._rippleRenderer.setTriggerElement(null);
    }
    /**
     * Launches a manual ripple at the specified position.
     * @param {?} pageX
     * @param {?} pageY
     * @param {?=} config
     * @return {?}
     */
    launch(pageX, pageY, config = this.rippleConfig) {
        return this._rippleRenderer.fadeInRipple(pageX, pageY, config);
    }
    /**
     * Fades out all currently showing ripple elements.
     * @return {?}
     */
    fadeOutAll() {
        this._rippleRenderer.fadeOutAll();
    }
    /**
     * Ripple configuration from the directive's input values.
     * @return {?}
     */
    get rippleConfig() {
        return {
            centered: this.centered,
            speedFactor: this.speedFactor * (this._globalOptions.baseSpeedFactor || 1),
            radius: this.radius,
            color: this.color
        };
    }
    /**
     * Updates the ripple renderer with the latest ripple configuration.
     * @return {?}
     */
    _updateRippleRenderer() {
        this._rippleRenderer.rippleDisabled = this._globalOptions.disabled || this.disabled;
        this._rippleRenderer.rippleConfig = this.rippleConfig;
    }
}
MdRipple.decorators = [
    { type: Directive, args: [{
                selector: '[md-ripple], [mat-ripple], [mdRipple], [matRipple]',
                exportAs: 'mdRipple',
                host: {
                    'class': 'mat-ripple',
                    '[class.mat-ripple-unbounded]': 'unbounded'
                }
            },] }
];
/** @nocollapse */
MdRipple.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: ViewportRuler },
    { type: Platform },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MD_RIPPLE_GLOBAL_OPTIONS,] }] }
];
MdRipple.propDecorators = {
    trigger: [{ type: Input, args: ['mdRippleTrigger',] }],
    centered: [{ type: Input, args: ['mdRippleCentered',] }],
    disabled: [{ type: Input, args: ['mdRippleDisabled',] }],
    radius: [{ type: Input, args: ['mdRippleRadius',] }],
    speedFactor: [{ type: Input, args: ['mdRippleSpeedFactor',] }],
    color: [{ type: Input, args: ['mdRippleColor',] }],
    unbounded: [{ type: Input, args: ['mdRippleUnbounded',] }]
};
if (false) {
    /**
     * The element that triggers the ripple when click events are received. Defaults to the
     * directive's host element.
     * @type {?}
     */
    MdRipple.prototype.trigger;
    /**
     * Whether the ripple always originates from the center of the host element's bounds, rather
     * than originating from the location of the click event.
     * @type {?}
     */
    MdRipple.prototype.centered;
    /**
     * Whether click events will not trigger the ripple. It can still be triggered by manually
     * calling createRipple()
     * @type {?}
     */
    MdRipple.prototype.disabled;
    /**
     * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
     * will be the distance from the center of the ripple to the furthest corner of the host element's
     * bounding rectangle.
     * @type {?}
     */
    MdRipple.prototype.radius;
    /**
     * If set, the normal duration of ripple animations is divided by this value. For example,
     * setting it to 0.5 will cause the animations to take twice as long.
     * A changed speedFactor will not modify the fade-out duration of the ripples.
     * @type {?}
     */
    MdRipple.prototype.speedFactor;
    /**
     * Custom color for ripples.
     * @type {?}
     */
    MdRipple.prototype.color;
    /**
     * Whether foreground ripples should be visible outside the component's bounds.
     * @type {?}
     */
    MdRipple.prototype.unbounded;
    /**
     * Renderer for the ripple DOM manipulations.
     * @type {?}
     */
    MdRipple.prototype._rippleRenderer;
    /**
     * Options that are set globally for all ripples.
     * @type {?}
     */
    MdRipple.prototype._globalOptions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlwcGxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9yaXBwbGUvcmlwcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFJTixjQUFjLEVBQ2QsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZSxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUUvRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDakUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7Ozs7Ozs7QUFROUMsYUFBYSx3QkFBd0IsR0FDakMsSUFBSSxjQUFjLENBQXNCLDBCQUEwQixDQUFDLENBQUM7QUFVeEUsTUFBTTs7Ozs7Ozs7SUFnREosWUFDRSxVQUFzQixFQUN0QixNQUFjLEVBQ2QsS0FBb0IsRUFDcEIsUUFBa0IsRUFDNEIsYUFBa0M7Ozs7OztzQkExQnhDLENBQUM7Ozs7OzsyQkFPUyxDQUFDO1FBcUJuRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUV6RCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN0QyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0tBQzlCOzs7O0lBRUQsV0FBVzs7UUFFVCxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlDOzs7Ozs7OztJQUdELE1BQU0sQ0FBQyxLQUFhLEVBQUUsS0FBYSxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWTtRQUM3RCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDaEU7Ozs7O0lBR0QsVUFBVTtRQUNSLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDbkM7Ozs7O0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTztZQUNMLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxJQUFJLENBQUMsQ0FBQztZQUMxRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUM7S0FDSDs7Ozs7SUFHTyxxQkFBcUI7UUFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNwRixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOzs7O1lBekd6RCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9EQUFvRDtnQkFDOUQsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsWUFBWTtvQkFDckIsOEJBQThCLEVBQUUsV0FBVztpQkFDNUM7YUFDRjs7OztZQS9CQyxVQUFVO1lBR1YsTUFBTTtZQVNBLGFBQWE7WUFDYixRQUFROzRDQXdFWCxRQUFRLFlBQUksTUFBTSxTQUFDLHdCQUF3Qjs7O3NCQTdDN0MsS0FBSyxTQUFDLGlCQUFpQjt1QkFNdkIsS0FBSyxTQUFDLGtCQUFrQjt1QkFNeEIsS0FBSyxTQUFDLGtCQUFrQjtxQkFPeEIsS0FBSyxTQUFDLGdCQUFnQjswQkFPdEIsS0FBSyxTQUFDLHFCQUFxQjtvQkFHM0IsS0FBSyxTQUFDLGVBQWU7d0JBR3JCLEtBQUssU0FBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIEluamVjdGlvblRva2VuLFxuICBPcHRpb25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JpcHBsZUNvbmZpZywgUmlwcGxlUmVuZGVyZXJ9IGZyb20gJy4vcmlwcGxlLXJlbmRlcmVyJztcbmltcG9ydCB7UmlwcGxlUmVmfSBmcm9tICcuL3JpcHBsZS1yZWYnO1xuaW1wb3J0IHtWaWV3cG9ydFJ1bGVyfSBmcm9tICcuLi9vdmVybGF5L3Bvc2l0aW9uL3ZpZXdwb3J0LXJ1bGVyJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJy4uL3BsYXRmb3JtL3BsYXRmb3JtJztcblxuZXhwb3J0IGludGVyZmFjZSBSaXBwbGVHbG9iYWxPcHRpb25zIHtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBiYXNlU3BlZWRGYWN0b3I/OiBudW1iZXI7XG59XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IHRoZSBnbG9iYWwgcmlwcGxlIG9wdGlvbnMuICovXG5leHBvcnQgY29uc3QgTURfUklQUExFX0dMT0JBTF9PUFRJT05TID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48UmlwcGxlR2xvYmFsT3B0aW9ucz4oJ21kLXJpcHBsZS1nbG9iYWwtb3B0aW9ucycpO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWQtcmlwcGxlXSwgW21hdC1yaXBwbGVdLCBbbWRSaXBwbGVdLCBbbWF0UmlwcGxlXScsXG4gIGV4cG9ydEFzOiAnbWRSaXBwbGUnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1yaXBwbGUnLFxuICAgICdbY2xhc3MubWF0LXJpcHBsZS11bmJvdW5kZWRdJzogJ3VuYm91bmRlZCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZFJpcHBsZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAvKipcbiAgICogVGhlIGVsZW1lbnQgdGhhdCB0cmlnZ2VycyB0aGUgcmlwcGxlIHdoZW4gY2xpY2sgZXZlbnRzIGFyZSByZWNlaXZlZC4gRGVmYXVsdHMgdG8gdGhlXG4gICAqIGRpcmVjdGl2ZSdzIGhvc3QgZWxlbWVudC5cbiAgICovXG4gIC8vIFByZXZlbnQgVFMgbWV0YWRhdGEgZW1pdCBmcm9tIHJlZmVyZW5jaW5nIEhUTUxFbGVtZW50IGluIHJpcHBsZS5qc1xuICAvLyBPdGhlcndpc2UgcnVubmluZyB0aGlzIGNvZGUgaW4gYSBOb2RlIGVudmlyb25tZW50IChlLmcgVW5pdmVyc2FsKSB3aWxsIG5vdCB3b3JrLlxuICBASW5wdXQoJ21kUmlwcGxlVHJpZ2dlcicpIHRyaWdnZXI6IEhUTUxFbGVtZW50fEhUTUxFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSByaXBwbGUgYWx3YXlzIG9yaWdpbmF0ZXMgZnJvbSB0aGUgY2VudGVyIG9mIHRoZSBob3N0IGVsZW1lbnQncyBib3VuZHMsIHJhdGhlclxuICAgKiB0aGFuIG9yaWdpbmF0aW5nIGZyb20gdGhlIGxvY2F0aW9uIG9mIHRoZSBjbGljayBldmVudC5cbiAgICovXG4gIEBJbnB1dCgnbWRSaXBwbGVDZW50ZXJlZCcpIGNlbnRlcmVkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGNsaWNrIGV2ZW50cyB3aWxsIG5vdCB0cmlnZ2VyIHRoZSByaXBwbGUuIEl0IGNhbiBzdGlsbCBiZSB0cmlnZ2VyZWQgYnkgbWFudWFsbHlcbiAgICogY2FsbGluZyBjcmVhdGVSaXBwbGUoKVxuICAgKi9cbiAgQElucHV0KCdtZFJpcHBsZURpc2FibGVkJykgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIHNldCwgdGhlIHJhZGl1cyBpbiBwaXhlbHMgb2YgZm9yZWdyb3VuZCByaXBwbGVzIHdoZW4gZnVsbHkgZXhwYW5kZWQuIElmIHVuc2V0LCB0aGUgcmFkaXVzXG4gICAqIHdpbGwgYmUgdGhlIGRpc3RhbmNlIGZyb20gdGhlIGNlbnRlciBvZiB0aGUgcmlwcGxlIHRvIHRoZSBmdXJ0aGVzdCBjb3JuZXIgb2YgdGhlIGhvc3QgZWxlbWVudCdzXG4gICAqIGJvdW5kaW5nIHJlY3RhbmdsZS5cbiAgICovXG4gIEBJbnB1dCgnbWRSaXBwbGVSYWRpdXMnKSByYWRpdXM6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIElmIHNldCwgdGhlIG5vcm1hbCBkdXJhdGlvbiBvZiByaXBwbGUgYW5pbWF0aW9ucyBpcyBkaXZpZGVkIGJ5IHRoaXMgdmFsdWUuIEZvciBleGFtcGxlLFxuICAgKiBzZXR0aW5nIGl0IHRvIDAuNSB3aWxsIGNhdXNlIHRoZSBhbmltYXRpb25zIHRvIHRha2UgdHdpY2UgYXMgbG9uZy5cbiAgICogQSBjaGFuZ2VkIHNwZWVkRmFjdG9yIHdpbGwgbm90IG1vZGlmeSB0aGUgZmFkZS1vdXQgZHVyYXRpb24gb2YgdGhlIHJpcHBsZXMuXG4gICAqL1xuICBASW5wdXQoJ21kUmlwcGxlU3BlZWRGYWN0b3InKSBzcGVlZEZhY3RvcjogbnVtYmVyID0gMTtcblxuICAvKiogQ3VzdG9tIGNvbG9yIGZvciByaXBwbGVzLiAqL1xuICBASW5wdXQoJ21kUmlwcGxlQ29sb3InKSBjb2xvcjogc3RyaW5nO1xuXG4gIC8qKiBXaGV0aGVyIGZvcmVncm91bmQgcmlwcGxlcyBzaG91bGQgYmUgdmlzaWJsZSBvdXRzaWRlIHRoZSBjb21wb25lbnQncyBib3VuZHMuICovXG4gIEBJbnB1dCgnbWRSaXBwbGVVbmJvdW5kZWQnKSB1bmJvdW5kZWQ6IGJvb2xlYW47XG5cbiAgLyoqIFJlbmRlcmVyIGZvciB0aGUgcmlwcGxlIERPTSBtYW5pcHVsYXRpb25zLiAqL1xuICBwcml2YXRlIF9yaXBwbGVSZW5kZXJlcjogUmlwcGxlUmVuZGVyZXI7XG5cbiAgLyoqIE9wdGlvbnMgdGhhdCBhcmUgc2V0IGdsb2JhbGx5IGZvciBhbGwgcmlwcGxlcy4gKi9cbiAgcHJpdmF0ZSBfZ2xvYmFsT3B0aW9uczogUmlwcGxlR2xvYmFsT3B0aW9ucztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIG5nWm9uZTogTmdab25lLFxuICAgIHJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1EX1JJUFBMRV9HTE9CQUxfT1BUSU9OUykgZ2xvYmFsT3B0aW9uczogUmlwcGxlR2xvYmFsT3B0aW9uc1xuICApIHtcbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlciA9IG5ldyBSaXBwbGVSZW5kZXJlcihlbGVtZW50UmVmLCBuZ1pvbmUsIHJ1bGVyLCBwbGF0Zm9ybSk7XG4gICAgdGhpcy5fZ2xvYmFsT3B0aW9ucyA9IGdsb2JhbE9wdGlvbnMgPyBnbG9iYWxPcHRpb25zIDoge307XG5cbiAgICB0aGlzLl91cGRhdGVSaXBwbGVSZW5kZXJlcigpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWyd0cmlnZ2VyJ10gJiYgdGhpcy50cmlnZ2VyKSB7XG4gICAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5zZXRUcmlnZ2VyRWxlbWVudCh0aGlzLnRyaWdnZXIpO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZVJpcHBsZVJlbmRlcmVyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICAvLyBTZXQgdGhlIHRyaWdnZXIgZWxlbWVudCB0byBudWxsIHRvIGNsZWFudXAgYWxsIGxpc3RlbmVycy5cbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5zZXRUcmlnZ2VyRWxlbWVudChudWxsKTtcbiAgfVxuXG4gIC8qKiBMYXVuY2hlcyBhIG1hbnVhbCByaXBwbGUgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbi4gKi9cbiAgbGF1bmNoKHBhZ2VYOiBudW1iZXIsIHBhZ2VZOiBudW1iZXIsIGNvbmZpZyA9IHRoaXMucmlwcGxlQ29uZmlnKTogUmlwcGxlUmVmIHtcbiAgICByZXR1cm4gdGhpcy5fcmlwcGxlUmVuZGVyZXIuZmFkZUluUmlwcGxlKHBhZ2VYLCBwYWdlWSwgY29uZmlnKTtcbiAgfVxuXG4gIC8qKiBGYWRlcyBvdXQgYWxsIGN1cnJlbnRseSBzaG93aW5nIHJpcHBsZSBlbGVtZW50cy4gKi9cbiAgZmFkZU91dEFsbCgpIHtcbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5mYWRlT3V0QWxsKCk7XG4gIH1cblxuICAvKiogUmlwcGxlIGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgZGlyZWN0aXZlJ3MgaW5wdXQgdmFsdWVzLiAqL1xuICBnZXQgcmlwcGxlQ29uZmlnKCk6IFJpcHBsZUNvbmZpZyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNlbnRlcmVkOiB0aGlzLmNlbnRlcmVkLFxuICAgICAgc3BlZWRGYWN0b3I6IHRoaXMuc3BlZWRGYWN0b3IgKiAodGhpcy5fZ2xvYmFsT3B0aW9ucy5iYXNlU3BlZWRGYWN0b3IgfHwgMSksXG4gICAgICByYWRpdXM6IHRoaXMucmFkaXVzLFxuICAgICAgY29sb3I6IHRoaXMuY29sb3JcbiAgICB9O1xuICB9XG5cbiAgLyoqIFVwZGF0ZXMgdGhlIHJpcHBsZSByZW5kZXJlciB3aXRoIHRoZSBsYXRlc3QgcmlwcGxlIGNvbmZpZ3VyYXRpb24uICovXG4gIHByaXZhdGUgX3VwZGF0ZVJpcHBsZVJlbmRlcmVyKCkge1xuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLnJpcHBsZURpc2FibGVkID0gdGhpcy5fZ2xvYmFsT3B0aW9ucy5kaXNhYmxlZCB8fCB0aGlzLmRpc2FibGVkO1xuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLnJpcHBsZUNvbmZpZyA9IHRoaXMucmlwcGxlQ29uZmlnO1xuICB9XG59XG4iXX0=