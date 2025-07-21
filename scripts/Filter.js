class Filter {
  selectors = {
    root: '[data-js-filter]',
    filterWrapper: '[data-js-filter-wrapper]',
    filterList: '[data-js-filter-list]',
    filterItem: '[data-js-filter-item]',
    filterOverlay: '[data-js-filter-overlay]',
    filterButton: '[data-js-filter-button]',
  }

  stateClasses = {
      isActive: 'is-active',
    }

  constructor (cardsInstance, initialData) {
    this.rootElement = document.querySelector(this.selectors.root)
    this.filterWrapperElement = this.rootElement.querySelector(this.selectors.filterWrapper)
    this.filterListElement = this.rootElement.querySelector(this.selectors.filterList)
    this.filterItemElements = this.rootElement.querySelectorAll(this.selectors.filterItem)
    this.filterOverlayElement = this.rootElement.querySelector(this.selectors.filterOverlay)
    this.filterButtonElement = document.querySelector(this.selectors.filterButton)
    this.cards = cardsInstance
    this.originalData = [...initialData]
    this.activeFilter = 'new'
    this.bindEvents()
  }

  handleOpenFilter = () => {
    this.filterWrapperElement.classList.toggle(this.stateClasses.isActive)
  }

  handleFilterChange = (event) => {
    const radio = event.target
    const filterValue = radio.value
    
    if (radio.checked) {
      this.activeFilter = filterValue
    }
    
    this.applyFilters()
  }

  applyFilters = () => {
    let filteredData = [...this.originalData]
    filteredData = filteredData.filter(item => {
      if (this.activeFilter === 'new') return item.new 
      if (this.activeFilter === 'availability') return item.quantity > 0
      if (this.activeFilter === 'contract') return item.contract
      if (this.activeFilter === 'exclusive') return item.exclusive
      if (this.activeFilter === 'sale') return item.sale
        return true
    })
      this.cards.updateCards(filteredData)
    }
    

  bindEvents () {
    this.filterButtonElement.addEventListener('click', this.handleOpenFilter)
    this.filterOverlayElement.addEventListener('click', this.handleOpenFilter)
    this.filterItemElements.forEach((radio) => {
      radio.addEventListener('change', this.handleFilterChange)
      radio.addEventListener('change', this.handleOpenFilter)
    })
  }
}

export default Filter