import Header from "./Header.js"
import Slider from "./Slider.js"
import Select from "./Select.js"
import Filter from "./Filter.js"
import { loadingCardData } from "./Api.js"
import Cards from "./Cards.js"
import Sorting from "./Sorting.js"
import Basket from "./Basket.js"


(async () => {
  try {
    const cardsArray = await loadingCardData()
    const cardsInstance = new Cards(cardsArray)
    const basketInstance = new Basket()
    cardsInstance.setBasket(basketInstance)
    const sorting = new Sorting(cardsInstance, cardsArray)
    new Select(sorting)
    new Filter(cardsInstance, cardsArray)
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
  }
})()

new Header()
new Slider()




