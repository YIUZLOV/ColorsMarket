class Slider {
  selectors = {
    root: '[data-js-slider]',
    sliderList: '[data-js-slider-list]',
    sliderItems: '[data-js-slider-item]',
    buttonLeft: '[data-js-slider-button-left]',
    buttonRight: '[data-js-slider-button-right]',
    scrollbar: '[data-js-slider-scrollbar]',
    scrollbarItem: '[data-js-slider-scrollbar-item]',
  }

  stateClasses = {
    isActive: 'is-active',
    isLock: 'is-lock',
    isShow: 'is-show'
  }

  initialSlides = [
    {title: 'Картинка слайдера', url: 'images/slider/slider-img.jpg'},
    {title: 'Картинка слайдера', url: 'images/slider/slider-img2.jpg'},
    {title: 'Картинка слайдера', url: 'images/slider/slider-img.jpg'},
    {title: 'Картинка слайдера', url: 'images/slider/slider-img2.jpg'},
    {title: 'Картинка слайдера', url: 'images/slider/slider-img.jpg'},
  ]

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.sliderListElement = this.rootElement.querySelector(this.selectors.sliderList)
    this.sliderItemsElement = []
    this.buttonLeftElement = this.rootElement.querySelector(this.selectors.buttonLeft)
    this.buttonRightElement = this.rootElement.querySelector(this.selectors.buttonRight)
    this.scrollbarElement = this.rootElement.querySelector(this.selectors.scrollbar)
    this.scrollbarItemElement = []
    this.slidesCount = 0
    this.currentIndex = 1
    this.prevIndex
    this.createSlides()
    this.createScriollbarElements()
    this.bindEvents()
  }

  createSlides () {
    this.initialSlides.forEach((element, index) => {
      const listItem = document.createElement('li')
      const imageItem = document.createElement('img')

      imageItem.src = element.url
      imageItem.alt = element.title
      imageItem.loading = 'lazy'
      listItem.setAttribute('data-js-slider-item', '')

      if (!index) {
        listItem.classList.add('is-show')
      }

      listItem.classList.add('slider__item')
      listItem.appendChild(imageItem)
      this.sliderListElement.appendChild(listItem)
      this.sliderItemsElement.push(listItem)
      this.slidesCount ++
      
    })
  }

  createScriollbarElements() {
    this.initialSlides.forEach((item, index) => {
      const scrollElement = document.createElement('span')

      if (!index) {
        scrollElement.classList.add('is-active')
      }

      scrollElement.classList.add('slider__scrollbar__circle')
      scrollElement.setAttribute('data-js-slider-scrollbar-item', '')
      this.scrollbarElement.appendChild(scrollElement)
      this.scrollbarItemElement.push(scrollElement)

    })
  }

  checkButtonIsLock () {
    this.currentIndex === this.slidesCount 
      ? this.buttonRightElement.classList.add(this.stateClasses.isLock) 
      : this.buttonRightElement.classList.remove(this.stateClasses.isLock)
    this.currentIndex === 1 
      ? this.buttonLeftElement.classList.add(this.stateClasses.isLock) 
      : this.buttonLeftElement.classList.remove(this.stateClasses.isLock)
  }

  scrollSwitch () {
    this.scrollbarItemElement[this.prevIndex -1].classList.toggle(this.stateClasses.isActive)
    this.scrollbarItemElement[this.currentIndex -1].classList.toggle(this.stateClasses.isActive)
  }

  changeSlide () {
    this.sliderItemsElement[this.currentIndex - 1].classList.toggle(this.stateClasses.isShow)
    this.sliderItemsElement[this.prevIndex - 1].classList.toggle(this.stateClasses.isShow)
  }

  onNextSlide = () => {
    this.prevIndex = this.currentIndex
    this.currentIndex ++
    this.changeSlide()
    this.checkButtonIsLock()
    this.scrollSwitch()
  }

  onPreviousSlide = () =>  {
    this.prevIndex = this.currentIndex
    this.currentIndex --
    this.changeSlide()
    this.checkButtonIsLock()
    this.scrollSwitch()
  }
  
  bindEvents() {
    this.buttonLeftElement.addEventListener('click', this.onPreviousSlide)
    this.buttonRightElement.addEventListener('click', this.onNextSlide)
  }
}

export default Slider