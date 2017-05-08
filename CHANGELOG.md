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
