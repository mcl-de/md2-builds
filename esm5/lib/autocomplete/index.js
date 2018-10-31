/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from './autocomplete-pipe';
import { Md2Autocomplete } from './autocomplete';
export { Item, MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR, Md2AutocompleteChange, Md2Autocomplete } from './autocomplete';
export { HighlightPipe } from './autocomplete-pipe';
var Md2AutocompleteModule = /** @class */ (function () {
    function Md2AutocompleteModule() {
    }
    Md2AutocompleteModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    exports: [Md2Autocomplete, HighlightPipe],
                    declarations: [Md2Autocomplete, HighlightPipe],
                },] }
    ];
    return Md2AutocompleteModule;
}());
export { Md2AutocompleteModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9hdXRvY29tcGxldGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELHNHQUFjLGdCQUFnQixDQUFDO0FBQy9CLDhCQUFjLHFCQUFxQixDQUFDOzs7OztnQkFFbkMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUM7b0JBQ3BDLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUM7b0JBQ3pDLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUM7aUJBQy9DOztnQ0FiRDs7U0FjYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSGlnaGxpZ2h0UGlwZSB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLXBpcGUnO1xuaW1wb3J0IHsgTWQyQXV0b2NvbXBsZXRlIH0gZnJvbSAnLi9hdXRvY29tcGxldGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2F1dG9jb21wbGV0ZSc7XG5leHBvcnQgKiBmcm9tICcuL2F1dG9jb21wbGV0ZS1waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGVdLFxuICBleHBvcnRzOiBbTWQyQXV0b2NvbXBsZXRlLCBIaWdobGlnaHRQaXBlXSxcbiAgZGVjbGFyYXRpb25zOiBbTWQyQXV0b2NvbXBsZXRlLCBIaWdobGlnaHRQaXBlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWQyQXV0b2NvbXBsZXRlTW9kdWxlIHsgfVxuIl19