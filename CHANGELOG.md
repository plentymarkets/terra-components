# 12.0.0-next.1 (13.07.2021)

### Breaking Changes

-   **dependencies**
    -   updated all angular packages to version 12

# 12.0.0-next.0 (13.07.2021)

### Breaking Changes

-   **terra-stopwatch** has been removed.
-   **tc-checkbox-group** has been removed.
-   **terra-slider** has been removed.

# 11.6.0 (12.07.2021)

### Minor changes

-   **terra-button** removed styles for `btn-group` which were no longer used.

# 11.5.1 (30.06.2021)

### Bug fixes

-   **terra-form** support legacy input names on the new form components.

# 11.5.0 (23.06.2021)

### Features

-   **terra-form**: Error messages have been added for the following form field validators:
    -   validator **required**,
    -   validator **pattern**,
    -   validator **minLength**,
    -   validator **maxLength**,
    -   validator **email**,

# 11.4.0 (16.06.2021)

### Features

-   **table** introduced `dataRequested$` property to `TerraTableDataSource` which notifies whenever data has been requested from the server.

# 11.3.0 (14.06.2021)

### Features

-   **filter** added new components and directives to create a filter for tables. See this [directory](./src/lib/components/filter) for more details.

### Minor changes

-   **tc-filter** has been deprecated.

# 11.2.0 (10.06.2021)

### Minor changes

-   The **terra-portlet** component has been deprecated. Use Angular Material's [expansion-panel](https://material.angular.io/components/expansion/overview) instead.
-   The **terra-group-function** component has been deprecated.
-   The **terra-stopwatch** component has been deprecated.
-   The **terra-radio-group** & **terra-radio-input** components have been deprecated. Use Angular Material's [radio-button](https://material.angular.io/components/radio/overview) instead.
-   The **terra-slider** component has been deprecated. Use Angular Material's [slider](https://material.angular.io/components/slider/overview) instead.
-   The **file-chooser** component has been deprecated. Use Angular Material's [button](https://material.angular.io/components/button) and [dialog](https://material.angular.io/components/dialog) in conjunction with our [file-browser](./src/lib/components/file-browser) instead.
-   **terra-form**: for some form types, deprecated variants have been replaced as follows:
    -   form type **suggestion**: replaced deprecated `terra-suggestion-box` by a `mat-autocomplete` variant.
    -   form type **double**: replaced deprecated `terra-double-input` by a `mat-input` variant.
    -   form type **slider**: replaced deprecated `terra-slider` by a `mat-slider` variant.
    -   form type **checkbox group**: replaced deprecated `tc-checkbox-group` by a `mat-select` variant in the multiple mode.
    -   form type **color**: replaced deprecated `terra-color-picker` by a `mat-input` variant.
    -   form type **date**: replaced deprecated `terra-date-picker` by a `mat-datepicker` variant.
    -   form type **text**: replaced deprecated `terra-text-input` by a `mat-input` variant.
    -   form type **checkbox**: replaced deprecated `terra-checkbox` by a `mat-checkbox` variant.
    -   form type **select**: replaced deprecated `terra-select-box` by a `mat-select` variant.
    -   form type **number**: replaced deprecated `terra-number-input` by a `mat-input` variant.
    -   form type **text-area**: replaced deprecated `terra-text-area-input` by a `mat-input` variant.

# 11.1.0 (23.03.2021)

### Features

-   **dependencies**
    -   update all angular packages to the latest version of v11.
-   **tc-table-settings** now has an animation when dragging and dropping.

# 11.0.0 (15.03.2021)

### Breaking Changes

-   **dependencies**
    -   update all angular packages to version 11
    -   update `angular-l10n` to version 11
    -   update `ngx-quill` to version 13

# 10.1.0 (15.03.2021)

### Features

-   **tc-table-settings** now has a second selector `<terra-table-settings>`.

# 10.0.0 (09.03.2021)

### General

-   We changed the versioning of terra components according to the used angular version.

### Breaking Changes

-   **dependencies**
    -   updated all angular packages to version 10
    -   updated `angular-l10n` to version 10
    -   updated `ngx-quill` to version 12

### Features

-   **table** added another type generic for filter parameters to `TerraTableDataSource`.

# 6.2.0 (04.03.2021)

### Features

-   **tc-table-settings** the position of the column label in the dialog is no longer changed after deselecting the checkbox.
-   **terra-code-editor** initializes the quill editor with small font size option

# 6.1.0 (02.03.2021)

### Features

-   **alert** `TerraAlertPanelComponent` now listens to both window events and the `AlertService`'s event emitters utilizing [rxjs](https://rxjs-dev.firebaseapp.com/) 's Observables.
-   **router**
    -   introduce new `RouteDataModule` and `RouteDataRegistry` that provide **experimental** functionality to centrally manage additional data for the app's routes.
    -   introduce new `extractRouteDataFromRouterConfig()` utility function which extracts the data of the routes in the router's config.
    -   introduce new `getChildren()` utility function which returns the children of a given route regardless they are eagerly or lazy loaded.
    -   introduce new `normalizeRoutePath()` utility function which normalizes a given route path by removing any leading and trailing slash.
    -   introduce new `findMatchingRoutePath()` utility function that finds a matching route path to a given url in a given list of route paths.
-   **breadcrumbs**
    -   are now able to retrieve a route's data from the `RouteDataRegistry` when it is not provided with the route itself.
    -   Replaced all `route.children` with `getChildren()` method for lazy loading

### Bug Fixes

-   **terra-node-tree** fixed the horizontal scrollbar.

# 6.0.0 (10.02.2021)

### Breaking Changes

-   **terra-data-table** using `mat-checkbox` instead of `terra-checkbox`.
-   **terra-node-tree** removed dependency to `TranslationService` from `TerraNodeTreeConfig`.
-   **terra-nested-data-picker** removed dependency to `TranslationService` from `NestedDataTreeConfig`.
-   **terra-category-picker** removed dependency to `TranslationService` from `CategoryTreeConfig`.

# 6.0.0-beta.2 (21.01.2021)

### Breaking Changes

-   **styles** removed styles for material tabs since they were not generally applicable. Falling back to the default material styles.

### Bug Fixes

-   **dependencies** adjusted required version of `@plentymarkets/terra-icons`.

# 6.0.0-beta.0-fixes (21.01.2021)

### Bug Fixes

-   **terra-data-table** change detection have not been triggered properly.

# 6.0.0-beta.1 (20.01.2021)

### Breaking Changes

-   **assets**
    -   removed language assets `locale-de.json` and `locale-en.json` in favour of a single typescript constant (`l10nTerraComponents`) exported in our main entry point (`@plentymarkets/terra-components`). Visit the [angular-l10n docs](https://robisim74.github.io/angular-l10n/#usage) to see how to configure the library to use this typescript constant.
    -   removed plentymarkets icon font. It has been moved to [terra-icons npm package](https://www.npmjs.com/package/@plentymarkets/terra-icons).
-   **styles** renamed `icons.scss` to `function-groups.scss`

### Bug Fixes

-   **terra-form-helper** fix parsing list ranges including whitespaces.
-   **file-browser** Assign empty object when `metadata` is null.

# 6.0.0-beta.0 (11.01.2021)

### Breaking Changes

-   **terra-tag** removed deprecated `inputBadge`. Use `name` instead.
-   **terra-filter** removed deprecated `terra-filter`. Use the new `tc-filter` instead.
-   **terra-slider** removed deprecated fields `inputValue` and `inputValueChange`.
-   **terra-checkbox** removed getter and setter for `value` and `valueChange` emitter. Use `ngModel` and `ngModelChange` instead.
-   **alert** removed `TerraAlertComponent`. Use `AlertService` instead.
-   **input** `TerraInputComponent`'s `validate()` method no longer shows error alerts when the input is invalid.

### Features

-   **dependencies** updated all `jasmine` and `karma` packages to the latest compatible versions.
-   **string-helper** changed deprecated util function to plain js in method `isNullUndefinedOrEmpty`.

# 6.0.0-alpha.5 (21.12.2020)

### Features

-   **terra-code-editor** toolbar now supports links.

### Bug Fixes

-   **terra-components** fix security vulnerability

# 6.0.0-alpha.4 (04.12.2020)

### Breaking Changes

-   **table** `TerraTableDataSource` now supports a `reload` method. The `reload` method loads the data with current filter and pager. The `search` method now loads the first page of the data.

### Features

-   **table-settings** replaced `terra-button` with `mat-icon-button`.
-   **table-settings-overlay** replaced `terra-button` with `mat-button`.

### Bug Fixes

-   **terra-form-helper** fixed loss of `form controls` when passing `list form-fields` to terra form.

# 6.0.0-alpha.3 (19.11.2020)

### Breaking Changes

-   **dependencies** updated `angular-l10n` to version 9. To migrate your app to this version, see [this migration guide](https://github.com/robisim74/angular-l10n/blob/master/MIGRATION_GUIDE.md).

# 6.0.0-alpha.2 (12.11.2020)

### Breaking Changes

-   **dependencies** reverted update of `angular-l10n`.

### Bug Fixes

-   **terra-select-box** handle `null` or `undefined` caption when determining whether a value is selected.

# 6.0.0-alpha.1 (10.11.2020)

### Breaking Changes

-   **dependencies**
    -   changed peer dependency `angular-l10n` to require version 9.

# 6.0.0-alpha.0 (30.10.2020)

### Breaking Changes

-   **interactables** removed `terraResizable` and `terraDropzone` directives and all related interfaces.
-   **terra-radio-button** has been removed. Use `tc-radio-group` and `tc-radio-input` instead.
-   **dynamic-component-loader** was removed. Use angular's [NgComponentOutlet](https://angular.io/api/common/NgComponentOutlet) instead.
-   **terra-syntax-editor** has been removed. Use [ck-editor](https://ckeditor.com/ckeditor-4/) instead.
-   **dependencies**
    -   removed peer dependency `ng2-ace-editor` since we no longer depend on it.
    -   changed peer dependency `mydatepicker` to require version 9
    -   changed peer dependency `ngx-quill` to require version 11
    -   changed peer dependency `ngx-bootstrap` to require version 6.1.0
-   **terra-form**
    -   removed deprecated `TerraFormTypeMap`. Provide a value for `inputControlTypeMap` because the default value was removed, too.
    -   `TerraFormContainerWrapperComponent` and `TerraFormEntryContainerDirective` have been removed from the exports of the `TerraComponentsModule` since they were intended for internal usage only.
-   **table** `TableSettingsComponent` has been removed from the exports of the `TerraComponentsModule` since it was intended for internal usage only
-   **exception-interface** was removed. Use angular's [HttpClient](https://angular.io/guide/http) instead.
-   **breadcrumbs-service** removed method initialPath since it has been deprecated.
-   **terra-tag** removed deprecated `onCloseTag` output.
-   **terra-taglist** removed deprecated `onCloseTag` output.
-   **terra-base-toolbar**'s input `inputIsBreadcrumbs` has been removed. There's no replacement.
-   **file-input** removed attribute `_overlay` and method `showFileBrowser()` and the overlayButtons `primaryOverlayButton` and `secondaryOverlayButton`.
-   **fixed-header** directive has been removed. Use angular material's [table](https://material.angular.io/components/table/overview) with a sticky header instead.
-   **terra-label-tooltip** directive has been removed. Use `TooltipDirective` with a set `onlyEllipsisTooltip` input instead.
-   **public-api** removed `TerraComponentsExamplesModule` from the public api.

# 5.12.0 (Unreleased)

### Features

-   **terra-select-box** since terra-select-box is deprecated, `AllowedColors` enum and `TerraSelectBoxInterface` are deprecated now as well.
-   **terra-overlay** since terra-overlay is deprecated, `TerraOverlayButtonInterface` is now deprecated as well.
-   **terra-data-table-context-menu** component and service are deprecated now. Use angular material's [menu](https://material.angular.io/components/menu) instead.

# 5.11.0 (05.11.2020)

### Features

-   **terra-file-input**
    -   properties `primaryOverlayButton` and `secondaryOverlayButton` are deprecated now.
    -   now uses a material dialog for the image preview

### Fix

-   **terra-file-browser** replaced delete confirmation dialog with material dialog
-   **mat-form-field** fixed Safari Bug for disabled inputs (non-readable text)

# 5.10.0 (20.10.2020)

### Features

-   **terra-button** is deprecated now. Use angular material's [button](https://material.angular.io/components/button/overview) instead.
-   **terra-button-with-options** is deprecated now. Use angular material's [button](https://material.angular.io/components/button/overview) and [menu](https://material.angular.io/components/menu/overview) instead.
-   **terra-time-picker** is deprecated now. Use angular material's [input](https://material.angular.io/components/input/overview) with type time instead.
-   **terra-color-picker** is deprecated now. Use angular material's [input](https://material.angular.io/components/input/overview) with type color instead.
-   **terra-card** is deprecated now. Use angular material's [card](https://material.angular.io/components/card/overview) instead.
-   **terra-note** is deprecated now. Use angular material's [card](https://material.angular.io/components/card/overview) instead.
-   **terra-info-box** is deprecated now. Use angular material's [card](https://material.angular.io/components/card/overview) instead.
-   **terra-slider** is deprecated now. Use angular material's [slider](https://material.angular.io/components/slider/overview) instead.
-   **terra-pager** is deprecated now. Use angular material's [paginator](https://material.angular.io/components/paginator/overview) instead.
-   **terra-base-table** is deprecated now. Use angular material's [table](https://material.angular.io/components/table/overview) instead.
-   **terra-data-table** is deprecated now. Use angular material's [table](https://material.angular.io/components/table/overview) instead.
-   **terra-simple-table** is deprecated now. Use angular material's [table](https://material.angular.io/components/table/overview) instead.
-   **terra-info-component** is deprecated now. Use angular material's [button](https://material.angular.io/components/button/overview) or an icon with a tooltip.
-   **terra-suggestion-box** is deprecated now. Use angular material's [autocomplete](https://material.angular.io/components/autocomplete/overview) instead.
-   **terra-indicator** is deprecated now. Use angular material's [badge](https://material.angular.io/components/badge/overview) or [chip](https://material.angular.io/components/chips/overview) instead.
-   **terra-base-toolbar** is deprecated now. Use angular material's [toolbar](https://material.angular.io/components/toolbar/overview) instead.
-   **terra-checkbox-tree** marked as deprecated. Use angular material's [tree](https://material.angular.io/components/tree/overview) instead.
-   **terra-checkbox-tree-leaf-state** marked as deprecated. Use angular material's [tree](https://material.angular.io/components/tree/overview) instead.
-   **terra-checkbox-leaf-interface** marked as deprecated. Use angular material's [tree](https://material.angular.io/components/tree/overview) instead.
-   **terra-leaf-interface** marked as deprecated. Use angular material's [tree](https://material.angular.io/components/tree/overview) instead.
-   **terra-base-tree** marked as deprecated. Use angular material's [tree](https://material.angular.io/components/tree/overview) instead.
-   **terra-node-tree** marked as deprecated. Use angular material's [tree](https://material.angular.io/components/tree/overview) instead.
-   **terra-node** marked as deprecated. Use angular material's [tree](https://material.angular.io/components/tree/overview) instead.
-   **terra-node-interface** marked as deprecated. Use angular material's [tree](https://material.angular.io/components/tree/overview) instead.
-   **terra-node-tree-helper** marked as deprecated. Use angular material's [tree](https://material.angular.io/components/tree/overview) instead.
-   **terra-node-tree-config** marked as deprecated. Use angular material's [tree](https://material.angular.io/components/tree/overview) instead.
-   **terra-base-editor** is deprecated now. Please use [ck-editor](https://ckeditor.com/ckeditor-4/) instead.
-   **terra-code-editor** is deprecated now. Please use [ck-editor](https://ckeditor.com/ckeditor-4/) instead.
-   **terra-note-editor** is deprecated now. Please use [ck-editor](https://ckeditor.com/ckeditor-4/) instead.
-   **terra-tag** is deprecated now. Use angular material's [chips](https://material.angular.io/components/chips/overview) instead.
-   **terra-tag-list** is deprecated now. Use angular material's [chip-list](https://material.angular.io/components/chips/overview) instead.
-   **terra-tag-select** is deprecated now. Use angular material's [chip-list](https://material.angular.io/components/chips/overview) instead.
-   **terra-base-data** is deprecated now. Use `{}` instead.
-   **terra-base-parameter** is deprecated now. Use `{}` instead.
-   **TerraButtonColorEnum** is deprecated now.
-   **table** removed experimental classes `TableDataSource`, `TablePagingDataSource`, `TableSortingDataSource` and `TablePagingSortingDataSource`. Use new `TerraTableDataSource` class instead.

### Bug Fixes

-   **styles** we now force focused elements to have no outline.
-   **terra-form-entry-list** Fixed form not being marked as dirty when number of entries changes

# 5.9.0 (30.09.2020)

### Features

-   **helpers** introduced new public utility class `Color` to simplify work with colors.
-   **terra-checkbox** is deprecated now. Use angular material's [checkbox](https://material.angular.io/components/checkbox/overview) instead.

### Bug Fixes

-   **mat-checkbox** Fixed styles for disabled checkbox when checked and indeterminate.

# 5.8.0 (16.09.2020)

### Features

-   **prettier** We now use prettier to format the code. Additionally, there is a pre-commit hook that formats every file that is pushed into the repository.
-   **mat-tree** Added styles for the [angular material tree](https://v8.material.angular.io/components/tree).

### Bug Fixes

-   **table-settings** Fixed caption for column config overlay.
-   **mat-table** Adjust left padding for first column.
-   **tcTooltip** Fixed `isDisabled` input when it's `true` in the beginning.

# 5.7.0 (17.08.2020)

### Features

-   **tree-node** does now provide an option to configure whether tooltips are only shown on text ellipsis. Default true.
-   **category-picker** displays tooltip on nodes without text ellipsis.

# 5.6.1 (06.08.2020)

### Bug Fixes

-   **schematics** declare checkbox migration as update schematic

# 5.6.0 (03.08.2020)

### Features

-   **mat-checkbox** add CSS styles for icons as a `<span>` or `<mat-icon>`.
-   **table-column-settings** new component that provides a settings overlay for mat table columns as well as a possibility to add a text that differs from the header element/text.
-   **tc-table-settings-dialog** new settings overlay component for sorting and hiding columns (`matColumnDef`) in `mat-table`.
-   **checkbox-group** & **multi-check-box** are deprecated now. Use [angular material's select](https://material.angular.io/components/select/overview#multiple-selection) instead.
-   **schematics** migration from `terra-checkbox` to `mat-checkbox`. Use parameter `--modulePath` to migrate entities only for the dedicated module (no support for `ViewChild` and `ViewChildren` Decorators and custom styling).

### Bug Fixes

-   **mat-table** remove cursor pointer from table row unless the row has the routerLink directive

# 5.5.0 (09.07.2020)

### Features

-   **schematics** basic support for `ng add`.
-   **sort-helper** new class that provides functionality to sort lists of numbers, strings and objects.
-   **select-sort**
    -   new pipe for sorting lists of available options for a select box
    -   new directive that automatically sorts all `terra-select-box`es.
-   **peerDependencies**
    -   updated `iban` to ~0.0.14

### Bug Fixes

-   **mat-table** adjust styles for odd and even rows.
-   **no-result-notice** adjust margin for no result notice in mat-table.
-   **terra-taglist** add flex-wrap
-   **tooltip** now subscribes to router events in ngOnInit, not ngOnChanges and makes sure to only call `hide()` when the tooltip is shown.

# 5.4.0 (22.06.2020)

### Features

-   **tooltip** removed warning and all deprecations for tooltip placement.
-   **mat-table** styles for the [angular material table](https://v8.material.angular.io/components/table/overview).
-   **mat-checkbox** styles for the [angular material checkbox](https://v8.material.angular.io/components/checkbox/overview).
-   **table** introduced several new classes to simplify the creation of an angular material table data source for plentymarkets REST-APIs.
    -   **TableDataSource** adding basic support for filtering.
    -   **TablePagingDataSource** supports filtering and paging.
    -   **TableSortingDataSource** supports filtering and sorting.
    -   **TablePagingSortingDataSource** supports filtering, paging and sorting.
-   **peerDependencies**
    -   removed `jquery` since we no longer depend on it.
    -   removed `path` since we no longer depend on it.
-   **terra-dynamic-component-loader** is deprecated now. Use angular's [NgComponentOutlet](https://angular.io/api/common/NgComponentOutlet) instead.
-   **terra-toggle** is deprecated now. Use angular material's [slide-toggle](https://material.angular.io/components/slide-toggle) instead.
-   **terra-category-picker** removed provider for `TerraNodeTreeConfig` since it was not used anymore.
-   **terra-overlay** is deprecated now. Use angular material's [dialog](https://material.angular.io/components/dialog) instead.
-   **terra-input** is deprecated now. Use angular material's [input](https://material.angular.io/components/input) instead.
-   **terra-mat-paginator-intl** allows for translation of mat paginators

### Bug Fixes

-   **mat-input** do not color an invalid input's underline red until it has been touched.

# 5.3.0 (24.04.2020)

### Features

-   **terra-alert-panel** use native [bootstrap](https://getbootstrap.com/) alert instead of the alert component provided by [ngx-bootstrap](https://valor-software.com/ngx-bootstrap).

### Bug Fixes

-   **terra-portlet** remove overflow

# 5.2.0 (20.04.2020)

### Features

-   **terra-loading-spinner** when using the service in a plentymarkets plugin ui, it now automatically notifies the parent application about the loading status.
-   **terraDraggable** deprecate directive.
-   **terraDropzone** deprecate directive.
-   **terraResizable** deprecate directive.

### Bug Fixes

-   **terra-portlet** removed overflow
-   **terra-node-tree** fixed error that was thrown when the user searches for a node and one of the node's name was undefined.
-   **terra-two-columns-container** updated outer paddings
-   **terra-three-columns-container** updated outer paddings
-   **terra-stopwatch**
    -   you are now able to import `TerraStopwatchComponent` from _@plentymarkets/terra-components_.
    -   prevent starting the timer more than once.
    -   does not use `TerraButtonComponent`'s deprecated `inputTooltipPlacement` anymore.

<a name="5.1.0"></a>

# 5.1.0 (11.03.2020)

### Features

-   **peerDependencies** removed `flatted` since we no longer depend on it.
-   **mat-dialog** styles for the [angular material dialog](https://v8.material.angular.io/components/dialog/overview).
-   **checkbox-group** Checkbox values are no longer appended every time checkboxes are selected. The sorting is preserved instead.

### Bug Fixes

-   **matInput** fixed placeholder styling.
-   **terra-portlet** using `border-bottom` on `portlet-head` when unfolded instead of `border-top` on `portlet-body`.
-   **security-vulnerability** dependency package `acorn

<a name="5.0.0"></a>

# 5.0.0 (20.02.2020)

### Breaking Changes

-   **build** Terra-Components is now fully AOT compatible.
    Terra-Components now complies with the angular package format and code autocompletion should work fine in your angular app.
-   **styles** Style files such as styles/styles.scss, styles/icons.scss and styles/theme-loader.scss are now .css files rather than .scss files.
-   **dependencies** Every dependency of Terra-Components now is a peer dependency. You need to install these dependencies in your project.
-   **terra-data-table** removed deprecated input `isSticky` sticky. No replacement will be provided for now.
-   **float-thead** removed the directive. No replacement will be provided for now.
-   **terra-date-picker** deprecated. Use [angular material datepicker](https://material.angular.io/components/datepicker/overview) instead.
-   **terra-multi-split-view** removed deprecated terra-multi-split-view. See [SplitView migration guide](https://developers.plentymarkets.com/dev-doc/split-view-migration-guide) for upgrade.
-   **TerraBaseStorageService** removed extension to TerraBaseService. Instead make use of the new HttpClient in all derived classes (e.g. TerraFrontendStorageService).
-   **http** removed deprecated TerraBaseService and @angular/http dependency. See [TerraBaseService migration guide](https://developers.plentymarkets.com/dev-doc/migration-tbs-to-http-client) for instructions to replace it.
-   **dependencies** Updated [angular](https://github.com/angular/angular) and [angular-l10n](https://github.com/robisim74/angular-l10n) to v8. Please visit https://update.angular.io to figure out how to update your app to angular v8.

### Features

-   **space-variables** Added new space variables that are not affected by compact-mode, like var(--space-md-fix)
-   **mat-date-picker** styles for the [angular material datepicker](https://material.angular.io/components/datepicker/overview).
-   **matInput** updated styles to match `mat-date-picker`, `mat-select` and `matInput` appearance.
-   **mat-slide-toggle** styles for the [angular material slide toggle](https://material.angular.io/components/slide-toggle/overview).
-   **terra-form** Added input `width` that sets the default width of any form element inside the form.
-   **terra-button-with-options** Added output property `optionsToggled` emitting current toggle state after options are toggled.
-   **tippy.js** Updated `tippy.js` to version 5.1.4.
-   **theme-core** Added rgb-variables for function group colors to enable alpha adjustment.

### Fix

-   **terra-base-editor** removed unnecessary quill style import
-   **terra-file-browser** Fixed deleting directories, sent only directories without children.
-   **material-tabs** fixed min-width of tabs
-   **material-forms** removed custom paddings to avoid problems in compact-theme
-   **terra-form**
    -   fixed validation issues caused by invisible form fields.
    -   fixed inconsistency when treating the value of invisible form fields.
-   **terra-file-browser** resolved circular dependency between _terra-file-browser.component.ts_ and _file-list.component.ts_.
-   **material-tabs** fixed hiding the mat-ink-bar in mat-tabs
-   **terra-file-browser** changed parameter of delete method in TerraFrontendStorageService
-   **utils** fixed encoding of http params. Implemented a custom encoder.

<a name="4.9.0"></a>

# 4.9.0 (29.01.2020)

### Features

-   **terra-syntax-editor** is now deprecated. Use [ckEditor](https://github.com/ckeditor/ckeditor4-angular) instead.
-   **icon** new icon 'content_item'.
-   **icon** new icon 'content_itemset'.

<a name="4.8.2"></a>

# 4.8.2 (08.01.2020)

### Bug Fixes

-   **http-interceptors** added missing dependencies to their providers. You can now actually use the `httpInterceptorProviders` constant to make use of the `Auth`-, `Error`- and `LoadingInterceptor` in your app.

<a name="4.8.1"></a>

# 4.8.1 (07.01.2020)

### Bug Fixes

-   **terra-portlets** removed negative margins from nested containers (portlets, toolbars, tables, infoboxes, pager)

<a name="4.8.0"></a>

# 4.8.0 (20.12.2019)

### Features

-   **terra-toggle** Added active/inactive color to disabled state.
-   **terra-portlet** Now supports styling of info-boxes and tables inside it.
-   **icon** new icon 'content_search'.
-   **bootstrap** adjusted spacing for the grid classes

### Bug Fixes

-   **terra-portlet**
    -   styling of hover-state and info-handler in portlet header
    -   styling of tables, toolbars and info-boxes inside portlets

<a name="4.7.0"></a>

# 4.7.0 (14.11.2019)

### Features

-   **file-browser** Allow alternative text for files with .webp extension
-   **terra-portlet** updated header style
-   **terra-data-table** input `isSticky` is now deprecated.
-   **float-thead** the directive is now deprecated.
-   **tabs** new styling of angular material tabs. [See the oficial documentation.](https://v7.material.angular.io/components/tabs/overview)

### Bug Fixes

-   **terra-button-with-options** `isHidden` option is now interpreted correctly.
-   **inputs** Tabindex of labels set to -1 to avoid tab focus in a form.
-   **file-browser** Restrict number of parallel uploads
-   **terra-date-picker** Fixed style of placeholder.

<a name="4.6.0"></a>

# 4.6.0 (30.10.2019)

### Features

-   **validators** New `uniqueValues` validator which checks if the values of a FormArray are unique.
-   **terra-pager** Using its own SCSS variables now.
-   **utils** provide new `createHttpParams()` method which replaces the deprecated `createUrlSearchParams()` of the `TerraBaseService`

### Bug Fixes

-   **radio-group** Adjusted height of `<legend>` and only is rendered when content is available.

<a name="4.5.0"></a>

# 4.5.0 (09.10.2019)

### Features

-   **icon** new icon 'content_category'
-   **terra-text-input** set as deprecated. Can be replaced by using the [angular material input](https://material.angular.io/components/input/overview).
-   **terra-info-box** new design to stop overlapping between button-hover-color and card-selected-color

### Bug Fixes

-   **terra-checkbox** fixed indeterminate style and hover style when disabled.
-   **terra-breadcrumbs** extended caret hover to breadcrumbs-wrapper for easier navigation

<a name="4.4.0"></a>

# 4.4.0 (25.09.2019)

### Feature

-   **terra-form** Added the possibility to include a suggestion box with the terra form

<a name="4.3.2"></a>

# 4.3.2 (18.09.2019)

### Bug Fixes

-   **tcTooltip** hide tooltip when routing

<a name="4.3.1"></a>

# 4.3.1 (09.09.2019)

#Feature

-   **tcTooltip** Support templates as tooltip. Added examples.
-   **base-toolbar** added sticky behaviour

### Bug Fixes

-   **multi-split-view** using styles of terra-breadcrumbs now
-   **toggle-button** fix tooltip
-   **data-table** removed broken mobile breakpoints

<a name="4.3.0"></a>

# 4.3.0 (05.09.2019)

### Feature

-   **nav-bar** add css variables

<a name="4.2.1"></a>

# 4.2.1 (04.09.2019)

### Features

-   **icon** new icon 'shaking_hands'

<a name="4.2.0"></a>

# 4.2.0 (04.09.2019)

### Features

-   **terra-form** can now handle structural components to wrap nested form fields.
-   **tooltip** new tooltip directive featuring [tippy.js](https://atomiks.github.io/tippyjs/)

### Bug Fixes

-   **terra-file-browser** added error message if the upload file is too large.

<a name="4.1.2"></a>

# 4.1.2 (16.08.2019)

### Bug Fixes

-   **mat-select** increased z-index of the cdk-overlay.

<a name="4.1.1"></a>

# 4.1.1 (15.08.2019)

### Bug Fixes

-   **multi-split-view** fixed breadcrumb styles.

<a name="4.1.0"></a>

# 4.1.0 (14.08.2019)

### Features

-   **terra-select-box** set as deprecated. Can be replaced by using the [angular material select](https://material.angular.io/components/select/overview).
-   **floatThead** new directive to add a floating table header.
-   **fixedHeader** set to deprecated since the new `floatThead` directive is working.
-   **terra-breadcrumbs** has its own styles now.
-   **terra-base-toolbar** `inputIsBreadcrumbs` set to deprecated since breadcrumbs has own styles now.
-   **terra-form** list entries can now be sorted by the user.

### Bug Fixes

-   **transitions** removed all transitions and transition delays to improve performance

<a name="4.0.0"></a>

# 4.0.0 (13.08.2019)

### Breaking Changes

-   **build** removed app folder. Content has been moved to its root. Imports from `@plentymarkets/terra-components/app/**` need to be changed to `@plentymarkets/terra-components/**`.
-   **TerraComponentsModule** removed `forRoot()` and `forChild()` methods since all services use tree-shakable providers now. Import `TerraComponentsModule` in any Module where a provided component, pipe or directive is needed.
-   **bootstrap** updated from 4.0.0-alpha.4 to 4.3.1
-   Updated [angular](https://github.com/angular/angular) to v7, [rxjs](https://github.com/ReactiveX/rxjs) to v6 and [angular-l10n](https://github.com/robisim74/angular-l10n) to v7 and made them peer dependencies. Please visit https://update.angular.io to figure out how to update your app to angular v7.
-   Updated several other dependencies including - [ngx-bootstrap](https://github.com/valor-software/ngx-bootstrap) - [ngx-quill](https://github.com/KillerCodeMonkey/ngx-quill) - [TypeScript](https://github.com/microsoft/TypeScript) - ...
-   **TerraConverterHelper** instead of a `defaultLocale` you now need to pass an instance of the [angular-l10n](https://github.com/robisim74/angular-l10n)'s `LocaleService` as argument to `convertAndFormatSize()` and `getLocaleDecimalValue()`

### Features

-   **select-box** added option to set a color for select-box items.
-   **checkbox** added two-way data binding for `isIndeterminate` state.
-   **data-table** changed `ChangeDetectionStrategy` from `default` to `onPush`
-   **tcCkEditor** New directive to provide a full config for the ckeditor4.
-   **ck-editor-presets** Config presets for the ckeditor4.
-   **terra-cards** restyling
-   **fonts** plentyicon-font moved to aws S3
-   **tslint** add new linting rules
-   **terra-category-picker** allow to accept `null` values
-   **terra-checkbox** allow to accept `null` values

### Bug Fixes

-   **terra-alert** fixed visibility when `terra-overlay` is active.
-   **Path helper** File extensions are converted to lowercase for easier comparison.
-   **multi-checkbox** fixed displaying of indeterminate state.
-   **select-box** added default blank space for input name to prevent wrong positioning of selected entry
-   **global styles** refactored global style handling. They are now included in the `styles.scss`.
-   **theme-core** removed border-radius to improve performance.
-   **terra-button** added styles to swap icons on a labeled button (icon on the right side).
-   **terra-portlet** adjusted paddings.
-   **Tooltip** fixed tooltip position when `container="'body'"`.
-   **terra-portlet** fixed orientation of the collapsed icon.
-   **http-interceptors** fix logging errors to console.
-   **draggable** allow `terraDraggable` input to be aliased.

<a name="4.0.0-beta.11"></a>

# 4.0.0-beta.11 (31.07.2019)

### Feature

-   **select-box** added option to set a color for select-box items.
-   **checkbox** added two-way data binding for `isIndeterminate` state.

### Bug Fixes

-   **Path helper** File extensions are converted to lowercase for easier comparison.
-   **multi-checkbox** fixed displaying of indeterminate state.

<a name="4.0.0-beta.9"></a>

# 4.0.0-beta.9 (24.07.2019)

### Feature

-   **data-table** changed `ChangeDetectionStrategy` from `default` to `onPush`

### Bug Fixes

-   **select-box** added default blank space for input name to prevent wrong positioning of selected entry
-   **global styles** refactored global style handling. They are now included in the `styles.scss`.

<a name="4.0.0-beta.8"></a>

# 4.0.0-beta.8 (17.07.2019)

### Bug Fixes

-   **theme-core** removed border-radius to improve performance.
-   **checkbox** added missing paddings to checkboxes and radioboxes.
-   **input** fixed color and paddings in disabled inputs.
-   **button** fixed missing spaces for multiple buttons next to each other.

<a name="4.0.0-beta.7"></a>

# 4.0.0-beta.7 (05.07.2019)

### Bug Fixes

-   **terra-button** added styles to swap icons on a labeled button (icon on the right side).
-   **terra-portlet** adjusted paddings.

### Breaking Changes

-   **build** removed app folder. Content has been moved to its root. Imports from `@plentymarkets/terra-components/app/**` need to be changed to `@plentymarkets/terra-components/**`.

<a name="4.0.0-beta.6"></a>

# 4.0.0-beta.6 (03.07.2019)

### Bug fixes

-   **dependencies** downgrade `hmtlhint` to v0.10.3 since it resolves an issue regarding its import in the `HtmlLinterHelper`.

<a name="4.0.0-beta.5"></a>

# 4.0.0-beta.5 (28.06.2019)

### Breaking Changes

-   **TerraComponentsModule** removed `forRoot()` and `forChild()` methods since all services use tree-shakable providers now.

### Bug Fixes

-   **Tooltip** fixed tooltip position when `container="'body'"`.
-   **terra-portlet** fixed orientation of the collapsed icon.

<a name="4.0.0-beta.4"></a>

# 4.0.0-beta.4 (24.06.2019)

### Breaking Changes

-   **bootstrap** updated from 4.0.0-alpha.4 to 4.3.1

### Features

-   **tcCkEditor** New directive to provide a full config for the ckeditor4.
-   **ck-editor-presets** Config presets for the ckeditor4.
-   **refactoring** restructured style files
-   **terra-cards** restyling
-   **fonts** plentyicon-font moved to aws S3

<a name="4.0.0-beta.3"></a>

# 4.0.0-beta.3 (12.06.2019)

### Bug Fixes

-   **button-group** fixed spacing between buttons in a button group
-   **angular-l10n** added missing `OnInit` and `OnDestroy` LifeCycle-Hooks to Components using angular-l10n's `Language` decorator

<a name="4.0.0-beta.2"></a>

# 4.0.0-beta.2 (11.06.2019)

-   **bootstrap** revert bootstrap update

<a name="4.0.0-beta.1"></a>

# 4.0.0-beta.1 (07.06.2019)

### Breaking Changes

-   Updated [angular](https://github.com/angular/angular) to v7, [rxjs](https://github.com/ReactiveX/rxjs) to v6 and [angular-l10n](https://github.com/robisim74/angular-l10n) to v7 and made them peer dependencies.
-   Updated several other dependencies including - [ngx-bootstrap](https://github.com/valor-software/ngx-bootstrap) - [ngx-quill](https://github.com/KillerCodeMonkey/ngx-quill) - [TypeScript](https://github.com/microsoft/TypeScript) - ...
-   **TerraConverterHelper** instead of a `defaultLocale` you now need to pass an instance of the [angular-l10n](https://github.com/robisim74/angular-l10n)'s `LocaleService` as argument to `convertAndFormatSize()` and `getLocaleDecimalValue()`

<a name="4.0.0-beta.0"></a>

# 4.0.0-beta.0 (06.06.2019)

### Breaking Changes

-   **bootstrap** updated from 4.0.0-alpha.4 to 4.3.1

### Features

-   **tslint** add new linting rules
-   **terra-category-picker** allow to accept 'Null' values
-   **terra-checkbox** allow to accept 'Null' values

### Bug Fixes

-   **http-interceptors** fix logging errors to console.
-   **draggable** allow `terraDraggable` input to be aliased.

<a name="3.14.0"></a>

# 3.14.0 (29.05.2019)

### Features

-   **model-cache** new class providing functionality to handle caching of a model available on a server. It replaces the functionality from the TerraBaseService. For now, it is in an experimental state wherefore it can change at any time or may also be deleted.
-   **http-interceptors** implementing [HttpInterceptor](https://angular.io/api/common/http/HttpInterceptor) - **auth-interceptor** new class to add the accessToken stored in the `localStorage` to every requests header. - **error-interceptor** new class to handle error handling on every http request. - **loading-interceptor** new class to trigger the `TerraLoadingSpinnerService`'s `start()` and `stop()` method.
-   **terra-base.service** is deprecated now. Use angular's [HttpClient](https://angular.io/guide/http) instead.

<a name="3.13.1"></a>

# 3.13.1 (22.05.2019)

### Bug Fixes

-   **terra-form** fix change detection in lists beyond default list length
-   **terra-form** fix handling of default values

<a name="3.13.0"></a>

# 3.13.0 (16.05.2019)

### Bug Fixes

-   **terra-breadcrumbs** fix handling leading slashes on breadcrumb urls.

### Features

-   **terra-base-editor**, **terra-note-editor**, **terra-code-editor** - added `required` input that activates validation if set. - added styles for the representation of an invalid state. - updated [ngx-quill](https://github.com/KillerCodeMonkey/ngx-quill) dependency to the latest version - activated sanitization using the `quill-editor`'s `sanitize` input.

<a name="3.12.0"></a>

# 3.12.0 (09.05.2019)

### Features

-   **tc-radio-group** allow the radio group to accept more elements than only the `tc-radio-input`.
-   **terra-button** - added new `--terra-button-btn-handler-display` css variables to modify display value - added new `--terra-button-btn-handler-margin` css variables to modify margin of the button
-   **terra-card** added new `--terra-card-footer-min-height` css variable to be able to redefine the footer's min-height

<a name="3.11.2"></a>

# 3.11.2 (02.05.2019)

### Bug Fixes

-   Reduce interactjs version to prevent issues with the current imports

<a name="3.11.0"></a>

# 3.11.0 (02.05.2019)

### Features

-   **ts-lint** added new linting rules 'max-function-line-count' and 'max-file-line-count'
-   **ts-lint** decreased 'max-depth' limit to 5
-   **terra-multi-check-box** added invalid state indication
-   **terra-card** added more scss variables

### Bug Fixes

-   **tc-radio-group** change callback is not executed anymore when a value is set via `writeValue()`
-   **terra-form** fix instance clash with objects and arrays as default value

<a name="3.10.0"></a>

# 3.10.0 (17.04.2019)

### Bug Fixes

-   **terra-form** no longer validates hidden form fields

### Features

-   **terra-card** added possibility to overwrite the background color of the footer
-   **terra-form.helper** instead of the usual required validator, the requiredTrue validator is now added for controls of type checkbox and toggle.

<a name="3.9.0"></a>

# 3.9.0 (10.04.2019)

### Bug Fixes

-   **terra-node-tree** fixed issues occuring when adding a new node whilst an existing node had been selected
-   **terra-info** fix export of component

### Features

-   **tc-radio-group** now uses a generated name if it is not set via input.
-   **terra-checkbox-tree** - CSS changes - added functionality for disabled leaf
-   **terra-checkbox** temporarily added `notifyOnChanges` to be notified on leaf change

<a name="3.8.0"></a>

# 3.8.0 (09.04.2019)

### Features

-   **terra-form** set empty array as default value for list controls.

<a name="3.7.0"></a>

# 3.7.0 (27.03.2019)

### Changes

-   **terra-checkbox** - set/get `value` is now deprecated. Use ngModel instead. - `valueChange` is now deprecated. Use ngModelChange-Callback instead.

### Features

-   **terra-form** - reworked internal implementation using reactive forms which resulted in full reactive forms support. - added `formGroup` getter for a reactive FormGroup instance which represents the form created out of the `inputFormFields` specification.
-   **terra-breadcrumbs.service** - new set accessor to pass the activated route to the service. This is used to evaluate the `initialPath` and the `initialRoute`. - set accessor for initialPath is now deprecated. Use set accessor for activatedRoute instead.
-   **activated-route.helper** new helper for ActivatedRoute related functionality.
-   **terra-category-picker** added webstore id input to pass the current store and display the cetegories accordingly

### Bug Fixes

-   **terra-checkbox** change callback is not executed anymore when a value is set via `writeValue()` or `value` set accessor
-   **terra-multi-check-box** - does not call change callbacks on `writeValue()` anymore. - resolve performance issue with large valueLists
-   **terra-select-box** now selects the first entry of `inputListBoxValues` if an unknown value is passed via ngModel
-   **terra-breadcrumbs** fix issue where the initial path was not evaluated properly

<a name="3.7.0-beta.3"></a>

# 3.7.0-beta.3 (26.03.2019)

### Features

-   **terra-code-editor** added input `tooltipText` and `tooltipPlacement` to display tooltips, default placement is `top`

### Bug Fixes

-   **tooltips** tooltip color in light theme is now dark for better contrast
-   **terra-select-box** fixed padding on compact mode

<a name="3.7.0-beta.2"></a>

# 3.7.0-beta.2 (14.03.2019)

### Bug Fixes

-   **terra-breadcrumbs.service** fixed issue with leading slashes on the `initialPath`

<a name="3.7.0-beta.1"></a>

# 3.7.0-beta.1 (14.03.2019)

### Features

-   **terra-breadcrumbs.service** - new set accessor to pass the activated route to the service. This is used to evaluate the `initialPath` and the `initialRoute`. - set accessor for initialPath is now deprecated. Use set accessor for activatedRoute instead.
-   **activated-route.helper** new helper for ActivatedRoute related functionality.

### Bug Fixes

-   **terra-breadcrumbs** fix issue where the initial path was not evaluated properly

<a name="3.7.0-beta.0"></a>

# 3.7.0-beta.0 (13.03.2019)

### Features

-   **terra-form** preliminary support for validation using reactive forms. Implementation may change in a following release.

<a name="3.6.0"></a>

# 3.6.0 (13.03.2019)

### Bug Fixes

-   **alerts** added `AlertService` to index.ts to be able to import it from _@plentymarkets/terra-components_
-   **terra-date-picker** fixed issue with early dates
-   **terra-card** vertical alignment of multiple cards if one card uses an icon and another uses an image.

### Features

-   **terra-base.service** extended typedef of `dataId` parameter in caching methods. Strings may now be used as index as well.
-   **tc-checkbox-group** & **terra-multi-check-box** are now collapsible. Added new input `collapsed` which - if set to true - collapses the component to its header initially.
-   **terra-data-table** `<terra-input>`, `<terra-select-box>` and `<terra-multi-check-box>` that will be inserted into a table cell have now adjusted styles to fit into the layout.

<a name="3.5.1"></a>

# 3.5.1 (20.02.2019)

### Features

-   **terra-code-editor** added input `switchFromCode`, if false the switch from code to note editor view gets disabled, default true.

### Bug Fixes

-   **terra-categroy-picker** added possibility to pass a language in which the categories shall be displayed
-   **terra-form** now emits changes on array or object values correctly

<a name="3.5.0"></a>

# 3.5.0 (18.02.2019)

### Features

-   **icon font** added new icons: icon-content_check_out, icon-content_my_account, icon-new_order, icon-reply_all, icon-reply

### Bug Fixes

-   **terra-toggle-button** removed function groups for toggle buttons

<a name="3.4.0"></a>

# 3.4.0 (12.02.2019)

### Features

-   **terra-checkbox** added support for tooltips

### Bug Fixes

-   **terra-category-picker** REST calls will no longer be triggered twice.
-   **terra-breadcrumbs** hide breadcrumb container if it contains only breadcrumbs without labels.
-   **tc-checkbox-group** `null` can now be written to the input and `null` will also be returned if there is nothing selected
-   **terra-info** Tooltip will be shown correctly in a scrollable view.

<a name="3.3.0"></a>

# 3.3.0 (04.02.2019)

### Features

-   **webpack update** updated to latest version of webpack due to security vulnerabilities
-   **tc-checkbox-group** new component which wraps `<terra-multi-check-box>` to separate available checkbox definition from ngModel
-   **terra-form** added support for `<terra-checkbox-group>`
-   **terra-form** added support for `<terra-slider>`

### Bug Fixes

-   **terra-form-entry** fixed initialization with defaultValue
-   **terra-form-entry** check if component property is decorated before assigning value dynamically

<a name="3.2.0"></a>

# 3.2.0 (23.01.2019)

### Features

-   **terra-alert** new alerts are now added to the top of the list
-   **tc-filter** new component which replaces `<terra-filter`.
-   **terra-filter** is now deprecated. Use `<tc-filter>` instead.
-   **TerraSplitViewComponentInterface** is now deprecated. See the [SplitView Migration Guide](https://developers.plentymarkets.com/dev-doc/split-view-migration-guide) for a replacement.
-   **terra-portlet** added input `infoText` which is shown as `<terra-info>` element in the portlet's header
-   **AlertService** new service providing functionality to manage alerts. Those can also be used in a plugin.
-   **terra-alert** is now deprecated. Use new `AlertService` instead.
-   **ibanValidator** new validator for reactive forms checking whether a text is a valid IBAN.
-   **TerraValidators** new class that provides a set of additional validators for reactive forms.
-   **terra-data-table** add `useContentBody` input property. If set the auto rendering of rows/cells is disabled and content projection is enabled.
-   **table-row** added for the new `terra-data-table` content projection feature
-   **terra-select-box** `inputSelectedValue` and `inputSelectedValueChange` are now deprecated. Please use `ngModel`-binding and the `ngModelChange`-callback instead.

### Bug Fixes

-   **terra-pager** inject current language to be able to translate the texts in the template properly.
-   **terra-form** correctly distinguish required inputs by adding an asterisk to the end of their names

<a name="3.1.0"></a>

# 3.1.0 (07.01.2019)

### Features

-   **terra-portlet** Collapsable portlets can now be disabled by setting the `inputIsDisabled`-property.

<a name="3.0.0"></a>

# 3.0.0 (18.12.2018)

### Breaking changes

-   **terra-tag** `inputBadge` is now deprecated. Please use `name` instead.

-   **terra-data-table** - Table is now sortable. Use the `sortBy` interface property to state whether a column is sortable - Refactoring -> Removed deprecated interfaces and input properties - New `TerraDataTableBaseService` which replaces custom directives and configs. It also stores all information needed for retrieving data from the server - New `terra-group-function` component which has been extracted from the `terra-data-table` component - Removed inputs for `terra-no-result-notice` and `terra-group-function` since they can now be passed to the content of the `terra-data-table` component. - Added input `inputContextMenu` to be able to pass the context menu only once to the component
-   **terra-data-table-row.interface** removed `contextMenuLinkList` property since it can now be passed to the data table component using `inputContextMenu`.
-   **terra-data-table-context-menu.service** removed `init` subject and changed type of `show` subject
-   **terra-data-table-context-menu.directive** - changed selector to `[hasContextMenu]` - removed input `inputLinks` which was aliased with the selector before - new input `rowData` which is used to pass the data of a row to the context menu component
-   **terra-data-table-context-menu.component** - added input `links`. The list of links in the context menu can be passed here. - changed parameters of the `showMenu` method. It now accepts the mouse event and the data which will be passed to the `clickFunction` of the context menu link.
-   **terra-data-table-context-menu.interface** remove `data` property. Use the directive's input `rowData` instead.
-   **terra-pager.data** removed unused class

-   **terra-file-browser** - breadcrumbs replaced with tree for folder navigation. - saving alternative text working as intended with success message. - image preview now closing after delete. - file list is refreshed when inputStorageService changes

-   **terra-regex** public access to properties
-   **terra-node.interface** - removed double click function. - add closeOnClick to close node on click again.
-   **terra-pager.interface** added type generic to make it reusable for different types of entries. To migrate your interface which previously extended the `TerraPagerInterface`, please replace its occurrences with the new interface. Make sure to pass the type of a single entry of your interface as generic to the new interface.

The following components/classes have been marked deprecated:

-   **terra-multi-split-view**
-   **terra-multi-split-view.interface**
-   **terra-multi-split-view.config**
-   **terra-multi-split-view.helper**
-   **terra-multi-split-view-breadcrumbs.service**
-   **terra-multi-split-view-module.interface**
-   **terra-multi-split-view-route.interface**
-   **terra-multi-split-view-route-data.interface**
-   **terra-multi-split-view-routes.interface**

-   **resolve-list-item.interface**
-   **resolved-data.interface**
-   **terra-resolved-data.helper**

The following deprecated variables have been deleted:

-   **terra-button-with-options** `inputIsPrimary`, `inputIsSecondary`, `inputIsTertiary`
-   **terra-button.interface** `isPrimary`, `isSecondary`, `isTertiary`,
-   **terra-button** `inputIsPrimary`, `inputIsSecondary`, `inputIsTertiary`
-   **terra-file-chooser** `inputIsPrimary`, `inputIsSecondary`, `inputIsTertiary`
-   **terra-dynamic-module-loader** `inputParameter` (use `inputInputs` instead)
-   **terra-filter** `inputInputList` (use `ng-content` instead)
-   **terra-checkbox** `inputId`
-   **terra-double-input** `inputValue` (use `ngModel` instead)
-   **terra-number-input** `inputValue` (use `ngModel` instead)
-   **terra-input** `inputPlaceholder` (use `inputName` instead)
-   **terra-text-area-input** `inputType`, `inputValue` (use `ngModel` instead), `inputMaxCols`
-   **terra-text-input** `inputType`, `inputValue` (use `ngModel` instead)
-   **terra-select-box** `outputValueChanged` (use `ngModelChange` instead), `inputSelectedValue` (use `ngModel` instead)
-   **terra-suggestion-box** `outputValueChanged` (use `ngModelChange` instead), `resetComponentValue()` (use `ngModel` instead)
-   **terra-tag.interface** `caption` (use `name` or `names` instead), `badge` (use `name` or `names` instead)
-   **terra-multi-split-view** `inputComponentRoute`
-   **terra-data-table-cell.interface** `caption` (use `data` or `data.caption` instead), `icon` (use `data.icon` instead), `color` (use `data.color` instead), `buttonList` (use `data` instead), `href` (use `data` instead) -> `data` can be a type of `string`, `number`, `TerraDataTableTextInterface`, `TerraRefTypeInterface`, `Array<TerraButtonInterface>`or `Array<TerraTagInterface>`
-   **terra-data-table-header-cell.interface** `textAlign:string` (use `textAlign:TerraTextAlignEnum` instead)
-   **terra-data-table** `hasCheckboxes` (use `inputHasCheckboxes` instead)
-   **terra-simple-table** setter and getter of `headerList` (use `inputHeaderList`), getter and setter of `rowList` (use `inputRowList` instead)

The following deprecated components have been deleted:

-   **terra-multi-select-box** use `terra-multi-check-box` instead
-   **terra-button-group**
-   **terra-navigator**
-   **terra-split-view** use `terra-multi-split-view` instead
-   **terra-tile-box** use `terra-card` instead
-   **terra-tree** use `terra-node-tree` instead
-   **terra-url-params-decorator** use `terra-base-service::createUrlSearchParams` instead

### Features

-   **terra-button-with-options**
    -   New input `inputIsSmall`
    -   Added the ability to add a divider button to the `inputOptions`
    -   Fixed corresponding CSS
-   **terra-dynamic-form** new optional toggle button to display/hide deprecated plugin config entries
-   **category-detail-data** added preview url
-   **terra-3-col** new component that displays given views next to each other in up to three columns
-   **terra-stopwatch** added new terra component terra-stopwatch.
-   **terra-nested-picker** added showFullSelectionPath property to show if you want the entire path for a selected node
-   **TerraBreadcrumbsService** support to handle queryParams in url
-   **terra-slider** implement `ControlValueAccessor` interface to be able to use ngModel instead of `inputValue`.
-   **themes** added christmas theme
-   **themes** added full color button theme
-   **terra-data-table** fixed position and styles of context menu in FireFox
-   **terra-select-box** added key events for better handling
-   **terra-slider** - add focus highlighting for tab navigation - add left and right arrow key navigation
-   **tc-radio-input** new component that wraps html's native input of type radio including it's label. It must be used within a `<tc-radio-group>` element.
-   **tc-radio-group** new component to contain and manage `<tc-radio-input>` elements. It implements the `ControlValueAccessor` interface (`ngModel`) to be able to use it in a form.
-   **terra-radio-button** is now deprecated. Use `<tc-radio-input>` and `<tc-radio-group>` instead.
-   **terra-check-box** removed outline css

### Changes

-   **file-list** change text of the delete confirmation

### Bug Fixes

-   **terra-node-tree** - avoid closing node on click while it's open. - Fixed a bug concerning the deletion of a node on the first level
-   **terra-2-col & terra-3-col** - adjusted styles to handle column heights correctly. - fixed style bug in firefox
-   **terra-3-col** adjusted styles to handle column heights correctly.
-   **terra-date-picker** fix format of the date string emitted by `ngModelChange`
-   **terra-file-browser** fixed issue when uploading a file
-   **loading-spinner** fixed issue with light theme
-   **terra-select-box** is now focusable while navigating with tab key
-   **terra-check-box** is now focusable while navigating with tab key
-   **terra-multi-check-box** - now correctly emits ngModel callbacks after a checkbox has changed - add new `checkboxStateChanges` output that emits the changed checkboxes

### Guides

[Table Migration Guide](https://developers.plentymarkets.com/dev-doc/data-table-migration-guide).

[SplitView Migration Guide](https://developers.plentymarkets.com/dev-doc/split-view-migration-guide).

<a name="3.0.0-beta.18"></a>

# 3.0.0-beta.18 (06.12.2018)

### Features

-   **terra-slider** implement `ControlValueAccessor` interface to be able to use ngModel instead of `inputValue`.
-   **themes** added christmas theme
-   **themes** added full color button theme

### Bug Fixes

-   **loading-spinner** fixed issue with light theme
-   **terra-select-box** is now focusable while navigating with tab key
-   **terra-check-box** is now focusable while navigating with tab key

<a name="3.0.0-beta.17"></a>

# 3.0.0-beta.17 (03.12.2018)

### Feature

-   **TerraBreadcrumbsService** support to handle queryParams in url

### Bug Fixes

-   **terra-node-tree** Fixed a bug concerning the deletion of a node on the first level
-   **terra-3-col** fixed style bug in firefox
-   **terra-2-col** fixed style bug in firefox

<a name="3.0.0-beta.16"></a>

# 3.0.0-beta.16 (29.11.2018)

### Breaking changes

-   **terra-tag** `inputBadge` is now deprecated. Please use `name` instead.
-   **terra-data-table** removed `inputIsSortable` due to redundancy.

### Bug Fixes

-   **terra-data-table** - fixed coloring of links in the table if the row is selected or active - reset rowList before requesting data from the server. Show pager and header while data is loaded.

### Feature

-   **terra-button-with-options**
    -   New input `inputIsSmall`
    -   Added the ability to add a divider button to the 'inputOptions'
    -   Fixed corresponding CSS
-   **terra-data-table.service** added `resetSortParams()` to be able to reset sorting params.

<a name="3.0.0-beta.15"></a>

# 3.0.0-beta.15 (21.11.2018)

Adapted Changes from v2.4.3

### Breaking Changes

-   **terra-stopwatch** rework. removed dependency to [timer-stopwatch](https://www.npmjs.com/package/timer-stopwatch) package.

<a name="3.0.0-beta.14"></a>

# 3.0.0-beta.14 (15.11.2018)

### Breaking Changes

-   **terra-data-table** - Table is now sortable. Use the sortBy interface property to state whether a column is sortable - Refactoring -> Removed deprecated interface and input properties - New `TerraDataTableBaseService` which replaces custom directives and configs. It also stores all information needed for retrieving data from the server - New `terra-group-function` component which has been extracted from the `terra-data-table` component - Removed inputs for `terra-no-result-notice` and `terra-group-function` since they can now be passed to the content of the `terra-data-table` component. - Added input `inputContextMenu` to be able to pass the context menu only once to the component
-   **terra-data-table-row.interface** removed `contextMenuLinkList` property since it can now be passed to the data table component using `inputContextMenu`.
-   **terra-data-table-context-menu.service** removed `init` subject and changed type of `show` subject
-   **terra-data-table-context-menu.directive** - changed selector to `[hasContextMenu]` - removed input `inputLinks` which was aliased with the selector before - new input `rowData` which is used to pass the data of a row to the context menu component
-   **terra-data-table-context-menu.component** - added input `links`. The list of links in the context menu can be passed here. - changed parameters of the `showMenu` method. It now accepts the mouse event and the data which will be passed to the `clickFunction` of the context menu link.
-   **terra-data-table-context-menu.interface** remove `data` property. Use the directive's input `rowData` instead.
-   **terra-pager.data** removed unused class

For further information see the [table migration guide](https://developers.plentymarkets.com/dev-doc/data-table-migration-guide).

### Feature

-   **terra-dynamic-form** new optional toggle button to display/hide deprecated plugin config entries

### Bug Fixes

-   **terra-regex** public access to properties

<a name="3.0.0-beta.13"></a>

# 3.0.0-beta.13 (12.11.2018)

Adapted Changes from v2.4.2

### Bug Fixes

-   **terra-node.interface** - removed double click function. - add closeOnClick to close node on click again.

<a name="3.0.0-beta.12"></a>

# 3.0.0-beta.12 (07.11.2018)

-   **category-detail-data** - added preview url

<a name="3.0.0-beta.11"></a>

# 3.0.0-beta.11 (25.10.2018)

-   **terra-file-browser** - breadcrumbs replaced with tree for folder navigation. - saving alternative text working as intended with success message. - image preview now closing after delete. - file list is refreshed when inputStorageService changes

-   **terra-node-tree** avoid closing node on click while it's open.
-   **terra-2-col** adjusted styles to handle column heights correctly.
-   **terra-3-col** adjusted styles to handle column heights correctly.

<a name="3.0.0-beta.10"></a>

# 3.0.0-beta.10 (23.10.2018)

### Bug Fixes

-   **terra-date-picker** fix format of the date string emitted by `ngModelChange`

<a name="3.0.0-beta.9"></a>

# 3.0.0-beta.9 (22.10.2018)

### Feature

-   **terra-3-col** new component that displays given views next to each other in up to three columns

### Bug Fixes

-   **terra-date-picker** fixed format of the date string emitted by `ngModelChange`.

### Changes

-   The definition of custom font faces have been separated into multiple files.

<a name="3.0.0-beta.8"></a>

# 3.0.0-beta.8 (17.10.2018)

### Bug Fixes

-   **terra-data-table** - fix issue where numbers were formatted using the default locale - fix issue with data of type `TerraDataTableTextInterface` where the icon was not shown, if the text was empty

<a name="3.0.0-beta.7"></a>

# 3.0.0-beta.7 (15.10.2018)

The following components/classes have been marked deprecated:

-   **terra-multi-split-view**
-   **terra-multi-split-view.interface**
-   **terra-multi-split-view.config**
-   **terra-multi-split-view.helper**
-   **terra-multi-split-view-breadcrumbs.service**
-   **terra-multi-split-view-module.interface**
-   **terra-multi-split-view-route.interface**
-   **terra-multi-split-view-route-data.interface**
-   **terra-multi-split-view-routes.interface**

-   **resolve-list-item.interface**
-   **resolved-data.interface**
-   **terra-resolved-data.helper**

For further information on how to replace it see the [SplitView Migration Guide](https://developers.plentymarkets.com/dev-doc/split-view-migration-guide).

The following deprecated variables have been deleted:

-   **terra-button-with-options** `inputIsPrimary`, `inputIsSecondary`, `inputIsTertiary`
-   **terra-button.interface** `isPrimary`, `isSecondary`, `isTertiary`,
-   **terra-button** `inputIsPrimary`, `inputIsSecondary`, `inputIsTertiary`
-   **terra-file-chooser** `inputIsPrimary`, `inputIsSecondary`, `inputIsTertiary`
-   **terra-dynamic-module-loader** `inputParameter` (use `inputInputs` instead)
-   **terra-filter** `inputInputList` (use `ng-content` instead)
-   **terra-checkbox** `inputId`
-   **terra-double-input** `inputValue` (use `ngModel` instead)
-   **terra-number-input** `inputValue` (use `ngModel` instead)
-   **terra-input** `inputPlaceholder` (use `inputName` instead)
-   **terra-text-area-input** `inputType`, `inputValue` (use `ngModel` instead), `inputMaxCols`
-   **terra-text-input** `inputType`, `inputValue` (use `ngModel` instead)
-   **terra-select-box** `outputValueChanged` (use `ngModelChange` instead), `inputSelectedValue` (use `ngModel` instead)
-   **terra-suggestion-box** `outputValueChanged` (use `ngModelChange` instead), `resetComponentValue()` (use `ngModel` instead)
-   **terra-tag.interface** `caption` (use `name` or `names` instead), `badge` (use `name` or `names` instead)
-   **terra-multi-split-view** `inputComponentRoute`
-   **terra-data-table-cell.interface** `caption` (use `data` or `data.caption` instead), `icon` (use `data.icon` instead), `color` (use `data.color` instead), `buttonList` (use `data` instead), `href` (use `data` instead) -> `data` can be a type of `string`, `number`, `TerraDataTableTextInterface`, `TerraRefTypeInterface`, `Array<TerraButtonInterface>`or `Array<TerraTagInterface>`
-   **terra-data-table-header-cell.interface** `textAlign:string` (use `textAlign:TerraTextAlignEnum` instead)
-   **terra-data-table** `hasCheckboxes` (use `inputHasCheckboxes` instead)
-   **terra-simple-table** setter and getter of `headerList` (use `inputHeaderList`), getter and setter of `rowList` (use `inputRowList` instead)

The following deprecated components have been deleted:

-   **terra-multi-select-box** use `terra-multi-check-box` instead
-   **terra-button-group**
-   **terra-navigator**
-   **terra-split-view** use `terra-multi-split-view` instead
-   **terra-tile-box** use `terra-card` instead
-   **terra-tree** use `terra-node-tree` instead
-   **terra-url-params-decorator** use `terra-base-service::createUrlSearchParams` instead

<a name="3.0.0-beta.6"></a>

# 3.0.0-beta.6 (12.10.2018)

Adapted Changes from v2.4.0

### Feature

-   **terra-stopwatch** added new terra component terra-stopwatch.

<a name="3.0.0-beta.6"></a>

# 3.0.0-beta.6 (xx.xx.2018)

-   **function-groups** added missing styles for .btn-major

<a name="3.0.0-beta.5"></a>

# 3.0.0-beta.5 (04.10.2018)

-   **terra-nested-picker** added showFullSelectionPath property to show if you want the entire path for a selected node

<a name="3.0.0-beta.4"></a>

# 3.0.0-beta.4 (20.09.2018)

-   **terra-file-browser** fixed issue when uploading a file

<a name="3.0.0-beta.3"></a>

# 3.0.0-beta.3 (19.09.2018)

### Bug Fixes

-   **terra-data-table** add initialisation for private row list properties

<a name="3.0.0-beta.2"></a>

# 3.0.0-beta.2 (19.09.2018)

Adapted Changes from v2.3.23

<a name="3.0.0-beta.1"></a>

# 3.0.0-beta.1 (13.09.2018)

Adapted Changes from v2.3.21 and v2.3.22

<a name="3.0.0-beta.0"></a>

# 3.0.0-beta.0 (11.09.2018)

### Breaking Changes

-   **terra-pager.interface** added type generic to make it reusable for different types of entries. To migrate your interface which previously extended the `TerraPagerInterface`, please replace its occurrences with the new interface. Make sure to pass the type of a single entry of your interface as generic to the new interface.

<a name="2.4.3"></a>

# 2.4.3 (21.11.2018)

### Feature

-   **terra-indicator** added TerraIndicatorLabelTypeEnum and TerraIndicatorInterface for clearer usage

### Bug Fixes

-   **terra-simple-table** fix issue with notifications on `selectedRowList` changes via `outputSelectedRowsChange`.

<a name="2.4.2"></a>

# 2.4.2 (12.11.2018)

### Bug Fixes

-   **terra-suggestion-box** prevent duplicate execution of callbacks and emission of notifications when selecting a value from the suggestion list
-   **terra-simple-table** fixed selectedValue of onRowCheckboxChange() Event

### Feature

-   **angular-cli** added support for angular-cli usage
-   **terra-simple-table** added support to set selected rows
-   **terra-info** add new component `terra-info` for short information about another ui element
-   **terra-icons** new icons for table sorting: icon-table_sort, icon-sort-asc, icon-sort-desc
-   **terra themes** changed main style selector 'dark-standard' to 'theme-core'
-   **function-groups** removed custom group for add-icon
-   **function-groups** added missing styles for .btn-major

<a name="2.4.1"></a>

# 2.4.1 (17.10.2018)

### Bug Fixes

-   **terra-double-input** fixed issue with the decimal separator. It now accepts decimal inputs in the localized format.

<a name="2.4.0"></a>

# 2.4.0 (12.10.2018)

-   **TerraButtonInterface** `isPrimary`, `isSecondary` and `isTertiary` are now deprecated. Each icon has its own fixed color.
-   **terra-button-with-options** `inputIsPrimary`, `inputIsSecondary` and `inputIsTertiary` are now deprecated. Each icon has its own fixed color.
-   **terra-dynamic-module-loader** input `inputParameter` is now deprecated. Use input `inputInputs` instead.
-   **terra-button-group** && **terra-navigator** && **terra-navigator.config** && **terra-navigator-split-view.config** are now deprecated. Use `terra-node-tree` instead.
-   **terra-tree** is now deprecated. Use `terra-node-tree` instead.
-   **terra-tile-box** && **terra-tile-box-panel** are now deprecated. Use `terra-card` instead.

### Bug Fixes

-   **terra-data-table** pass click event to a button's `clickFunction` if it is placed in a table row

<a name="2.3.26"></a>

# 2.3.26 (04.10.2018)

### Feature

-   **terra-button** added input `inputIsMajor`. It is used for the primary button in a view (for example delete customer). If true the button gets fully colored.

### Bug Fixes

-   **button-group** fixed styles
-   **terra-button** updated functiongroup selector
-   **terra-button** updated highlighted buttons to match function groups

<a name="2.3.23"></a>

# 2.3.23 (19.09.2018)

### Bug Fixes

-   **icons** moved reset to warning-group
-   **icons** moved search to info-group
-   **terra-suggestion-box** fix an issue where the input text was reset after a value was selected and the user typed again

<a name="2.3.22"></a>

# 2.3.22 (12.09.2018)

### Feature

-   **icons** Added function groups

<a name="2.3.21"></a>

# 2.3.21 (12.09.2018)

### Bug Fixes

-   **terra-suggestion-box** fixed issue while resetting `selectedValue`
-   **terra-breadcrumbs** fixed an issue where the breadcrumb dropdown would not show on iOS devices.
-   **terra-node-tree** fixed an null pointer.
-   **icons** new icons for login, logout, header, footer, content

<a name="2.3.19"></a>

# 2.3.19 (05.09.2018)

### Bug Fixes

-   **terra-code-editor** Improve validating custom markup
-   **terra-code-editor** Fix initial check which view should be shown
-   **terra-form** fixed initial evaluation of child scopes inside list entries

<a name="2.3.18"></a>

# 2.3.18 (31.08.2018)

### Bug Fixes

-   **terra-note-editor** fixed issue for saving notes.
-   **terra-file-browser** fixed issue when used in a multi split view.

<a name="2.3.17"></a>

# 2.3.17 (31.08.2018)

### Bug Fixes

-   **terra-breadcrumbs** fix context menu position.
-   **terra-breadcrumbs** automatically scroll into view for active breadcrumb.
-   **terra-file-browser** reset the file list when `inputStorageServices` is updated.
-   **terra-form** list fields can reference current list entry in isVisible expressions by the key of the parent field leaded by a '$'-sign (e.g. '$entries')

<a name="2.3.16"></a>

# 2.3.16 (29.08.2018)

### Bug Fixes

-   **terra-file-list** fixed issue when uploading files using `firefox`.
-   **terra-dynamic-form** adjust horizontal container header layout to the layout of vertical container
-   **terra-dynamic-form** horizontal container gives now equal width to its elements

<a name="2.3.15"></a>

# 2.3.15 (22.08.2018)

### Bug Fixes

-   **terra-suggestion-box** fixed issue with uninitialised `inputListBoxValues`.

<a name="2.3.14"></a>

# 2.3.14 (22.08.2018)

### Feature

-   **terra-icons** added new icons
-   **terra-form** Improve backward compatibility to **terra-dynamic-form**

### Bug Fixes

-   **terra-code-editor** fixed validation of HTML-tags with multiple attributes

<a name="2.3.13"></a>

# 2.3.13 (21.08.2018)

### Feature

-   **terra-nested-data-picker** new component terra-nested-data-picker

### Bug Fixes

-   **terra-button** fixed disabled state showing the buttons background color while clicked or focused
-   **terra-suggestion-box** prevent execution of `ngModelChange`-Callback if value changes from `undefined` to `null` or reverse.
-   **terra-breadcrumbs** changed handling to find route by url.

<a name="2.3.12"></a>

# 2.3.12 (20.08.2018)

### Feature

-   **terra-tag-select** add new component for tag select and deselect with ngModel support

<a name="2.3.11"></a>

# 2.3.11 (17.08.2018)

### Feature

-   **category-data.interface** && **category-detail-data.interface** extend interfaces since some properties were missing in comparision to the [rest interface](https://developers.plentymarkets.com/rest-doc/category_category/details).
-   **terra-suggestion-box** \* New Output `textInputValueChange` that emits the current text input value
    -   Select a Value from the suggestions if the entered text matches its caption
    -   `selectedValue` is reset if `inputListBoxValues` is updated and the previous selected element is not present anymore
    -   `selectedValue = null` if entered text does not match any of the `inputListBoxValues`
    -   `resetComponentValue`-Method is now deprecated. Use `ngModel` instead to set the value to `null`
    -   `outputValueChanged` is now deprecated. Use `ngModelChange` instead.
-   **terra-form** Added new component to generate forms dynamically from json data.

### Bug Fixes

-   **terra-split-view** fix for a null pointer. This component is deprecated, please use `TerraMultiSplitViewComponent` instead
-   **terra-color-picker** added border to the input field to provide more contrast for the selected color

<a name="2.3.10"></a>

# 2.3.10 (09.08.2018)

### Feature

-   **terra-breadcrumbs** added Breadcrumbs using router and routerLink

<a name="2.3.9"></a>

# 2.3.9 (08.08.2018)

### Bug Fixes

-   **terra-suggestion-box** reset selected value when `inputListBoxValues` is empty
-   **style** fixed scss variables

<a name="2.3.4"></a>

# 2.3.4 (02.08.2018)

### Features

-   **terra-icons** added new icons
-   **terra-decimal-validator** added a custom validator to validate decimals
-   **object.helper** added a helper for object operations. First there is only a function to remove keys with an `undefined` or `null` value
-   **number.helper** added a helper for number operations. First there is only a function for correctly rounding.
-   **terra-2-col** reduced two column component to bare necessities
-   **two-column.helper** added a helper for two column component sizing
-   **two-column-mobile.directive** added a directive for two column mobile handling

#### Bug Fixes

-   **terra-code-editor** added html code validation to check if all tags are closed.

<a name="2.3.3"></a>

# 2.3.3 (20.07.2018)

### Bug Fixes

-   **terra-dynamic-form** added possibility to change the debounce time

### Features

-   **terra-loading-spinner** added public getter for `isLoading` property, since this information is a global one and can be used in any component to disable elements while a request is pending.
-   **terra-base-service** added public getter for `isLoading` property to be available in every specific service extension.

<a name="2.3.2"></a>

# 2.3.2 (20.07.2018)

### Feature

-   **terra-download-helper** open document / download in new tab (download-helper)
-   **terra-2-col** added. A lightweight 2 column container.
-   **terra-info-box**
    _ added the `inputButtonList` input to display buttons using the `TerraButtonInterface`
    _ added the `inputNoWordBreak` input to disable the auto word break if set to true
-   **unit testing** added packages for testing with jasmine framework and karma command line tool
-   **terra-base-service** add `arrayAsArray` (default `false`) parameter to `createUrlSearchParams` function. If set to `true` an array is parsed to an array parameter and not a concatenated string.

### Bug Fixes

-   **terra-button** "flagged" buttons are now also clickable in the yellow corner
-   **terra-file-list** date 'last modified' will be formatted according to the default language
-   **terra-file-list** not allowed files will not be shown in the file list
-   **terra-query-encoder** new class which implements a custom encoding strategy for query parameters based on angular's [`QueryEncoder`](https://angular.io/api/http/QueryEncoder) using es2015's native [`encodeURIComponent`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)-Method
-   **terra-base-service** using new `terra-query-encoder` to encode query params in `createUrlSearchParams()`
-   **terra-url-params-decorator-service** added deprecation warning to the class since its functionality is fully implemented in the `createUrlSearchParams`-Method of the `terra-base-service`

<a name="2.3.1"></a>

# 2.3.1 (12.07.2018)

### Features

-   **terra-base-service** correct handling of error status 403

### Bug Fixes

-   **update node-sass** because of a security vulnerability in the previous version
-   **update css-loader** because of a security vulnerability in the previous version
-   **terra-code-editor** code view bug in firefox

<a name="2.3.0"></a>

# 2.3.0 (10.07.2018)

### Bug Fixes

-   **terra-base-service** remove subscription in `mapRequest()` to make request observables lazy again

<a name="2.2.25"></a>

# 2.2.25 (04.07.2018)

### Bug Fixes

-   **terra-button** enable button click again

<a name="2.2.24"></a>

# 2.2.24 (04.07.2018)

### Bug Fixes

-   **terra-button** stop event propagation on click
-   **terra-data-table** add missing "isFlagged" attribute for buttons in buttoncells
-   **terra-simple-table** added missing alignment of cell text

<a name="2.2.23"></a>

# 2.2.23 (04.07.2018)

### Features

-   **terra-code-editor** added new component for `html` code editing
-   **terra-dynamic-form** added terra-code-editor

### Bug Fixes

-   **terra-node-tree** optimized search with observable
-   **context-menu** context menu cannot be open
-   **terra-multi-check-box** states of checkbox had not been set initial

<a name="2.2.20"></a>

# 2.2.20 (26.06.2018)

### Features

-   **terra-card** render div for image only if imagePath or placeholder icon is set

<a name="2.2.18"></a>

# 2.2.18 (21.06.2018)

### Bug Fixes

-   **terra-file-picker** fixed bug with empty initialising on ngModel
-   **terra-node-tree** fixed issues with visibility of nodes in search
-   **terra-portlet** fixed issues with dropdowns being cut off in collapsable portlets.
-   **terra-info-box** fixed width when there are no buttons set

### Features

-   **terra-note-editor** added code view
-   **terra-dynamic-switch** added terra-note-editor
-   **terra-dynamic-form** added terra-note-editor
-   **custom tslint rules** added rules to prevent leading underscores, set maximum block depth and restrict getter and setter
-   **terra-file-chooser** added reset button to file chooser

<a name="2.2.16"></a>

# 2.2.16 (12.06.2018)

### Features

-   **terra-download-helper** added method `downloadFileFromUrl`, which downloads a file from a given url.
-   **converter-helper** remove injectable decorator and replace localeService parameter with the default locale
-   updated the component examples of
    _ **terra-button-with-options**
    _ **terra-note-editor**
    _ **terra-syntax-editor**
    _ **terra-filter**
    _ **terra-color-picker**
    _ **terra-info-box**
    _ **terra-tag**
    _ **terra-tag-list**

### Bug Fixes

-   **terra-select-box** avoid multipe trigger of value change event if value is the same

<a name="2.2.15"></a>

# 2.2.15 (06.06.2018)

### Features

-   **terra-text-area-input** component has now an initial height of 4 rows and is vertical resizeable.
    This feature can be disabled by setting the input `inputHasFixedHeight` to true.
-   **terra-time-picker** created new terra-time-picker component

### Bug Fixes

-   **terra-suggestion-box** dropdown closes if user clicked on other suggestion box

<a name="2.2.13"></a>

# 2.2.13 (28.05.2018)

### Features

-   **terra-multi-split-view** added routing functionality. You are now able to navigate to a view by a specific url. This feature can be enabled by setting the component's input <code>inputHasRouting</code> to true and passing a routing config to the split view using its config's property <code>routingConfig</code>.

### Bug Fixes

-   **terra-text-input** - changed color of text input with readonly attribute - rearranged style selectors to match native html attributes

<a name="2.2.12"></a>

# 2.2.12 (17.05.2018)

### Features

-   **url.helper** add new functions `removeFragment`, `removeQueryParams` and `getCleanUrl`
-   **query-param.helper** added with `appendQueryParamsToUrl` and `getQueryParamString` functions

<a name="2.2.11"></a>

# 2.2.11 (16.05.2018)

### Features

-   **alerts** restyled alerts & changed min/max-width for alert-panel
-   **file-browser** restyled file-browser
-   **terra-color-picker** restyled terra-color-picker
-   **terra-overlay** changed the background-color of overlays to grey like all the other content-areas
-   **terra-portlet** added the possibility to stack portlets in portlets

### Bug Fixes

-   **breadcrumbs** fixed issues with background-color of breadcrumbs
-   **text-area** fixed broken text-area
-   **terra-simple-table** fixed issues with [fixedHeader]-class

<a name="2.2.10"></a>

# 2.2.10 (16.05.2018)

### Bug Fixes

-   **terra-categroy-picker** fixed error with initial loading of category picker in dynamic form

<a name="2.2.7"></a>

# 2.2.7 (14.05.2018)

### Bug Fixes

-   **terra-multi-split-view** fixed error with side scroller

<a name="2.2.6"></a>

# 2.2.6 (09.05.2018)

### Bug Fixes

-   **category-picker** fixed error with the reset button

### Feature

-   **download-helper** added download helper for downloads from the backend

<a name="2.2.5"></a>

# 2.2.5 (04.05.2018)

### Feature

-   **terra-multi-split-view** set input inputComponentRoute deprecated. It is no longer needed.

### Bug Fixes

-   **terra-converter-helper** updated a used pipe after the angular update

<a name="2.2.4"></a>

# 2.2.4 (03.05.2018)

### Feature

-   **terra-select-box** fixed null pointer when <code>selectedValue</code> was undefined

<a name="2.2.3"></a>

# 2.2.3 (02.05.2018)

### Feature

-   **string-helper** new helper for strings

### Bug Fixes

-   **terra-text-input** changed color of text input with readonly attribute
-   **terra-dynamic-form** added tooltip for category picker
-   **terra-category-picker** added input for tooltip

<a name="2.2.2"></a>

# 2.2.2 (25.04.2018)

### Bug Fixes

-   **terra-base-toolbar** fixed z-Index in toolbars that caused overlapping issues

<a name="2.2.1"></a>

# 2.2.1 (24.04.2018)

### Bug Fixes

-   **themes** theming restructuring

## Feature

-   **terra-file-chooser** Added new component to open file-browser directly via a button without input element.

<a name="2.2.0"></a>

# 2.2.0 (24.04.2018)

### Minor changes

-   **Update Angular** to Version 5.2.10 and all other packages, except bootstrap, to newest version

<a name="2.1.69-zlk"></a>

# 2.1.69-zlk (24.04.2018)

### Bug Fixes

-   **themes** fixed bug with variable definitions

<a name="2.1.67-zlk"></a>

# 2.1.67-zlk (20.04.2018)

### Bug Fixes

**terra-category-picker** fixed a bug with empty category details

## Feature

**themes** added theme functionality, removed all scss variables, replaced with css variables

<a name="2.1.66-zlk"></a>

# 2.1.66-zlk (16.04.2018)

### Feature

-   **terra-note-editor** added public method <code>focus</code>, to be able to set the focus to the text-area of the editor.

### Feature

-   **terra-dynamic-form** add input `inputAllowedExtensions` to the file input form field

### Bug Fixes

-   **terra-dynamic-form** fix issue with nested containers
-   **terra-pager** adjusted width of current page input
-   **terra-category-picker** enabled the display of container categories

<a name="2.1.65-zlk"></a>

# 2.1.65-zlk (05.04.2018)

### Feature

-   **terra-multi-split-view** added routing functionality. You can now handle view addition/selection via routes. This feature is activated by setting the component's input `inputHasRouting`. Use the config's property `routingConfig` to pass in your routing configuration.
-   **terra-multi-check-box.interface** property `selected` is now optional

### Bug Fixes

-   **terra-multi-split-view** fix reoccurring "Cannot read property 'getBoundingClientRect' of undefined" error
-   **terra-data-table** fix issue where TerraRefTypeEnum is undefined in the template

<a name="2.1.64-zlk"></a>

# 2.1.64-zlk (28.03.2018)

### Bug Fixes

-   **terra-dynamic-form** remove inner portlet

<a name="2.1.63-zlk"></a>

# 2.1.63-zlk (27.03.2018)

### Bug Fixes

-   **terra-suggestion-box** fix issue with value handling and add TerraBaseData as possible value (in addition to number and string)

<a name="2.1.62-zlk"></a>

# 2.1.62-zlk (26.03.2018)

### Bug Fixes

-   **terra-multi-split-view** fix issue when view inputs contain circular references

<a name="2.1.61-zlk"></a>

# 2.1.61-zlk (23.03.2018)

### Feature

-   **terra-tag** add Styling for menu entry tag in terra-tag component
-   **terra-dynamic-form** new component to pick a color
-   **terra-dynamic-form** callback function for value changed
-   **terra-dynamic-form** added input for portlet usage in <code>TerraDynamicSwitch</code>, default is <code>true</code>
-   **terra-dynamic-switch** - added input for portlet usage, default is <code>true</code> - using portlet when type is <code>TerraFormFieldVerticalContainer</code>

<a name="2.1.60-zlk"></a>

# 2.1.60-zlk (22.03.2018)

### Feature

-   **terra-multi-check-box** new component equal to _terra-multi-select-box_ but with correct ngModel two way data binding
-   **terra-multi-select-box** this component is now deprecated and will be removed in the next major release
-   **terra-category-picker** new component to comfortable select a category using the **terra-node-tree**

<a name="2.1.58-zlk"></a>

# 2.1.58-zlk (20.03.2018)

### Bug Fixes

-   **terra-multi-split-view** fixed multi split view breadcrumb event emitter
-   **terra-file-list** added multiple selection to file input

<a name="2.1.57-zlk"></a>

# 2.1.57-zlk (12.03.2018)

### Feature

-   **models** added new interfaces for key value (TerraKeyValueInterface & TerraKeyValuePairInterface)

### Bug Fixes

-   **terra-base-service** prevent requests with empty params
-   **terra-checkbox-tree** appends parents to leaf list on every change

<a name="2.1.56-zlk"></a>

# 2.1.56-zlk (08.03.2018)

### Feature

-   **terra-data-table** added new ref-type 'function'.

<a name="2.1.55-zlk"></a>

# 2.1.55-zlk (06.03.2018)

### Feature

-   **url-helper** new component that offers methods to edit urls
-   **terra-multi-split-view** inject router instead of passing it via the input `inputRouter`.
-   **terra-placement-enum** new enum with dedicated strings for placement of e.g. tooltips
-   **terra-portlet** if the portlet is collapsable and unfolded, its header is now grey.
-   **terra-data-table** replace underline text decoration of phone and email links with blue color highlighting.

### Bug Fixes

-   **terra-data-table** hide no-results-notice when request is pending

<a name="2.1.47-zlk"></a>

# 2.1.47-zlk (06.02.2018)

### Feature

-   **terra-checkbox-tree** added value change output to the checkbox tree

<a name="2.1.46-zlk"></a>

# 2.1.46-zlk (02.02.2018)

### Feature

-   **terra-base-service** now handles UiHashExpiredException

<a name="2.1.45-zlk"></a>

# 2.1.45-zlk (01.02.2018)

### Feature

-   **terra-info-box** added css variables
-   **terra-portlet** added css variables

<a name="2.1.44-zlk"></a>

# 2.1.44-zlk (29.01.2018)

### Bug Fixes

### Feature

-   **terra-portlet** add new input `inputButtonList` to add a button group into the portlet header
-   **terra-button**

*   add properties `isSmall` and `isLarge` to button interface
*   fix styling when inputIsLink is used

-   **terra-multi-split-view** divider styling
-   **terra-overlay** changed footer & header height

<a name="2.1.39-zlk"></a>

# 2.1.39-zlk (05.01.2017)

### Bug Fixes

-   **terra-text-input** **terra-number-input** **terra-double-input**

*   fix missing label if value is 0
*   fix missing required (\*) if no value is set

-   **terra-suggestion-box** added missing styles for disabled state
-   **terra-select-box** fix missing red colored border indication for invalid state

### Feature

-   **context-menu-holder** added background color for entries and TerraButtonColorEnum for dedicated color values
-   **terra-portlet** add new input `inputHighlightPortlet` for component to highlight portlets. Edit css for highlighting portlets.
-   **terra-data-table** add a group function to handle multiple items at once in the data table
-   **terra-multi-selectbox** adjusted styling

<a name="2.1.35-zlk"></a>

# 2.1.35-zlk (13.12.2017)

### Bug Fixes

-   **terra-simple-table** **terra-data-table** fix setting of text-align
-   **TerraBaseService** improve repsonse type of service

### Feature

-   **tooltips** updated tooltip background color
-   **terra-text-input** **terra-number-input** updated tooltip background color
-   **terra-slider** adjusted styling for terra-slider-component

<a name="2.1.34-zlk"></a>

# 2.1.34-zlk (13.12.2017)

### Bug Fixes

-   **terra-text-input** **terra-number-input** **terra-double-input** **terra-select-box** **terra-date-picker** Fixed false cursor style
-   **input components** edit input scss for disabled components. Changed border-color from var(--color-structure-3) to var(--color-structure-5)
-   **terra-checkbox** fix issue with missing unique IDs

### Feature

-   **terra-input** Add input for IBAN validation. Add function to validate input (OnBlur). Add Tooltip for invalid Iban.
-   **terra-checkbox-tree** component accomplished. Basic comportment implemented
-   **terra-file-browser** you are now able to download files
-   **terra-simple-table** new interface property `textAlign` that uses `TerraTextAlignEnum` to align captions in table header cells
-   **terra-data-table** constraint interface property `textAlign` with `TerraTextAlignEnum`. Property type string is deprecated

<a name="2.1.33-zlk"></a>

# 2.1.33-zlk (07.12.2017)

### Feature

-   **terra-base-service** new method `addParamsToUrl` that generically appends query parameters to a given url
-   **terra-multi-split-view** added `setSelectedView` method to the config, to be able to manually select a specific view
-   **terra-pager** clicks on paging buttons are now debounced
-   **terra-data-table** only one paging request can now be pending at the same time
-   **terra-button-with-options** new component, that looks like a usual button, but opens a dropdown with options on click.
-   **terra-simple-table** Add hotkeys to control simple table:
    Enable hotkeys by setting `[inputEnableHotkeys]="true"` and `[inputUseHighlighting]="true"`
    Use `arrow up` / `arrow down` to navigate throught table rows.
    Use `space` or `enter` to toggle checkbox of selected row
    or `ctrl`/`cmd` + `space`/`enter` to toggle checkbox in table header.
    Toggling checkboxes required `[inputHasCheckbox]="true"`
-   **terra-simple-table** Add option to disable single rows to `TerraSimpleTableRowInterface`. Disabled rows may not be highlighted (using `inputUseHighlighting`) or selected when having checkboxes activated (`inputHasCheckbox`)
-   **terra-data-table** Add option to disable single rows to `TerraDataTableRowInterface`. Disabled rows may not be highlighted or selected when having checkboxes activated (`inputHasCheckbox`)
-   **terra-data-table-no-result-notice-component** new component, that can be used to display a notice whenever no results are available
-   **terra-number-input** removed spin-buttons
-   **terra-pager** limit page number input to a valid range
-   **terra-note** Added new component to display notes which auto adjust the height by its content.
-   **terra-select-box** Added input `inputOpenOnTop` for opening the select box drop down on top of input
-   **terra-file-browser** Add new component to upload and manage files. Uses frontend storage by default and provides properties to register custom services to handle files from different resources.
-   **terra-note-editor** new component based on [quill](https://quilljs.com/), that realizes an editor for notes with several features.
-   **terra-data-table** moved tooltips for data table headers inside the caption span for better alignment
-   **terra-slider** added input `inputIsDisabled` to disable the slider.
-   **terra-note-editor** adjust editor's default height
-   **terra-data-table** new interface property `href` that adds support for email and phone links in data table cells

### Bug Fixes

-   **terra-multi-split-view** - disable public access to the data model, since it shouldn't be edited manually - prevent adding two views with the same name to the same hierarchy level - fix scope problems with nested split-views
-   **terra-navigator** reduce height if search bar is enabled
-   **terra-base-service** avoid to show error message if code of error is null
-   **terra-suggestion-box** displayed values are reinitialized if `inputListBoxValues` have changed
-   **terra-select-box** Drop down closes if user had clicked on another select box
-   **terra-pager** Added missing translation
-   **context-menu-holder** Adapted new styles and change structure to make components usable again
-   **terra-no-result-notice** Changed the component selector to terra-no-result-notice to fit established standard
-   **terra-tag-list** exchange interface for `inputTagList`
-   **terra-data-table** refactored `TerraDataTableCellInterface` to only use one dedicated property `data` to pass cell data
-   **terra-inputs** now using unique ids to reference the label for an input element

<a name="1.4.2"></a>

# 1.4.2 (20.09.2017)

### Feature

-   **terra-multi-split-view** added new interface property _inputs_ to be able to pass a list of input variables to the component, that is added to the split view. This now allows data-binding as usual and will replace interface property _parameter_.
-   **terra-file-input** and **terra-file-browser** Added new components to manage files on S3-Bucket and display file-inputs as form control.
-   **interactables** Added directives to use [interact.js](http://interactjs.io/) inside terra-components
-   **terra-slider** Added new component to display sliders as form inputs
-   **terra-data-table** Added input 'inputHasPager' for separate usage of pager and table. The Date Table uses the pager by default.
-   **terra-suggestion-box** - Enable the user to navigate through the dropdown using the arrow keys - Select the entered text when the input is focused, to be able to delete the input with one action - Added optional Input `inputWithRecentlyUsed` to enable a list of recently used elements - Allow a space separated list of search strings

<a name="1.4.1"></a>

# 1.4.1 (04.09.2017)

### Feature

-   **terra-base-service** Generally catch exceptions that are returned from a rest call and show corresponding alert. The programmer is also still able to specify a custom exception handling function.

<a name="1.4.0"></a>

# 1.4.0 (04.09.2017)

### Feature

-   **terra-multi-split-view** - added function to close selected views via dropdown - added new inputs _inputRouter_ and _inputComponentRoute_ to catch routing events and to access the routing config - added _skipAnimation_ option to _updateViewport_ method to disable animation when changing the selected view
-   **terra-base-toolbar** Added input 'inputIsSticky' to set the toolbar sticky at top of containing container
-   **terra-color-picker** Added new component for selecting colors based on HTML5 color picker.
-   **terra-portlet** Added input-property `inputIsCollapsable` to make portlets collapsable and properties
    `inputIsCollapsed` and `inputIsCollapsedChange` to bind collapsed state from parent component.

### Bug Fixes

-   **terra-multi-split-view** - fixed bug when removing a view that is not selected (vertically) - removed vertical animations for right positioning in plugins - fixed problems with updating the viewport after resizing

<a name="1.3.2"></a>

# 1.3.2 (03.08.2017)

### Feature

-   **terra-checkbox** added isValid property for Validation purposes
-   **terra-multi-split-view** - adjusted sliding animations; - fixed rendering of multiple views; - partially rebuild breadcrumbs on vertical selection changes; - added possibility to resize a view manually, after it has already been added to the split-view; - added new interface property 'focusedWidth' to be able to automatically resize a view when it's focused.
-   **terra-info-box** restyled

### Feature

-   **terra-suggestion-box** Allow html parsing

### Bug Fixes

-   **terra-suggestion-box** Replace deprecated tooltipReplacement
-   **terra-tag** fix tag right margin in tag list
-   **terra-loading-spinner** fix bug with infinite loading animation
-   **terra-multi-split-view** - adjusted sliding animations; - fixed rendering of multiple views;

<a name="1.2.3"></a>

# 1.2.3 (11.07.2017)

### Feature

-   **terra-multi-split-view** New splitview with vertical layers
-   **terra-split-view** Various interface changes
-   **terra-dynamic-module-loader** Added commentary

### Bug Fixes

-   **ExpressionChangedAfterItHasBeenCheckedError** no more unnecessary change detection

<a name="1.2.2"></a>

# 1.2.2 (27.06.2017)

### Feature

-   **terra-text-input** Added input 'inputIsPassword'. set true to substitute password with asterisks.
-   **terra-button** Changed style for context menu

### Bug Fixes

-   **terra-base-service** Fixed error handling for http statuscode 401

<a name="1.2.1"></a>

# 1.2.1 (30.05.2017)

### Feature

-   **terra-data-table** Added text align for content
-   **plenty-icons** New icon class _.icon-zoom_out_ and updated icons for _.icon-shipment_tracking_ and _.icon-reorder_search_ and _icon-reversal_document-13_
-   **base-service** Add _createUrlSearchParams()_ function to create URLSearchParams from a given params interface
-   **terra-text-input** **terra-number-input** **terra-double-input** **terra-text-area-input** Added placeholder

### Bug Fixes

-   **terra-date-picker** Fixed date format
-   **terra-select-box** Support for empty value in select box

<a name="1.2.0"></a>

# 1.2.0 (18.05.2017)

### Feature

-   **angular** Changed angular versions from 4.0.X to 4.1.X

<a name="1.1.1"></a>

# 1.1.1 (18.05.2017)

### Feature

-   **terra-button** Changed background color of button
-   **terra-taglist** Added icons to tag component

### Bug Fixes

-   **terra-button** Fixed button focus outline
-   **terra-split-view** Fixed sliding for breadcrumbs
-   **terra-number-input** Fixed disable of input
-   **terra-base-service** Fixed error response handling
-   **terra-base-service** Fixed empty response handling

<a name="1.1.0"></a>

# 1.1.1 (08.05.2017)

### Bug Fixes

-   **terra-button** changed colors and minor pseudo-class fixes

<a name="1.1.0"></a>

# 1.1.0 (05.05.2017)

### Feature

-   **terra-syntax-editor** NEW component for displaying and editing code.
-   **terra-card** NEW component to display data in a responsive card (grid) layout
-   **terra-button.interface** Add new optional attributes _tooltipPlacement_, _isPrimary_, _isSecondary_, _isTertiary_, _isDisabled_, _isHidden_
-   **terra-button** Add new inputs _inputIsTertiary_, _inputIsFlagged_
-   **terra-checkbox** Add new input _inputIcon_
-   **terra-overlay** Add new outputs _outputOnHide_, _outputOnShow_
-   **terra-data-table** Add additional options for _buttonList_
-   **terra-simple-table** Add additional options for _buttonList_
-   **terra-simple-table-cell.interface** add _buttonListAlignRight_ attribute
-   **terra-simple-table-row.interface** add _textColorCss_ attribute

### Bug Fixes

-   **terra-checkbox** The label is clickable to change the value.
-   **terra-checkbox** Fixed a bug where the change event wasn't triggered correctly.
-   **terra-base.service** Showing the relogin overlay on 401 (Unauthorized) http response.
-   **terra-split-config-base** The parameter as JSON of two different views is now compared correctly.
-   **terra-split-view** Reloading split view won't add more modules to HTML anymore.
-   **terra-split-view** Fixed CSS for split view showing in an overlay.
-   **terra-data-table** Tooltip changes for cells and header.
-   **terra-simple-table** Tooltip changes for cells and header.

<a name="1.0.3"></a>

# 1.0.3 (28.04.2017)

### Feature

-   **terra-navigator** Add double column navigation

<a name="1.0.2"></a>

# 1.0.2 (27.04.2017)

### Feature

-   **terra-navigator** Add isVisible & route to TerraNavigatorNodeInterface
-   **terra-navigator** Add new methods to add dynamically nodes to terra-navigator

<a name="1.0.1"></a>

# 1.0.1 (26.04.2017)

### Breaking Changes

-   **ng2-bootstrap** replaced ng2-bootstrap with ngx-bootstrap

### Feature

-   **terra-navigator** Add tooltip to navigator buttons

### Bug Fixes

-   **terra-tag.interface** Caption is now deprecated. Please use badge instead. It will become mandatory in the next major release.
-   **terra-navigator** Removed additional divider from terra navigator.
-   **terra-alert-panel** Show messages behind content
-   **terra-date-picker** Correct displaying of icons

<a name="0.1.4"></a>

# 0.1.4 (10.04.2017)

### Feature

-   **terra-navigator** collapse icons for items with children

### Bug Fixes

-   **terra-split-view** responsive breadcrumbs

<a name="0.1.3"></a>

# 0.1.3 (07.04.2017)

### Feature

-   **terra-navigator** new navigator component

### Bug Fixes

-   **terra-suggestion-box** fix two way binding

### Fix

-   **terra-toggle** change inputSelectedValue to ngModel

<a name="0.1.2"></a>

# 0.1.2 (31.03.2017)

### Feature

-   **terra-toggle** added export

<a name="0.1.1"></a>

# 0.1.1 (31.03.2017)

### Bug Fixes

-   **terra-number-input** ngModel binds number type correctly
-   **terra-double-input** ngModel binds number type correctly

### Feature

-   **terra-toggle** Create toggable button component
-   **terra-data-table** Created initial loading message

<a name="0.1.0"></a>

# 0.1.0 (30.03.2017)

### Breaking Changes

-   **terra-components** Update terra-components to Angular 4.0.0
-   **terra-components** Update angular2localization to angular-l10n

<a name="0.0.193"></a>

# 0.0.193 (16.03.2017)

### Features

-   **terra-split-view** Changed styling of bread crumb navigation list elements ([20a92f2](https://github.com/plentymarkets/terra-components/commit/20a92f2))
-   **terra-filter** Added form tag for ability to submit on enter. Use '(outputOnEnterSubmit)' for this feature ([514b700](https://github.com/plentymarkets/terra-components/commit/514b700))

<a name="0.0.192"></a>

# 0.0.192 (16.03.2017)

### Bug Fixes

-   **tooltip** FIX disabling of input components ([47d03f4](https://github.com/plentymarkets/terra-components/commit/47d03f4))

### Features

-   **terra-loading-spinner-service** NEW loading spinner service and component ([fa54862](https://github.com/plentymarkets/terra-components/commit/fa54862))

<a name="0.0.191"></a>

# 0.0.191 (13.03.2017)

### Features

-   **terra-date-picker** Selector will open when the input field is clicked - Input is not editable anymore

### Bug Fixes

-   **terra-select-box** FIX active selected value

<a name="0.0.190"></a>

# 0.0.190 (13.03.2017)

### Bug Fixes

-   **terra-tile-box-panel** FIX viewStyle value for tile box CSS

<a name="0.0.189"></a>

# 0.0.189 (13.03.2017)

### Bug Fixes

-   **terra-data-table** FIX table colours for row hover and selected row

### Features

-   **terra-suggestion-box** Label position changed
-   **terra-date-picker** Invert button colours
-   **terra-tile-view** Set tile view as default

<a name="0.0.188"></a>

# 0.0.188 (09.03.2017)

### Bug Fixes

-   **terra-select-box** FIX missing existing check on rendering selected value
-   **terra-select-box** FIX emit outputValueChanged event after selection
-   **terra-select-box.interface** FIX changed type of caption from any to string or number

<a name="0.0.186"></a>

# 0.0.186 (09.03.2017)

### Bug Fixes

-   **terra-indicator** FIX usage of inputs in template conforming to style classes

<a name="0.0.185"></a>

# 0.0.185 (07.03.2017)

### Bug Fixes

-   **terra-select-box** FIX data binding and selection bug when using the same array of listBoxValues for multiple select-boxes in the same view.

### Features

-   **terra-select-box.interface** The active property has been removed because it is no longer being used
-   **terra-base-service** when not in productive mode the base url is master.plentymarkets.com ([e751503](https://github.com/plentymarkets/terra-components/commit/e751503))
-   **Jquery** Added jquery libraries to project
-   **terra-split-view** Split view scrolls now automatically & improved breadcrumb navigation

<a name="0.0.184"></a>

# 0.0.184 (03.03.2017)

### Bug Fixes

-   **Tooltip** FIX deprecated input naming
-   **Loading Bar** Removed Loading Bar
-   **Pager** Removed 'limit of a hundred' from Pager
-   **Select Box** FIX styling of terra-select-box when disabled ([e3d8015](https://github.com/plentymarkets/terra-components/commit/e3d8015))

### Features

-   **terra-split-view** Improved CSS styling & added horizontal scroll function
-   **Tooltip color** Changed Tooltip color to blue
-   **Parameter interface** New TerraPagerParameterInterface for rest calls ([a1c192b](https://github.com/plentymarkets/terra-components/commit/a1c192b))
-   **Table** Possibility to highlight active row of table ([301acbd](https://github.com/plentymarkets/terra-components/commit/301acbd))([5abb415](https://github.com/plentymarkets/terra-components/commit/5abb415))

### Breaking Changes

-   **Upgrade to Angular 2.4.X** ([5b31d78](https://github.com/plentymarkets/terra-components/commit/5b31d78))

<a name="0.0.183"></a>

# 0.0.183 (28.02.2017)

### Features

-   **terra-date-picker** adding clear function to clear the input especially when not initially needed

<a name="0.0.182"></a>

# 0.0.182 (27.02.2017)

### Bug Fixes

-   **terra-select-box** FIX value selection when value is number
