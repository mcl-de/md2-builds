/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { MdLineModule } from './line/line';
import { RtlModule } from './rtl/dir';
import { ObserveContentModule } from './observe-content/observe-content';
import { MdOptionModule } from './option/index';
import { PortalModule } from './portal/portal-directives';
import { OverlayModule } from './overlay/overlay-directives';
import { A11yModule } from './a11y/index';
import { MdSelectionModule } from './selection/index';
import { MdRippleModule } from './ripple/index';
export { Dir, RtlModule } from './rtl/dir';
export { ObserveContentModule, ObserveContent } from './observe-content/observe-content';
export { MdOptionModule, MdOptionSelectionChange, MdOption, MdOptgroupBase, _MdOptgroupMixinBase, MdOptgroup } from './option/index';
export { Portal, BasePortalHost, ComponentPortal, TemplatePortal } from './portal/portal';
export { PortalHostDirective, TemplatePortalDirective, PortalModule, } from './portal/portal-directives';
export { DomPortalHost } from './portal/dom-portal-host';
// Platform
export { PlatformModule, Platform, getSupportedInputTypes } from './platform/index';
// Overlay
export { Overlay, OVERLAY_PROVIDERS, OverlayContainer, FullscreenOverlayContainer, OverlayRef, OverlayState, ConnectedOverlayDirective, OverlayOrigin, OverlayModule, ViewportRuler, GlobalPositionStrategy, ConnectedPositionStrategy, ConnectionPositionPair, ScrollableViewProperties, ConnectedOverlayPositionChange, Scrollable, ScrollDispatcher, ScrollStrategyOptions, RepositionScrollStrategy, CloseScrollStrategy, NoopScrollStrategy, BlockScrollStrategy, ScrollDispatchModule } from './overlay/index';
export { GestureConfig } from './gestures/gesture-config';
// Ripple
export { MdRipple, MD_RIPPLE_GLOBAL_OPTIONS, RippleRef, RippleState, RIPPLE_FADE_IN_DURATION, RIPPLE_FADE_OUT_DURATION, MdRippleModule } from './ripple/index';
export { LiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN, LIVE_ANNOUNCER_PROVIDER, } from './a11y/live-announcer';
// Selection
export { SelectionModel, SelectionChange } from './selection/selection';
export { FocusTrap, FocusTrapFactory, FocusTrapDeprecatedDirective, FocusTrapDirective } from './a11y/focus-trap';
export { InteractivityChecker } from './a11y/interactivity-checker';
export { isFakeMousedownFromScreenReader } from './a11y/fake-mousedown';
export { A11yModule } from './a11y/index';
export { UniqueSelectionDispatcher, UNIQUE_SELECTION_DISPATCHER_PROVIDER, } from './coordination/unique-selection-dispatcher';
export { MdLineModule, MdLine, MdLineSetter } from './line/line';
// Style
export { StyleModule, FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY, TOUCH_BUFFER_MS, FocusOriginMonitor, CdkMonitorFocus, FOCUS_ORIGIN_MONITOR_PROVIDER, applyCssTransform } from './style/index';
// Keybindings
export { UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, PAGE_UP, PAGE_DOWN, HOME, END, ENTER, SPACE, TAB, ESCAPE, BACKSPACE, DELETE, COMMA } from './keyboard/keycodes';
export { getMdCompatibilityInvalidPrefixError, MATERIAL_COMPATIBILITY_MODE, MAT_ELEMENTS_SELECTOR, MD_ELEMENTS_SELECTOR, MatPrefixRejector, MdPrefixRejector } from './compatibility/compatibility';
// Animation
export { AnimationCurves, AnimationDurations } from './animation/animation';
// Selection
export { MdSelectionModule, MdPseudoCheckboxBase, _MdPseudoCheckboxBase, MdPseudoCheckbox } from './selection/index';
export { coerceBooleanProperty } from './coercion/boolean-property';
export { coerceNumberProperty } from './coercion/number-property';
export { CompatibilityModule, NoConflictStyleCompatibilityMode } from './compatibility/compatibility';
export { MdCommonModule, MATERIAL_SANITY_CHECKS } from './common-behaviors/common-module';
// Datetime
export { NativeDateModule, MdNativeDateModule, DateAdapter, MD_DATE_FORMATS, NativeDateAdapter, MD_NATIVE_DATE_FORMATS } from './datetime/index';
export { MD_PLACEHOLDER_GLOBAL_OPTIONS } from './placeholder/placeholder-options';
export class MdCoreModule {
}
MdCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MdLineModule,
                    RtlModule,
                    MdRippleModule,
                    ObserveContentModule,
                    PortalModule,
                    OverlayModule,
                    A11yModule,
                    MdOptionModule,
                    MdSelectionModule,
                ],
                exports: [
                    MdLineModule,
                    RtlModule,
                    MdRippleModule,
                    ObserveContentModule,
                    PortalModule,
                    OverlayModule,
                    A11yModule,
                    MdOptionModule,
                    MdSelectionModule,
                ],
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFJOUMsT0FBTyxFQUFDLEdBQUcsRUFBbUIsU0FBUyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRzFELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxjQUFjLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUV2RixvSEFBYyxnQkFBZ0IsQ0FBQztBQUcvQixPQUFPLEVBQ0wsTUFBTSxFQUVOLGNBQWMsRUFDZCxlQUFlLEVBQ2YsY0FBYyxFQUNmLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLG1CQUFtQixFQUNuQix1QkFBdUIsRUFDdkIsWUFBWSxHQUNiLE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDBCQUEwQixDQUFDOztBQUd2RCxpRUFBYyxrQkFBa0IsQ0FBQzs7QUFHakMsbWVBQWMsaUJBQWlCLENBQUM7QUFHaEMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOztBQU14RCw4SUFBYyxnQkFBZ0IsQ0FBQztBQUcvQixPQUFPLEVBRUwsYUFBYSxFQUNiLDRCQUE0QixFQUM1Qix1QkFBdUIsR0FDeEIsTUFBTSx1QkFBdUIsQ0FBQzs7QUFHL0IsZ0RBQWMsdUJBQXVCLENBQUM7QUFFdEMsOEZBQWMsbUJBQW1CLENBQUM7QUFDbEMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFdEUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUV4QyxPQUFPLEVBQ0wseUJBQXlCLEVBRXpCLG9DQUFvQyxHQUNyQyxNQUFNLDRDQUE0QyxDQUFDO0FBRXBELE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQzs7QUFHL0QsMktBQWMsZUFBZSxDQUFDOztBQU05QixrSkFBYyxxQkFBcUIsQ0FBQztBQUVwQyxvS0FBYywrQkFBK0IsQ0FBQzs7QUFHOUMsb0RBQWMsdUJBQXVCLENBQUM7O0FBR3RDLGlHQUFjLG1CQUFtQixDQUFDO0FBR2xDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBR2hFLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxnQ0FBZ0MsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBR3BHLE9BQU8sRUFBQyxjQUFjLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQzs7QUFHeEYsOEhBQWMsa0JBQWtCLENBQUM7QUFHakMsT0FBTyxFQUdMLDZCQUE2QixFQUM5QixNQUFNLG1DQUFtQyxDQUFDO0FBMEIzQyxNQUFNOzs7WUF4QkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFNBQVM7b0JBQ1QsY0FBYztvQkFDZCxvQkFBb0I7b0JBQ3BCLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixVQUFVO29CQUNWLGNBQWM7b0JBQ2QsaUJBQWlCO2lCQUNsQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixTQUFTO29CQUNULGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNwQixZQUFZO29CQUNaLGFBQWE7b0JBQ2IsVUFBVTtvQkFDVixjQUFjO29CQUNkLGlCQUFpQjtpQkFDbEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZExpbmVNb2R1bGV9IGZyb20gJy4vbGluZS9saW5lJztcbmltcG9ydCB7UnRsTW9kdWxlfSBmcm9tICcuL3J0bC9kaXInO1xuaW1wb3J0IHtPYnNlcnZlQ29udGVudE1vZHVsZX0gZnJvbSAnLi9vYnNlcnZlLWNvbnRlbnQvb2JzZXJ2ZS1jb250ZW50JztcbmltcG9ydCB7TWRPcHRpb25Nb2R1bGV9IGZyb20gJy4vb3B0aW9uL2luZGV4JztcbmltcG9ydCB7UG9ydGFsTW9kdWxlfSBmcm9tICcuL3BvcnRhbC9wb3J0YWwtZGlyZWN0aXZlcyc7XG5pbXBvcnQge092ZXJsYXlNb2R1bGV9IGZyb20gJy4vb3ZlcmxheS9vdmVybGF5LWRpcmVjdGl2ZXMnO1xuaW1wb3J0IHtBMTF5TW9kdWxlfSBmcm9tICcuL2ExMXkvaW5kZXgnO1xuaW1wb3J0IHtNZFNlbGVjdGlvbk1vZHVsZX0gZnJvbSAnLi9zZWxlY3Rpb24vaW5kZXgnO1xuaW1wb3J0IHtNZFJpcHBsZU1vZHVsZX0gZnJvbSAnLi9yaXBwbGUvaW5kZXgnO1xuXG5cbi8vIFJUTFxuZXhwb3J0IHtEaXIsIExheW91dERpcmVjdGlvbiwgUnRsTW9kdWxlfSBmcm9tICcuL3J0bC9kaXInO1xuXG4vLyBNdXRhdGlvbiBPYnNlcnZlclxuZXhwb3J0IHtPYnNlcnZlQ29udGVudE1vZHVsZSwgT2JzZXJ2ZUNvbnRlbnR9IGZyb20gJy4vb2JzZXJ2ZS1jb250ZW50L29ic2VydmUtY29udGVudCc7XG5cbmV4cG9ydCAqIGZyb20gJy4vb3B0aW9uL2luZGV4JztcblxuLy8gUG9ydGFsc1xuZXhwb3J0IHtcbiAgUG9ydGFsLFxuICBQb3J0YWxIb3N0LFxuICBCYXNlUG9ydGFsSG9zdCxcbiAgQ29tcG9uZW50UG9ydGFsLFxuICBUZW1wbGF0ZVBvcnRhbFxufSBmcm9tICcuL3BvcnRhbC9wb3J0YWwnO1xuZXhwb3J0IHtcbiAgUG9ydGFsSG9zdERpcmVjdGl2ZSxcbiAgVGVtcGxhdGVQb3J0YWxEaXJlY3RpdmUsXG4gIFBvcnRhbE1vZHVsZSxcbn0gZnJvbSAnLi9wb3J0YWwvcG9ydGFsLWRpcmVjdGl2ZXMnO1xuZXhwb3J0IHtEb21Qb3J0YWxIb3N0fSBmcm9tICcuL3BvcnRhbC9kb20tcG9ydGFsLWhvc3QnO1xuXG4vLyBQbGF0Zm9ybVxuZXhwb3J0ICogZnJvbSAnLi9wbGF0Zm9ybS9pbmRleCc7XG5cbi8vIE92ZXJsYXlcbmV4cG9ydCAqIGZyb20gJy4vb3ZlcmxheS9pbmRleCc7XG5cbi8vIEdlc3R1cmVzXG5leHBvcnQge0dlc3R1cmVDb25maWd9IGZyb20gJy4vZ2VzdHVyZXMvZ2VzdHVyZS1jb25maWcnO1xuLy8gRXhwbGljaXRseSBzcGVjaWZ5IHRoZSBpbnRlcmZhY2VzIHdoaWNoIHNob3VsZCBiZSByZS1leHBvcnRlZCwgYmVjYXVzZSBpZiBldmVyeXRoaW5nXG4vLyBpcyByZS1leHBvcnRlZCwgbW9kdWxlIGJ1bmRsZXJzIG1heSBydW4gaW50byBpc3N1ZXMgd2l0aCB0cmVlc2hha2luZy5cbmV4cG9ydCB7SGFtbWVySW5wdXQsIEhhbW1lck1hbmFnZXJ9IGZyb20gJy4vZ2VzdHVyZXMvZ2VzdHVyZS1hbm5vdGF0aW9ucyc7XG5cbi8vIFJpcHBsZVxuZXhwb3J0ICogZnJvbSAnLi9yaXBwbGUvaW5kZXgnO1xuXG4vLyBhMTF5XG5leHBvcnQge1xuICBBcmlhTGl2ZVBvbGl0ZW5lc3MsXG4gIExpdmVBbm5vdW5jZXIsXG4gIExJVkVfQU5OT1VOQ0VSX0VMRU1FTlRfVE9LRU4sXG4gIExJVkVfQU5OT1VOQ0VSX1BST1ZJREVSLFxufSBmcm9tICcuL2ExMXkvbGl2ZS1hbm5vdW5jZXInO1xuXG4vLyBTZWxlY3Rpb25cbmV4cG9ydCAqIGZyb20gJy4vc2VsZWN0aW9uL3NlbGVjdGlvbic7XG5cbmV4cG9ydCAqIGZyb20gJy4vYTExeS9mb2N1cy10cmFwJztcbmV4cG9ydCB7SW50ZXJhY3Rpdml0eUNoZWNrZXJ9IGZyb20gJy4vYTExeS9pbnRlcmFjdGl2aXR5LWNoZWNrZXInO1xuZXhwb3J0IHtpc0Zha2VNb3VzZWRvd25Gcm9tU2NyZWVuUmVhZGVyfSBmcm9tICcuL2ExMXkvZmFrZS1tb3VzZWRvd24nO1xuXG5leHBvcnQge0ExMXlNb2R1bGV9IGZyb20gJy4vYTExeS9pbmRleCc7XG5cbmV4cG9ydCB7XG4gIFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIsXG4gIFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXJMaXN0ZW5lcixcbiAgVU5JUVVFX1NFTEVDVElPTl9ESVNQQVRDSEVSX1BST1ZJREVSLFxufSBmcm9tICcuL2Nvb3JkaW5hdGlvbi91bmlxdWUtc2VsZWN0aW9uLWRpc3BhdGNoZXInO1xuXG5leHBvcnQge01kTGluZU1vZHVsZSwgTWRMaW5lLCBNZExpbmVTZXR0ZXJ9IGZyb20gJy4vbGluZS9saW5lJztcblxuLy8gU3R5bGVcbmV4cG9ydCAqIGZyb20gJy4vc3R5bGUvaW5kZXgnO1xuXG4vLyBNaXNjXG5leHBvcnQge0NvbXBvbmVudFR5cGV9IGZyb20gJy4vb3ZlcmxheS9nZW5lcmljLWNvbXBvbmVudC10eXBlJztcblxuLy8gS2V5YmluZGluZ3NcbmV4cG9ydCAqIGZyb20gJy4va2V5Ym9hcmQva2V5Y29kZXMnO1xuXG5leHBvcnQgKiBmcm9tICcuL2NvbXBhdGliaWxpdHkvY29tcGF0aWJpbGl0eSc7XG5cbi8vIEFuaW1hdGlvblxuZXhwb3J0ICogZnJvbSAnLi9hbmltYXRpb24vYW5pbWF0aW9uJztcblxuLy8gU2VsZWN0aW9uXG5leHBvcnQgKiBmcm9tICcuL3NlbGVjdGlvbi9pbmRleCc7XG5cbi8vIENvZXJjaW9uXG5leHBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnLi9jb2VyY2lvbi9ib29sZWFuLXByb3BlcnR5JztcbmV4cG9ydCB7Y29lcmNlTnVtYmVyUHJvcGVydHl9IGZyb20gJy4vY29lcmNpb24vbnVtYmVyLXByb3BlcnR5JztcblxuLy8gQ29tcGF0aWJpbGl0eVxuZXhwb3J0IHtDb21wYXRpYmlsaXR5TW9kdWxlLCBOb0NvbmZsaWN0U3R5bGVDb21wYXRpYmlsaXR5TW9kZX0gZnJvbSAnLi9jb21wYXRpYmlsaXR5L2NvbXBhdGliaWxpdHknO1xuXG4vLyBDb21tb24gbWF0ZXJpYWwgbW9kdWxlXG5leHBvcnQge01kQ29tbW9uTW9kdWxlLCBNQVRFUklBTF9TQU5JVFlfQ0hFQ0tTfSBmcm9tICcuL2NvbW1vbi1iZWhhdmlvcnMvY29tbW9uLW1vZHVsZSc7XG5cbi8vIERhdGV0aW1lXG5leHBvcnQgKiBmcm9tICcuL2RhdGV0aW1lL2luZGV4JztcblxuLy8gUGxhY2Vob2xkZXJcbmV4cG9ydCB7XG4gIEZsb2F0UGxhY2Vob2xkZXJUeXBlLFxuICBQbGFjZWhvbGRlck9wdGlvbnMsXG4gIE1EX1BMQUNFSE9MREVSX0dMT0JBTF9PUFRJT05TXG59IGZyb20gJy4vcGxhY2Vob2xkZXIvcGxhY2Vob2xkZXItb3B0aW9ucyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBNZExpbmVNb2R1bGUsXG4gICAgUnRsTW9kdWxlLFxuICAgIE1kUmlwcGxlTW9kdWxlLFxuICAgIE9ic2VydmVDb250ZW50TW9kdWxlLFxuICAgIFBvcnRhbE1vZHVsZSxcbiAgICBPdmVybGF5TW9kdWxlLFxuICAgIEExMXlNb2R1bGUsXG4gICAgTWRPcHRpb25Nb2R1bGUsXG4gICAgTWRTZWxlY3Rpb25Nb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNZExpbmVNb2R1bGUsXG4gICAgUnRsTW9kdWxlLFxuICAgIE1kUmlwcGxlTW9kdWxlLFxuICAgIE9ic2VydmVDb250ZW50TW9kdWxlLFxuICAgIFBvcnRhbE1vZHVsZSxcbiAgICBPdmVybGF5TW9kdWxlLFxuICAgIEExMXlNb2R1bGUsXG4gICAgTWRPcHRpb25Nb2R1bGUsXG4gICAgTWRTZWxlY3Rpb25Nb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1kQ29yZU1vZHVsZSB7fVxuIl19