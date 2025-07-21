class Sorting {

  constructor(cardsInstance, initialData) {
    this.cards = cardsInstance
    this.originalData = [...initialData]
    this.sortMethods = {
      'min-price': (a, b) => a.price - b.price,
      'max-price': (a, b) => b.price - a.price,
      'popular': (a, b) => b.rating - a.rating,
      'date': (a, b) => new Date(b.date) - new Date(a.date),
      'default': () => 0 
    }
    this.bindEvents()
  }

  sortDate(sortType = 'default') {
    const sortedData = [...this.originalData]
    
    if (this.sortMethods[sortType]) {
      sortedData.sort(this.sortMethods[sortType])
    }
    
    this.cards.updateCards(sortedData)
  }

  bindEvents () {
    this.sortDate()
  }
}


export default Sorting