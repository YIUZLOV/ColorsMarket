class Cards {
  selectors = {
    root: '[data-js-cards]',
    cardsList: '[data-js-cards-list]',
    cardItem: '[data-js-cards-item]',
    cardImage: '[data-js-cards-image]',
    cardName: '[data-js-cards-name]',
    cardArticle: '[data-js-cards-article]',
    cardPrice: '[data-js-cards-price]',
    cardButton: '[data-js-cards-button]',
    cardsQuantityAll: '[data-js-cards-quantity-all]'
  }


  constructor (cardsData) {
    this.rootElement = document.querySelector(this.selectors.root)
    this.cardsListElement = this.rootElement.querySelector(this.selectors.cardsList)
    this.cardsQuantityAllElement = document.querySelector(this.selectors.cardsQuantityAll)
    this.cardsQuantityAllElement.textContent = `${0} товаров`
    this.tempateCardElement = document.querySelector('#template__card')
    this.cardsData = cardsData
    this.originalData = [...cardsData]
    this.template = this.prepareTemplate()
    this.basket = null
    this.bindEvents()
  }

  setBasket(basketInstance) {
    this.basket = basketInstance
  }

  prepareTemplate() {
    const template = this.tempateCardElement.content
    return {
      card: template.querySelector(this.selectors.cardItem),
      image: template.querySelector(this.selectors.cardImage),
      name: template.querySelector(this.selectors.cardName),
      article: template.querySelector(this.selectors.cardArticle),
      price: template.querySelector(this.selectors.cardPrice),
    }
  }


  createCard() {
    let countCard = 0
    this.cardsData.forEach(element => {
      const card = this.template.card.cloneNode(true)
      card.querySelector(this.selectors.cardImage).src = element.image
      card.querySelector(this.selectors.cardImage).alt = element.title
      card.querySelector(this.selectors.cardName).textContent = element.title
      card.querySelector(this.selectors.cardArticle).textContent = element.article
      card.querySelector(this.selectors.cardPrice).textContent = `${element.price} ₽`
      card.querySelector(this.selectors.cardButton).addEventListener('click', () => {
      
        if (this.basket.basketData.has(element)) {
          this.basket.deleteBasketItem(element)
        } else {
          this.basket.addBasketItem(element)
        }
        
      })

      this.cardsListElement.appendChild(card)
      countCard += 1
      
    })
    this.cardsQuantityAllElement.textContent = `${countCard} товаров`
    this.updateBorders()
  }

  clearCards() {
    this.cardsListElement.innerHTML = ''
  }
  
  updateCards(newData) {
    this.cardsData = newData
    this.clearCards()
    this.createCard()
  }

  updateBorders = () => {
  const container = this.cardsListElement
  const screenWidth = window.innerWidth
  let gap
  let cardWidth
  const cards = Array.from(container.children)

  if (cards.length === 0) return

  if (screenWidth < 1024) {
    gap = 15
    cardWidth = 180
  }else if (screenWidth < 480) {
    gap = 15
    cardWidth = 130
  } else {
    gap = 24
    cardWidth = 278
  }
  const containerWidth = container.offsetWidth
  
  const itemsPerRow = Math.floor((containerWidth + gap) / (cardWidth + gap))

  const lastRowStart = cards.length - (cards.length % itemsPerRow || itemsPerRow)
  cards.forEach((card, index) => {
    card.style.borderBottom = index >= lastRowStart ? 'none' : 'var(--border)'
  })
}


  bindEvents () {
    this.createCard()
    window.addEventListener('resize', () => {
      requestAnimationFrame(this.updateBorders)
})
  }
}

export default Cards