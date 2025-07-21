class Basket {
  selectors = {
    root: '[data-js-basket]',
    basketWrapper: '[data-js-basket-wrapper]',
    basketOverlay: '[data-js-basket-overlay]',
    basketQuantityAll: '[data-js-basket-quantity-all]',
    basketList: '[data-js-basket-list]',
    basketItem: '[data-js-basket-item]',
    basketItemImage: '[data-js-basket-image]',
    basketItemTitle: '[data-js-basket-title]',
    basketItemPrice: '[data-js-basket-price]',
    basketItemQuantity: '[data-js-basket-quantity]',
    basketTotalPrice: '[data-js-basket-total-price]',
    basketButtonClose: '[data-js-basket-button-close]',
    basketButtonOpen: '[data-js-basket-button-open]',
    basketButtonClear: '[data-js-basket-button-clear]',
    basketButtonDecrement: '[data-js-basket-button-decrement]',
    basketButtonIncrement: '[data-js-basket-button-increment]',
    basketButtonDelete: '[data-js-basket-button-delete]',
    basketButtonRepeat: '[data-js-basket-repeat]',
    basketButtonOrder: '[data-js-basket-button-oreder]',
  }

  stateClasses = {
    isActive: 'is-active',
    isLock: 'is-lock',
  }

  constructor () {
    this.rootElement = document.querySelector(this.selectors.root)
    this.basketWrapperElement = this.rootElement.querySelector(this.selectors.basketWrapper)
    this.basketOverlayElement = this.rootElement.querySelector(this.selectors.basketOverlay)
    this.basketList = this.rootElement.querySelector(this.selectors.basketList)
    this.basketButtonCloseElement = this.rootElement.querySelector(this.selectors.basketButtonClose)
    this.basketQuantityAllElement = this.rootElement.querySelector(this.selectors.basketQuantityAll)
    this.basketTotalPriceElement = this.rootElement.querySelector(this.selectors.basketTotalPrice)
    this.basketButtonOpenElement = document.querySelector(this.selectors.basketButtonOpen)
    this.basketButtonClearElement = this.rootElement.querySelector(this.selectors.basketButtonClear)
    this.templateBasketItemElement = document.querySelector('#template__card-basket')
    this.template = this.prepareTemplate()
    this.basketData = new Map()
    this.bindEvents()
  }

  prepareTemplate() {
    const template = this.templateBasketItemElement.content.cloneNode(true)
    return {
      item: template.querySelector(this.selectors.basketItem),
      image: template.querySelector(this.selectors.basketItemImage),
      title: template.querySelector(this.selectors.basketItemTitle),
      price: template.querySelector(this.selectors.basketItemPrice),
      quantity: template.querySelector(this.selectors.basketItemQuantity)
    }
  }

  addBasketItem (item) {
    if (this.basketData.has(item.id)) {
      const existing = this.basketData.get(item.id)
      existing.quantity += 1
    } else {
      this.basketData.set(item.id, {
        item: item,
        quantity: 1
      })
    }
    this.renderBasket()
    this.updateTotalPrice()
  }

  createBasketItem (basketItem) {
    const card = this.template.item.cloneNode(true)
    const {item, quantity} = basketItem
    card.dataset.itemId = item.id
    card.querySelector(this.selectors.basketItemImage).src = item.image
    card.querySelector(this.selectors.basketItemTitle).textContent = `${item.title} ${item.article}`
    card.querySelector(this.selectors.basketItemPrice).textContent = `${item.price} ₽`
    card.querySelector(this.selectors.basketItemQuantity).textContent = quantity

    card.querySelector(this.selectors.basketButtonDecrement).addEventListener('click', () => {
      this.updateQuantity(item.id, -1)
    })

    card.querySelector(this.selectors.basketButtonIncrement).addEventListener('click', () => {
      this.updateQuantity(item.id, 1)
    })

    card.querySelector(this.selectors.basketButtonDelete).addEventListener('click', () => {
      this.preDeleteBasket(item.id)
    })

    card.querySelector(this.selectors.basketButtonRepeat).addEventListener('click', () => {
      this.preDeleteBasket(item.id)
    })

    return card
  }

  updateQuantity(id, delta) {
    const current = this.basketData.get(id)
    if (current) {
      current.quantity = Math.max(1, current.quantity + delta)
      this.renderBasket()
    }
  }

  getBasketItemElement(id) {
    return this.basketList.querySelector(`[data-item-id="${id}"]`)
  }

  getItemsWithClass(className) {
    const selectedItems  = this.basketList.querySelectorAll(`.${className}`)
        selectedItems .forEach((element) =>  {
          const itemId = element.dataset.itemId
          this.deleteBasketItem(itemId)
        })
  }

  preDeleteBasket (id) {
    const element = this.getBasketItemElement(id)
    if (element) {
      element.classList.toggle(this.stateClasses.isLock)
    }
  }

  deleteBasketItem(id) {
    this.basketData.delete(id)
    this.renderBasket()
  }

  clearBasket() {
    this.basketData.clear()
    this.renderBasket()
  }

  updateTotalPrice() {
  return Array.from(this.basketData.values()).reduce(
    (sum, {item, quantity}) => sum + (item.price * quantity),
    0
  )
}

  updateQuantityAll() {
    return Array.from(this.basketData.values()).reduce(
      (sum, {quantity}) => sum + quantity,
      0
    )
  }

  renderBasket () {
    this.basketList.innerHTML = ''
    this.basketTotalPriceElement.textContent = `${this.updateTotalPrice()}₽`
    this.basketQuantityAllElement.textContent = `${this.updateQuantityAll()} товар(а)`
    this.basketButtonOpenElement.textContent = this.updateQuantityAll()
    if (this.basketData.size === 0) {
      this.basketList.innerHTML = '<p>Корзина пуста</p>'
      return
    }

    this.basketData.forEach((value, id) => {
      const card = this.createBasketItem(value)
      this.basketList.appendChild(card)
    })
  }

  onOpenBasket () {
    this.basketWrapperElement.classList.add(this.stateClasses.isActive)
  }

  onCloseBasket () {
    this.getItemsWithClass(this.stateClasses.isLock)
    this.basketWrapperElement.classList.remove(this.stateClasses.isActive)
  }


  bindEvents() {
    this.renderBasket()
    this.basketButtonOpenElement.addEventListener('click', () => {
      this.onOpenBasket()
    })
    this.basketButtonCloseElement.addEventListener('click', () => {
      this.onCloseBasket()
    })
    this.basketOverlayElement.addEventListener('click', () => {
      this.onCloseBasket()
    })
    this.basketButtonClearElement.addEventListener('click', () => {
      this.clearBasket()
    })
  }
}

export default Basket