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
