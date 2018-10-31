/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, InjectionToken, Optional, Inject, SkipSelf, } from '@angular/core';
import { Platform } from '../platform/platform';
/** @type {?} */
export var LIVE_ANNOUNCER_ELEMENT_TOKEN = new InjectionToken('liveAnnouncerElement');
/** @typedef {?} */
var AriaLivePoliteness;
export { AriaLivePoliteness };
var LiveAnnouncer = /** @class */ (function () {
    function LiveAnnouncer(elementToken, platform) {
        // Only do anything if we're on the browser platform.
        if (platform.isBrowser) {
            // We inject the live element as `any` because the constructor signature cannot reference
            // browser globals (HTMLElement) on non-browser environments, since having a class decorator
            // causes TypeScript to preserve the constructor signature types.
            this._liveElement = elementToken || this._createLiveElement();
        }
    }
    /**
     * Announces a message to screenreaders.
     * @param message Message to be announced to the screenreader
     * @param politeness The politeness of the announcer element
     */
    /**
     * Announces a message to screenreaders.
     * @param {?} message Message to be announced to the screenreader
     * @param {?=} politeness The politeness of the announcer element
     * @return {?}
     */
    LiveAnnouncer.prototype.announce = /**
     * Announces a message to screenreaders.
     * @param {?} message Message to be announced to the screenreader
     * @param {?=} politeness The politeness of the announcer element
     * @return {?}
     */
    function (message, politeness) {
        var _this = this;
        if (politeness === void 0) { politeness = 'polite'; }
        this._liveElement.textContent = '';
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', politeness);
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        setTimeout(function () { return _this._liveElement.textContent = message; }, 100);
    };
    /** Removes the aria-live element from the DOM. */
    /**
     * Removes the aria-live element from the DOM.
     * @return {?}
     */
    LiveAnnouncer.prototype._removeLiveElement = /**
     * Removes the aria-live element from the DOM.
     * @return {?}
     */
    function () {
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
        }
    };
    /**
     * @return {?}
     */
    LiveAnnouncer.prototype._createLiveElement = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var liveEl = document.createElement('div');
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(liveEl);
        return liveEl;
    };
    LiveAnnouncer.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LiveAnnouncer.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIVE_ANNOUNCER_ELEMENT_TOKEN,] }] },
        { type: Platform }
    ]; };
    return LiveAnnouncer;
}());
export { LiveAnnouncer };
if (false) {
    /** @type {?} */
    LiveAnnouncer.prototype._liveElement;
}
/**
 * @param {?} parentDispatcher
 * @param {?} liveElement
 * @param {?} platform
 * @return {?}
 */
export function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentDispatcher, liveElement, platform) {
    return parentDispatcher || new LiveAnnouncer(liveElement, platform);
}
/** @type {?} */
export var LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new Optional(), new SkipSelf(), LiveAnnouncer],
        [new Optional(), new Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)],
        Platform,
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZS1hbm5vdW5jZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2ExMXkvbGl2ZS1hbm5vdW5jZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxVQUFVLEVBQ1YsY0FBYyxFQUNkLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7QUFHOUMsV0FBYSw0QkFBNEIsR0FBRyxJQUFJLGNBQWMsQ0FBYyxzQkFBc0IsQ0FBQyxDQUFDOzs7OztJQVVsRyx1QkFDc0QsWUFBaUIsRUFDbkUsUUFBa0I7O1FBRXBCLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTs7OztZQUl0QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMvRDtLQUNGO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILGdDQUFROzs7Ozs7SUFBUixVQUFTLE9BQWUsRUFBRSxVQUF5QztRQUFuRSxpQkFZQztRQVp5QiwyQkFBQSxFQUFBLHFCQUF5QztRQUNqRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7O1FBR25DLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQzs7Ozs7O1FBT3hELFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsT0FBTyxFQUF2QyxDQUF1QyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ2hFO0lBRUQsa0RBQWtEOzs7OztJQUNsRCwwQ0FBa0I7Ozs7SUFBbEI7UUFDRSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUU7WUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM3RDtLQUNGOzs7O0lBRU8sMENBQWtCOzs7OztRQUN4QixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFM0MsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEMsT0FBTyxNQUFNLENBQUM7OztnQkFwRGpCLFVBQVU7Ozs7Z0RBTUosUUFBUSxZQUFJLE1BQU0sU0FBQyw0QkFBNEI7Z0JBZDlDLFFBQVE7O3dCQVBoQjs7U0FnQmEsYUFBYTs7Ozs7Ozs7Ozs7QUF3RDFCLE1BQU0sMENBQ0YsZ0JBQStCLEVBQUUsV0FBZ0IsRUFBRSxRQUFrQjtJQUN2RSxPQUFPLGdCQUFnQixJQUFJLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztDQUNyRTs7QUFFRCxXQUFhLHVCQUF1QixHQUFHOztJQUVyQyxPQUFPLEVBQUUsYUFBYTtJQUN0QixJQUFJLEVBQUU7UUFDSixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxhQUFhLENBQUM7UUFDL0MsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDMUQsUUFBUTtLQUNUO0lBQ0QsVUFBVSxFQUFFLCtCQUErQjtDQUM1QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIE9wdGlvbmFsLFxuICBJbmplY3QsXG4gIFNraXBTZWxmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJy4uL3BsYXRmb3JtL3BsYXRmb3JtJztcblxuXG5leHBvcnQgY29uc3QgTElWRV9BTk5PVU5DRVJfRUxFTUVOVF9UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxIVE1MRWxlbWVudD4oJ2xpdmVBbm5vdW5jZXJFbGVtZW50Jyk7XG5cbi8qKiBQb3NzaWJsZSBwb2xpdGVuZXNzIGxldmVscy4gKi9cbmV4cG9ydCB0eXBlIEFyaWFMaXZlUG9saXRlbmVzcyA9ICdvZmYnIHwgJ3BvbGl0ZScgfCAnYXNzZXJ0aXZlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExpdmVBbm5vdW5jZXIge1xuXG4gIHByaXZhdGUgX2xpdmVFbGVtZW50OiBFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChMSVZFX0FOTk9VTkNFUl9FTEVNRU5UX1RPS0VOKSBlbGVtZW50VG9rZW46IGFueSxcbiAgICAgIHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xuICAgIC8vIE9ubHkgZG8gYW55dGhpbmcgaWYgd2UncmUgb24gdGhlIGJyb3dzZXIgcGxhdGZvcm0uXG4gICAgaWYgKHBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgLy8gV2UgaW5qZWN0IHRoZSBsaXZlIGVsZW1lbnQgYXMgYGFueWAgYmVjYXVzZSB0aGUgY29uc3RydWN0b3Igc2lnbmF0dXJlIGNhbm5vdCByZWZlcmVuY2VcbiAgICAgIC8vIGJyb3dzZXIgZ2xvYmFscyAoSFRNTEVsZW1lbnQpIG9uIG5vbi1icm93c2VyIGVudmlyb25tZW50cywgc2luY2UgaGF2aW5nIGEgY2xhc3MgZGVjb3JhdG9yXG4gICAgICAvLyBjYXVzZXMgVHlwZVNjcmlwdCB0byBwcmVzZXJ2ZSB0aGUgY29uc3RydWN0b3Igc2lnbmF0dXJlIHR5cGVzLlxuICAgICAgdGhpcy5fbGl2ZUVsZW1lbnQgPSBlbGVtZW50VG9rZW4gfHwgdGhpcy5fY3JlYXRlTGl2ZUVsZW1lbnQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQW5ub3VuY2VzIGEgbWVzc2FnZSB0byBzY3JlZW5yZWFkZXJzLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBNZXNzYWdlIHRvIGJlIGFubm91bmNlZCB0byB0aGUgc2NyZWVucmVhZGVyXG4gICAqIEBwYXJhbSBwb2xpdGVuZXNzIFRoZSBwb2xpdGVuZXNzIG9mIHRoZSBhbm5vdW5jZXIgZWxlbWVudFxuICAgKi9cbiAgYW5ub3VuY2UobWVzc2FnZTogc3RyaW5nLCBwb2xpdGVuZXNzOiBBcmlhTGl2ZVBvbGl0ZW5lc3MgPSAncG9saXRlJyk6IHZvaWQge1xuICAgIHRoaXMuX2xpdmVFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG5cbiAgICAvLyBUT0RPOiBlbnN1cmUgY2hhbmdpbmcgdGhlIHBvbGl0ZW5lc3Mgd29ya3Mgb24gYWxsIGVudmlyb25tZW50cyB3ZSBzdXBwb3J0LlxuICAgIHRoaXMuX2xpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgcG9saXRlbmVzcyk7XG5cbiAgICAvLyBUaGlzIDEwMG1zIHRpbWVvdXQgaXMgbmVjZXNzYXJ5IGZvciBzb21lIGJyb3dzZXIgKyBzY3JlZW4tcmVhZGVyIGNvbWJpbmF0aW9uczpcbiAgICAvLyAtIEJvdGggSkFXUyBhbmQgTlZEQSBvdmVyIElFMTEgd2lsbCBub3QgYW5ub3VuY2UgYW55dGhpbmcgd2l0aG91dCBhIG5vbi16ZXJvIHRpbWVvdXQuXG4gICAgLy8gLSBXaXRoIENocm9tZSBhbmQgSUUxMSB3aXRoIE5WREEgb3IgSkFXUywgYSByZXBlYXRlZCAoaWRlbnRpY2FsKSBtZXNzYWdlIHdvbid0IGJlIHJlYWQgYVxuICAgIC8vICAgc2Vjb25kIHRpbWUgd2l0aG91dCBjbGVhcmluZyBhbmQgdGhlbiB1c2luZyBhIG5vbi16ZXJvIGRlbGF5LlxuICAgIC8vICh1c2luZyBKQVdTIDE3IGF0IHRpbWUgb2YgdGhpcyB3cml0aW5nKS5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2xpdmVFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZSwgMTAwKTtcbiAgfVxuXG4gIC8qKiBSZW1vdmVzIHRoZSBhcmlhLWxpdmUgZWxlbWVudCBmcm9tIHRoZSBET00uICovXG4gIF9yZW1vdmVMaXZlRWxlbWVudCgpIHtcbiAgICBpZiAodGhpcy5fbGl2ZUVsZW1lbnQgJiYgdGhpcy5fbGl2ZUVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgdGhpcy5fbGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9saXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlTGl2ZUVsZW1lbnQoKTogRWxlbWVudCB7XG4gICAgbGV0IGxpdmVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgbGl2ZUVsLmNsYXNzTGlzdC5hZGQoJ2Nkay12aXN1YWxseS1oaWRkZW4nKTtcbiAgICBsaXZlRWwuc2V0QXR0cmlidXRlKCdhcmlhLWF0b21pYycsICd0cnVlJyk7XG4gICAgbGl2ZUVsLnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgJ3BvbGl0ZScpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaXZlRWwpO1xuXG4gICAgcmV0dXJuIGxpdmVFbDtcbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMSVZFX0FOTk9VTkNFUl9QUk9WSURFUl9GQUNUT1JZKFxuICAgIHBhcmVudERpc3BhdGNoZXI6IExpdmVBbm5vdW5jZXIsIGxpdmVFbGVtZW50OiBhbnksIHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xuICByZXR1cm4gcGFyZW50RGlzcGF0Y2hlciB8fCBuZXcgTGl2ZUFubm91bmNlcihsaXZlRWxlbWVudCwgcGxhdGZvcm0pO1xufVxuXG5leHBvcnQgY29uc3QgTElWRV9BTk5PVU5DRVJfUFJPVklERVIgPSB7XG4gIC8vIElmIHRoZXJlIGlzIGFscmVhZHkgYSBMaXZlQW5ub3VuY2VyIGF2YWlsYWJsZSwgdXNlIHRoYXQuIE90aGVyd2lzZSwgcHJvdmlkZSBhIG5ldyBvbmUuXG4gIHByb3ZpZGU6IExpdmVBbm5vdW5jZXIsXG4gIGRlcHM6IFtcbiAgICBbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBMaXZlQW5ub3VuY2VyXSxcbiAgICBbbmV3IE9wdGlvbmFsKCksIG5ldyBJbmplY3QoTElWRV9BTk5PVU5DRVJfRUxFTUVOVF9UT0tFTildLFxuICAgIFBsYXRmb3JtLFxuICBdLFxuICB1c2VGYWN0b3J5OiBMSVZFX0FOTk9VTkNFUl9QUk9WSURFUl9GQUNUT1JZXG59O1xuIl19