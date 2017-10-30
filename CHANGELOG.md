#Unreleased
### Feature
* **terra-base-service** new method `addParamsToUrl` that generically appends query parameters to a given url
* **terra-multi-split-view** added `setSelectedView` method to the config, to be able to manually select a specific view
* **terra-pager** clicks on paging buttons are now debounced
* **terra-data-table** only one paging request can now be pending at the same time
* **terra-button-with-options** new component, that looks like a usual button, but opens a dropdown with options on click.
* **terra-simple-table** Add hotkeys to control simple table:
Enable hotkeys by setting `[inputEnableHotkeys]="true"` and `[inputUseHighlighting]="true"`
Use `arrow up` / `arrow down` to navigate throught table rows. 
Use `space` or `enter` to toggle checkbox of selected row 
or `ctrl`/`cmd` + `space`/`enter` to toggle checkbox in table header.
Toggling checkboxes required `[inputHasCheckbox]="true"`
* **terra-simple-table** Add option to disable single rows to `TerraSimpleTableRowInterface`. Disabled rows may not be highlighted (using `inputUseHighlighting`) or selected when having checkboxes activated (`inputHasCheckbox`)
* **terra-data-table-no-result-notice-component** new component, that can be used to display a notice whenever no results are available
* **terra-number-input** removed spin-buttons

### Bug Fixes
* **terra-multi-split-view** 
	- disable public access to the data model, since it shouldn't be edited manually
	- prevent adding two views with the same name to the same hierarchy level
* **terra-navigator** reduce height if search bar is enabled
* **terra-select-box** Drop down closes if user had clicked on another select box

<a name="1.4.2"></a>
# 1.4.2 (20.09.2017)
### Feature
* **terra-multi-split-view** added new interface property _inputs_ to be able to pass a list of input variables to the component, that is added to the split view. This now allows data-binding as usual and will replace interface property _parameter_.
* **terra-file-input** and **terra-file-browser** Added new components to manage files on S3-Bucket and display file-inputs as form control.
* **interactables** Added directives to use [interact.js](http://interactjs.io/) inside terra-components
* **terra-slider** Added new component to display sliders as form inputs
* **terra-data-table** Added input 'inputHasPager' for separate usage of pager and table. The Date Table uses the pager by default.
* **terra-suggestion-box** 
	- Enable the user to navigate through the dropdown using the arrow keys
	- Select the entered text when the input is focused, to be able to delete the input with one action
	- Added optional Input `inputWithRecentlyUsed` to enable a list of recently used elements
	- Allow a space separated list of search strings

<a name="1.4.1"></a>
# 1.4.1 (04.09.2017)

### Feature
* **terra-base-service** Generally catch exceptions that are returned from a rest call and show corresponding alert. The programmer is also still able to specify a custom exception handling function.

<a name="1.4.0"></a>
# 1.4.0 (04.09.2017) 

### Feature
* **terra-multi-split-view** 
	- added function to close selected views via dropdown
	- added new inputs _inputRouter_ and _inputComponentRoute_ to catch routing events and to access the routing config
	- added _skipAnimation_ option to _updateViewport_ method to disable animation when changing the selected view
* **terra-base-toolbar** Added input 'inputIsSticky' to set the toolbar sticky at top of containing container
* **terra-color-picker** Added new component for selecting colors based on HTML5 color picker.  
* **terra-portlet** Added input-property `inputIsCollapsable` to make portlets collapsable and properties 
`inputIsCollapsed` and `inputIsCollapsedChange` to bind collapsed state from parent component.

### Bug Fixes
* **terra-multi-split-view**
	- fixed bug when removing a view that is not selected (vertically)
	- removed vertical animations for right positioning in plugins
 	- fixed problems with updating the viewport after resizing

<a name="1.3.2"></a>
# 1.3.2 (03.08.2017)
### Feature
* **terra-checkbox** added isValid property for Validation purposes
* **terra-multi-split-view** 
	- adjusted sliding animations; 
	- fixed rendering of multiple views; 
	- partially rebuild breadcrumbs on vertical selection changes; 
	- added possibility to resize a view manually, after it has already been added to the split-view;
	- added new interface property 'focusedWidth' to be able to automatically resize a view when it's focused.
* **terra-info-box** restyled

### Feature
* **terra-suggestion-box** Allow html parsing

### Bug Fixes
* **terra-suggestion-box** Replace deprecated tooltipReplacement
* **terra-tag** fix tag right margin in tag list
* **terra-loading-spinner** fix bug with infinite loading animation
* **terra-multi-split-view** 
	- adjusted sliding animations; 
	- fixed rendering of multiple views; 

<a name="1.2.3"></a>
# 1.2.3 (11.07.2017)

### Feature
* **terra-multi-split-view** New splitview with vertical layers
* **terra-split-view** Various interface changes
* **terra-dynamic-module-loader** Added commentary

### Bug Fixes
* **ExpressionChangedAfterItHasBeenCheckedError** no more unnecessary change detection

<a name="1.2.2"></a>
# 1.2.2 (27.06.2017)

### Feature
* **terra-text-input** Added input 'inputIsPassword'. set true to substitute password with asterisks.
* **terra-button** Changed style for context menu

### Bug Fixes
* **terra-base-service** Fixed error handling for http statuscode 401

<a name="1.2.1"></a>
# 1.2.1 (30.05.2017)

### Feature
* **terra-data-table** Added text align for content
* **plenty-icons** New icon class _.icon-zoom_out_ and updated icons for _.icon-shipment_tracking_ and _.icon-reorder_search_ and _icon-reversal_document-13_
* **base-service** Add _createUrlSearchParams()_ function to create URLSearchParams from a given params interface
* **terra-text-input** **terra-number-input** **terra-double-input** **terra-text-area-input** Added placeholder 

### Bug Fixes
* **terra-date-picker** Fixed date format
* **terra-select-box** Support for empty value in select box

<a name="1.2.0"></a>
# 1.2.0 (18.05.2017)

### Feature
* **angular** Changed angular versions from 4.0.X to 4.1.X

<a name="1.1.1"></a>
# 1.1.1 (18.05.2017)

### Feature
* **terra-button** Changed background color of button
* **terra-taglist** Added icons to tag component

### Bug Fixes
* **terra-button** Fixed button focus outline 
* **terra-split-view** Fixed sliding for breadcrumbs
* **terra-number-input** Fixed disable of input 
* **terra-base-service** Fixed error response handling
* **terra-base-service** Fixed empty response handling

<a name="1.1.0"></a>
# 1.1.1 (08.05.2017)

### Bug Fixes
* **terra-button** changed colors and minor pseudo-class fixes

<a name="1.1.0"></a>
# 1.1.0 (05.05.2017)

### Feature
* **terra-syntax-editor** NEW component for displaying and editing code.
* **terra-card** NEW component to display data in a responsive card (grid) layout
* **terra-button.interface** Add new optional attributes _tooltipPlacement_, _isPrimary_, _isSecondary_, _isTertiary_, _isDisabled_, _isHidden_
* **terra-button** Add new inputs _inputIsTertiary_, _inputIsFlagged_
* **terra-checkbox** Add new input _inputIcon_
* **terra-overlay** Add new outputs _outputOnHide_, _outputOnShow_
* **terra-data-table** Add additional options for _buttonList_
* **terra-simple-table** Add additional options for _buttonList_ 
* **terra-simple-table-cell.interface** add _buttonListAlignRight_ attribute
* **terra-simple-table-row.interface** add _textColorCss_ attribute

### Bug Fixes
* **terra-checkbox** The label is clickable to change the value.
* **terra-checkbox** Fixed a bug where the change event wasn't triggered correctly.
* **terra-base.service** Showing the relogin overlay on 401 (Unauthorized) http response.
* **terra-split-config-base** The parameter as JSON of two different views is now compared correctly.
* **terra-split-view** Reloading split view won't add more modules to HTML anymore.
* **terra-split-view** Fixed CSS for split view showing in an overlay.
* **terra-data-table** Tooltip changes for cells and header.
* **terra-simple-table** Tooltip changes for cells and header.

<a name="1.0.3"></a>
# 1.0.3 (28.04.2017)

### Feature
* **terra-navigator** Add double column navigation

<a name="1.0.2"></a>
# 1.0.2 (27.04.2017)

### Feature
* **terra-navigator** Add isVisible & route to TerraNavigatorNodeInterface
* **terra-navigator** Add new methods to add dynamically nodes to terra-navigator

<a name="1.0.1"></a>
# 1.0.1 (26.04.2017)

### Breaking Changes
* **ng2-bootstrap** replaced ng2-bootstrap with ngx-bootstrap

### Feature
* **terra-navigator** Add tooltip to navigator buttons

### Bug Fixes
* **terra-tag.interface** Caption is now deprecated. Please use badge instead. It will become mandatory in the next major release.
* **terra-navigator** Removed additional divider from terra navigator.
* **terra-alert-panel** Show messages behind content
* **terra-date-picker** Correct displaying of icons

<a name="0.1.4"></a>
# 0.1.4 (10.04.2017)

### Feature
* **terra-navigator** collapse icons for items with children

### Bug Fixes
* **terra-split-view** responsive breadcrumbs

<a name="0.1.3"></a>
# 0.1.3 (07.04.2017)

### Feature
* **terra-navigator** new navigator component

### Bug Fixes
* **terra-suggestion-box** fix two way binding

### Fix
* **terra-toggle** change inputSelectedValue to ngModel

<a name="0.1.2"></a>
# 0.1.2 (31.03.2017)

### Feature
* **terra-toggle** added export 

<a name="0.1.1"></a>
# 0.1.1 (31.03.2017)

### Bug Fixes
* **terra-number-input** ngModel binds number type correctly
* **terra-double-input** ngModel binds number type correctly

### Feature
* **terra-toggle** Create toggable button component
* **terra-data-table** Created initial loading message

<a name="0.1.0"></a>
# 0.1.0 (30.03.2017)

### Breaking Changes
* **terra-components** Update terra-components to Angular 4.0.0
* **terra-components** Update angular2localization to angular-l10n

<a name="0.0.193"></a>
# 0.0.193 (16.03.2017)

### Features
* **terra-split-view** Changed styling of bread crumb navigation list elements ([20a92f2](https://github.com/plentymarkets/terra-components/commit/20a92f2))
* **terra-filter** Added form tag for ability to submit on enter. Use '(outputOnEnterSubmit)' for this feature ([514b700](https://github.com/plentymarkets/terra-components/commit/514b700))

<a name="0.0.192"></a>
# 0.0.192 (16.03.2017)

### Bug Fixes
* **tooltip** FIX disabling of input components ([47d03f4](https://github.com/plentymarkets/terra-components/commit/47d03f4))

### Features
* **terra-loading-spinner-service** NEW loading spinner service and component ([fa54862](https://github.com/plentymarkets/terra-components/commit/fa54862))

<a name="0.0.191"></a>
# 0.0.191 (13.03.2017)

### Features
* **terra-date-picker** Selector will open when the input field is clicked - Input is not editable anymore

### Bug Fixes
* **terra-select-box** FIX active selected value

<a name="0.0.190"></a>
# 0.0.190 (13.03.2017)

### Bug Fixes
* **terra-tile-box-panel** FIX viewStyle value for tile box CSS

<a name="0.0.189"></a>
# 0.0.189 (13.03.2017)

### Bug Fixes
* **terra-data-table** FIX table colours for row hover and selected row

### Features
* **terra-suggestion-box** Label position changed
* **terra-date-picker** Invert button colours
* **terra-tile-view** Set tile view as default

<a name="0.0.188"></a>
# 0.0.188 (09.03.2017)

### Bug Fixes
* **terra-select-box** FIX missing existing check on rendering selected value
* **terra-select-box** FIX emit outputValueChanged event after selection
* **terra-select-box.interface** FIX changed type of caption from any to string or number

<a name="0.0.186"></a>
# 0.0.186 (09.03.2017)

### Bug Fixes
* **terra-indicator** FIX usage of inputs in template conforming to style classes

<a name="0.0.185"></a>
# 0.0.185 (07.03.2017)

### Bug Fixes
* **terra-select-box** FIX data binding and selection bug when using the same array of listBoxValues for multiple select-boxes in the same view.

### Features
* **terra-select-box.interface** The active property has been removed because it is no longer being used 
* **terra-base-service** when not in productive mode the base url is master.plentymarkets.com ([e751503](https://github.com/plentymarkets/terra-components/commit/e751503))
* **Jquery** Added jquery libraries to project
* **terra-split-view** Split view scrolls now automatically & improved breadcrumb navigation 

<a name="0.0.184"></a>
# 0.0.184 (03.03.2017)

### Bug Fixes
* **Tooltip** FIX deprecated input naming
* **Loading Bar** Removed Loading Bar
* **Pager** Removed 'limit of a hundred' from Pager
* **Select Box** FIX styling of terra-select-box when disabled ([e3d8015](https://github.com/plentymarkets/terra-components/commit/e3d8015))

### Features
* **terra-split-view** Improved CSS styling & added horizontal scroll function
* **Tooltip color** Changed Tooltip color to blue
* **Parameter interface** New TerraPagerParameterInterface for rest calls ([a1c192b](https://github.com/plentymarkets/terra-components/commit/a1c192b))
* **Table** Possibility to highlight active row of table ([301acbd](https://github.com/plentymarkets/terra-components/commit/301acbd))([5abb415](https://github.com/plentymarkets/terra-components/commit/5abb415))

### Breaking Changes
* **Upgrade to Angular 2.4.X** ([5b31d78](https://github.com/plentymarkets/terra-components/commit/5b31d78))

<a name="0.0.183"></a>
# 0.0.183 (28.02.2017)

### Features
* **terra-date-picker** adding clear function to clear the input especially when not initially needed

<a name="0.0.182"></a>
# 0.0.182 (27.02.2017)

### Bug Fixes
* **terra-select-box** FIX value selection when value is number
