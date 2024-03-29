import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TinyDropdown.css';
import arrow from '../../res/arrow.png';

class TinyDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPanel: false,
      selectedOption: this.props.selectedIndex
        ? this.props.options[this.props.selectedIndex]
        : '',
      selectedIndex: this.props.selectedIndex,
      placeHolder: this.props.placeHolder
    };
    this.parentDiv = React.createRef();
    this.button = React.createRef();
    //this.arrow = React.createRef();
  }

  initializeDefaults = () => {
    this.parentDiv.current.style.setProperty(
      '--visible-rows',
      this.props.visibleOptions
    );
    // hack to set color of the button to the dropdown-toggle-arrow
    // this.arrow.current.style.setProperty(
    //   'border-bottom-color',
    //   this.button.current.style.color
    // );
    // this.arrow.current.style.setProperty(
    //   'border-top-color',
    //   this.button.current.style.color
    // );
  };

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      this.setState({ selectedIndex:nextProps.selectedIndex, selectedOption: nextProps.options[nextProps.selectedIndex]});
    }
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleOutsideClick);
    this.initializeDefaults();
  };

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  };

  handleOutsideClick = event => {
    if (!this.parentDiv.current.contains(event.target)) {
      // Click is outside. So close the dropdown menu
      this.setState({ showPanel: false });
    }
  };

  toggleDropdownMenu = () => {
    this.setState(prevState => ({ showPanel: !prevState.showPanel }));
  };

  /**
   * @description This method is called everytime when an option is
   * selected.
   * It updates the state and also calls the callback method: "onSelect"
   * that is passed as props to this component.
   * @param SelectedIndex - Index of the item in array which is selected by user.
   */
  onOptionsSelected = selectedIndex => {
    const selectedOption = this.props.options[selectedIndex];
    this.setState({ selectedOption, selectedIndex, showPanel: false });
    this.props.onSelect(selectedOption, selectedIndex);
  };

  /**
   * @description This method is called on every object in "options"
   * array before rendering them. If the options are of string type,
   * then those items can be rendered directly.
   *
   * But for complex object types, to decide which field in the object
   * is shown in the UI, this method is called and gets the value directly
   * and displayed in the UI.
   *
   * @param Option - One of the object in "options" array
   */
  getOptionsLabel = option => {
    if (typeof this.props.label === 'function') {
      return this.props.label(option);
    }
    return option;
  };

  /**
   * @description Same as function: "getOptionsLabel".
   * But this method is for the dropdown menu when the panel is in closed state.
   * If no option is selected, then the placeholder is displayed.
   */
  getSelectedOptionLabel = () => {
    return (
      this.getOptionsLabel(this.state.selectedOption) || this.state.placeHolder
    );
  };

  getDefaultKey = (option, index) => {
    return `${this.getOptionsLabel(option)}--${index}`;
  };

  render() {
    const classes = [
      'tiny-dropdown',
      this.props.panelOnly ? 'panel-only' : ''
    ].join(' ');

    return (
      <div className={classes} ref={this.parentDiv}>
        {this.renderDropdownButton()}
        {this.renderDropdownOptionsPanel()}
      </div>
    );
  }

  renderDropdownButton() {
    const isPanelOpen = this.state.showPanel;
    const { panelOnly } = this.props;
    const dropdownMenuClasses = [
      'dropdown-menu',
      isPanelOpen ? 'panel-open' : '',
      panelOnly ? 'panel-only' : ''
    ].join(' ');

    const arrowClass = isPanelOpen ? 'arrow-up' : 'arrow-down';

    return (
      <div
        role="menu"
        className={dropdownMenuClasses}
        style={this.props.cssOverrides.dropdownButton}
        onClick={this.toggleDropdownMenu}
        ref={this.button}
      >
        <span
          className="dropdown-label dropdown-text"
          style={this.props.cssOverrides.dropdownButtonLabel}
        >
          {this.getSelectedOptionLabel()}
        </span>
        <img src={arrow}
          className={`${isPanelOpen?'rotate-180 ':' '} w-4 inline`}
        >
        </img>
      </div>
    );
  }

  renderDropdownOptionsPanel() {
    const panelStyles = {
      ...this.props.cssOverrides.dropdownPanel,
      display: this.state.showPanel ? 'inline-block' : 'none'
    };

    const selectedIndex = this.state.selectedIndex;
    const { dropdownOption, dropdownOptionSelected } = this.props.cssOverrides;

    return (
      <ul className="dropdown-panel" style={panelStyles}>
        {this.props.options.map((option, index) => (
          <li
            role="option"
            aria-selected={selectedIndex === index}
            key={option.key || this.getDefaultKey(option, index)}
            className="dropdown-option dropdown-text"
            style={
              selectedIndex === index ? dropdownOptionSelected : dropdownOption
            }
            onClick={() => this.onOptionsSelected(index)}
          >
            {this.getOptionsLabel(option)}
          </li>
        ))}
      </ul>
    );
  }
}

TinyDropdown.propTypes = {
  /**
   * @description Placeholder text for the dropdown
   * By default it shows: "Select an option"
   */
  placeHolder: PropTypes.string,

  /**
   * @description An array of options for the dropdown menu.
   * Items can either be Strings or Objects. In case of objects,
   * the property "label" is mandatory.
   */
  options: PropTypes.array.isRequired,

  /**
   * @description A function which is executed on every object in "options"
   * array. Returned value is a string representing that object is
   * shown in the UI.
   */
  label: PropTypes.func,

  /**
   * @description If any option has to be selected initially, pass the index
   * of that option as "selectedIndex". It will be marked as selected.
   */
  selectedIndex: PropTypes.number,

  /**
   * @description A handler function which will be called when user selects
   * any option from the dropdown menu.
   * @params selectedOption, selectedIndex
   */
  onSelect: PropTypes.func.isRequired,

  /**
   * @description Defines the number of options that are visible without
   * the need of scrolling down.
   * By default 8 items are visible.
   */
  visibleOptions: PropTypes.number,

  /**
   * @description If set to true, expanding the panel just hides the dropdown button.
   * Only the options panel is displayed.
   */
  panelOnly: PropTypes.bool,

  /**
   * @description  Specifies the styles to be overridden. It has sub-properties:
   *
   * dropdownButton - Overrides the styles for dropdown itself.
   * dropdownPanel - Overrides the styles for the dropdown popup panel.
   * dropdownOption - Overrides the styles for every single option in the popup panel.
   * dropdownOptionSelected - Overrides the styles for selected option in the popup panel.
   */
  cssOverrides: PropTypes.object
};

TinyDropdown.defaultProps = {
  placeHolder: 'Select an option',
  label: null,
  selectedIndex: null,
  visibleOptions: 8,
  panelOnly: false,
  cssOverrides: {
    dropdownButton: null,
    dropdownPanel: null,
    dropdownOption: null,
    dropdownOptionSelected: null
  }
};

export default TinyDropdown;