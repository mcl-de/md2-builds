/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, InjectionToken, Optional, Inject, SkipSelf, } from '@angular/core';
import { Platform } from '../platform/platform';
/** @type {?} */
export const LIVE_ANNOUNCER_ELEMENT_TOKEN = new InjectionToken('liveAnnouncerElement');
/** @typedef {?} */
var AriaLivePoliteness;
export { AriaLivePoliteness };
export class LiveAnnouncer {
    /**
     * @param {?} elementToken
     * @param {?} platform
     */
    constructor(elementToken, platform) {
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
     * @param {?} message Message to be announced to the screenreader
     * @param {?=} politeness The politeness of the announcer element
     * @return {?}
     */
    announce(message, politeness = 'polite') {
        this._liveElement.textContent = '';
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', politeness);
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        setTimeout(() => this._liveElement.textContent = message, 100);
    }
    /**
     * Removes the aria-live element from the DOM.
     * @return {?}
     */
    _removeLiveElement() {
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
        }
    }
    /**
     * @return {?}
     */
    _createLiveElement() {
        /** @type {?} */
        let liveEl = document.createElement('div');
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(liveEl);
        return liveEl;
    }
}
LiveAnnouncer.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LiveAnnouncer.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIVE_ANNOUNCER_ELEMENT_TOKEN,] }] },
    { type: Platform }
];
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
export const LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new Optional(), new SkipSelf(), LiveAnnouncer],
        [new Optional(), new Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)],
        Platform,
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZS1hbm5vdW5jZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2ExMXkvbGl2ZS1hbm5vdW5jZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxVQUFVLEVBQ1YsY0FBYyxFQUNkLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7QUFHOUMsYUFBYSw0QkFBNEIsR0FBRyxJQUFJLGNBQWMsQ0FBYyxzQkFBc0IsQ0FBQyxDQUFDOzs7O0FBTXBHLE1BQU07Ozs7O0lBSUosWUFDc0QsWUFBaUIsRUFDbkUsUUFBa0I7O1FBRXBCLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTs7OztZQUl0QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMvRDtLQUNGOzs7Ozs7O0lBT0QsUUFBUSxDQUFDLE9BQWUsRUFBRSxhQUFpQyxRQUFRO1FBQ2pFLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQzs7UUFHbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7Ozs7UUFPeEQsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNoRTs7Ozs7SUFHRCxrQkFBa0I7UUFDaEIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFO1lBQ3JELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDN0Q7S0FDRjs7OztJQUVPLGtCQUFrQjs7UUFDeEIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWxDLE9BQU8sTUFBTSxDQUFDOzs7O1lBcERqQixVQUFVOzs7OzRDQU1KLFFBQVEsWUFBSSxNQUFNLFNBQUMsNEJBQTRCO1lBZDlDLFFBQVE7Ozs7Ozs7Ozs7OztBQWlFaEIsTUFBTSwwQ0FDRixnQkFBK0IsRUFBRSxXQUFnQixFQUFFLFFBQWtCO0lBQ3ZFLE9BQU8sZ0JBQWdCLElBQUksSUFBSSxhQUFhLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ3JFOztBQUVELGFBQWEsdUJBQXVCLEdBQUc7O0lBRXJDLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLElBQUksRUFBRTtRQUNKLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLGFBQWEsQ0FBQztRQUMvQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUMxRCxRQUFRO0tBQ1Q7SUFDRCxVQUFVLEVBQUUsK0JBQStCO0NBQzVDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgT3B0aW9uYWwsXG4gIEluamVjdCxcbiAgU2tpcFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnLi4vcGxhdGZvcm0vcGxhdGZvcm0nO1xuXG5cbmV4cG9ydCBjb25zdCBMSVZFX0FOTk9VTkNFUl9FTEVNRU5UX1RPS0VOID0gbmV3IEluamVjdGlvblRva2VuPEhUTUxFbGVtZW50PignbGl2ZUFubm91bmNlckVsZW1lbnQnKTtcblxuLyoqIFBvc3NpYmxlIHBvbGl0ZW5lc3MgbGV2ZWxzLiAqL1xuZXhwb3J0IHR5cGUgQXJpYUxpdmVQb2xpdGVuZXNzID0gJ29mZicgfCAncG9saXRlJyB8ICdhc3NlcnRpdmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTGl2ZUFubm91bmNlciB7XG5cbiAgcHJpdmF0ZSBfbGl2ZUVsZW1lbnQ6IEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KExJVkVfQU5OT1VOQ0VSX0VMRU1FTlRfVE9LRU4pIGVsZW1lbnRUb2tlbjogYW55LFxuICAgICAgcGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gICAgLy8gT25seSBkbyBhbnl0aGluZyBpZiB3ZSdyZSBvbiB0aGUgYnJvd3NlciBwbGF0Zm9ybS5cbiAgICBpZiAocGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICAvLyBXZSBpbmplY3QgdGhlIGxpdmUgZWxlbWVudCBhcyBgYW55YCBiZWNhdXNlIHRoZSBjb25zdHJ1Y3RvciBzaWduYXR1cmUgY2Fubm90IHJlZmVyZW5jZVxuICAgICAgLy8gYnJvd3NlciBnbG9iYWxzIChIVE1MRWxlbWVudCkgb24gbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRzLCBzaW5jZSBoYXZpbmcgYSBjbGFzcyBkZWNvcmF0b3JcbiAgICAgIC8vIGNhdXNlcyBUeXBlU2NyaXB0IHRvIHByZXNlcnZlIHRoZSBjb25zdHJ1Y3RvciBzaWduYXR1cmUgdHlwZXMuXG4gICAgICB0aGlzLl9saXZlRWxlbWVudCA9IGVsZW1lbnRUb2tlbiB8fCB0aGlzLl9jcmVhdGVMaXZlRWxlbWVudCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbm5vdW5jZXMgYSBtZXNzYWdlIHRvIHNjcmVlbnJlYWRlcnMuXG4gICAqIEBwYXJhbSBtZXNzYWdlIE1lc3NhZ2UgdG8gYmUgYW5ub3VuY2VkIHRvIHRoZSBzY3JlZW5yZWFkZXJcbiAgICogQHBhcmFtIHBvbGl0ZW5lc3MgVGhlIHBvbGl0ZW5lc3Mgb2YgdGhlIGFubm91bmNlciBlbGVtZW50XG4gICAqL1xuICBhbm5vdW5jZShtZXNzYWdlOiBzdHJpbmcsIHBvbGl0ZW5lc3M6IEFyaWFMaXZlUG9saXRlbmVzcyA9ICdwb2xpdGUnKTogdm9pZCB7XG4gICAgdGhpcy5fbGl2ZUVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcblxuICAgIC8vIFRPRE86IGVuc3VyZSBjaGFuZ2luZyB0aGUgcG9saXRlbmVzcyB3b3JrcyBvbiBhbGwgZW52aXJvbm1lbnRzIHdlIHN1cHBvcnQuXG4gICAgdGhpcy5fbGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCBwb2xpdGVuZXNzKTtcblxuICAgIC8vIFRoaXMgMTAwbXMgdGltZW91dCBpcyBuZWNlc3NhcnkgZm9yIHNvbWUgYnJvd3NlciArIHNjcmVlbi1yZWFkZXIgY29tYmluYXRpb25zOlxuICAgIC8vIC0gQm90aCBKQVdTIGFuZCBOVkRBIG92ZXIgSUUxMSB3aWxsIG5vdCBhbm5vdW5jZSBhbnl0aGluZyB3aXRob3V0IGEgbm9uLXplcm8gdGltZW91dC5cbiAgICAvLyAtIFdpdGggQ2hyb21lIGFuZCBJRTExIHdpdGggTlZEQSBvciBKQVdTLCBhIHJlcGVhdGVkIChpZGVudGljYWwpIG1lc3NhZ2Ugd29uJ3QgYmUgcmVhZCBhXG4gICAgLy8gICBzZWNvbmQgdGltZSB3aXRob3V0IGNsZWFyaW5nIGFuZCB0aGVuIHVzaW5nIGEgbm9uLXplcm8gZGVsYXkuXG4gICAgLy8gKHVzaW5nIEpBV1MgMTcgYXQgdGltZSBvZiB0aGlzIHdyaXRpbmcpLlxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fbGl2ZUVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlLCAxMDApO1xuICB9XG5cbiAgLyoqIFJlbW92ZXMgdGhlIGFyaWEtbGl2ZSBlbGVtZW50IGZyb20gdGhlIERPTS4gKi9cbiAgX3JlbW92ZUxpdmVFbGVtZW50KCkge1xuICAgIGlmICh0aGlzLl9saXZlRWxlbWVudCAmJiB0aGlzLl9saXZlRWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLl9saXZlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX2xpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVMaXZlRWxlbWVudCgpOiBFbGVtZW50IHtcbiAgICBsZXQgbGl2ZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBsaXZlRWwuY2xhc3NMaXN0LmFkZCgnY2RrLXZpc3VhbGx5LWhpZGRlbicpO1xuICAgIGxpdmVFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtYXRvbWljJywgJ3RydWUnKTtcbiAgICBsaXZlRWwuc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCAncG9saXRlJyk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpdmVFbCk7XG5cbiAgICByZXR1cm4gbGl2ZUVsO1xuICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExJVkVfQU5OT1VOQ0VSX1BST1ZJREVSX0ZBQ1RPUlkoXG4gICAgcGFyZW50RGlzcGF0Y2hlcjogTGl2ZUFubm91bmNlciwgbGl2ZUVsZW1lbnQ6IGFueSwgcGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gIHJldHVybiBwYXJlbnREaXNwYXRjaGVyIHx8IG5ldyBMaXZlQW5ub3VuY2VyKGxpdmVFbGVtZW50LCBwbGF0Zm9ybSk7XG59XG5cbmV4cG9ydCBjb25zdCBMSVZFX0FOTk9VTkNFUl9QUk9WSURFUiA9IHtcbiAgLy8gSWYgdGhlcmUgaXMgYWxyZWFkeSBhIExpdmVBbm5vdW5jZXIgYXZhaWxhYmxlLCB1c2UgdGhhdC4gT3RoZXJ3aXNlLCBwcm92aWRlIGEgbmV3IG9uZS5cbiAgcHJvdmlkZTogTGl2ZUFubm91bmNlcixcbiAgZGVwczogW1xuICAgIFtuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIExpdmVBbm5vdW5jZXJdLFxuICAgIFtuZXcgT3B0aW9uYWwoKSwgbmV3IEluamVjdChMSVZFX0FOTk9VTkNFUl9FTEVNRU5UX1RPS0VOKV0sXG4gICAgUGxhdGZvcm0sXG4gIF0sXG4gIHVzZUZhY3Rvcnk6IExJVkVfQU5OT1VOQ0VSX1BST1ZJREVSX0ZBQ1RPUllcbn07XG4iXX0=