import { ref } from 'vue'
import muizData from './backend/muizcommerce.json'


export default {

  setup() {
    const products = muizData.products

    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june"
    ]

    const selectedMonth = ref(null)
    const selectedProduct = ref(null)

    return {
      products,
      months,
      selectedMonth,
      selectedProduct
    }

  }

}