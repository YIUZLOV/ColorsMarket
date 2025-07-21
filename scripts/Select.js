class Select {
  selectors = {
    root: '[data-js-select]',
    selectHeader: '[data-js-select-header]',
    selectHeaderValue: '[data-js-select-header-value]',
    selectDropdown: '[data-js-select-dropdown]',
    selectOption: '[data-js-select-option]',
    selectOverlay: '[data-js-select-overlay]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  constructor (sorting) {
    this.rootElement = document.querySelector(this.selectors.root)
    this.selectHeaderElement = this.rootElement.querySelector(this.selectors.selectHeader)
    this.selectHeaderValueElement = this.rootElement.querySelector(this.selectors.selectHeaderValue)
    this.selectDropdownElement = this.rootElement.querySelector(this.selectors.selectDropdown)
    this.selectOptionElements = this.rootElement.querySelectorAll(this.selectors.selectOption)
    this.selectOverlayElement = this.rootElement.querySelector(this.selectors.selectOverlay)
    this.sorting = sorting
    this.bindEvents()
  }

  
  handleDropdownSelect = () => {
    this.rootElement.classList.toggle(this.stateClasses.isActive)
  }

  handleChoiseSelect (option) {
    const text = option.textContent
    this.selectHeaderValueElement.textContent = text
    this.selectOptionElements.forEach((element) => {
      element.setAttribute('aria-selected', 'false')
      option.setAttribute('aria-selected', 'true')
    })

    this.handleDropdownSelect()
  }

  bindEvents () {
    this.selectHeaderElement.addEventListener('click', this.handleDropdownSelect)
    this.selectOverlayElement.addEventListener('click', this.handleDropdownSelect)
    this.selectOptionElements.forEach((element) => {
      element.addEventListener('click', () => {
        this.handleChoiseSelect(element)
        this.sorting.sortDate(element.dataset.value)
      })
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleChoiseSelect(element)
        }
      })
    })
  }
}

export default Select