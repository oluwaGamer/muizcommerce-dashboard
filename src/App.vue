<template>

  <div class="dashboard">

    <h1 class="text-align-center margin-top-10 margin-bottom-0">
      MuizCommerce GmbH Dashboard
    </h1>


    <div class="flex flex-gap-30 flex-center margin-top-10">
      <div class="dropdown">
        <label>
          Select Month
        </label>


        <select v-model="selectedMonth">

          <option
            disabled
            value=""
          >
            Choose a month
          </option>


          <option
            v-for="month in months"
            :key="month"
            :value="month"
          >
            {{ month.charAt(0).toUpperCase() + month.slice(1) }}
          </option>

        </select>

      </div>
      <div
        class="dropdown"
        v-if="selectedMonth"
      >
        <label>
          Select Product
        </label>
        <select v-model="selectedProduct">

          <option
            disabled
            value=""
          >
            Choose a product
          </option>


          <option
            v-for="product in products"
            :key="product.productId"
            :value="product"
          >
            {{ product.productName }}
          </option>

        </select>
      </div>
    </div>

    <div
      class="product-card"
      v-if="selectedProduct && selectedMonth"
    >
      <div class="flex two-col-flex flex-center">
        <div>
          <h3>
            {{ selectedProduct.productName }}
          </h3>
          <p>
            Category:
            {{ selectedProduct.category }}
          </p>
          <p>
            Collection:
            {{ selectedProduct.collection }}
          </p>
          <hr>
          <h4>
            {{ selectedMonth }} Performance
          </h4>
          <p>
            Units Sold:
            {{ selectedProduct.monthlyReports[selectedMonth].unitsSold }}
          </p>
          <p>
            Revenue:
            €{{ selectedProduct.monthlyReports[selectedMonth].revenue }}
          </p>
          <p>
            Returns:
            {{ selectedProduct.monthlyReports[selectedMonth].returns }}
          </p>
          <p>
            Refunded:
            €{{ selectedProduct.monthlyReports[selectedMonth].amountRefunded }}
          </p>
          <p>
            Net Revenue:
            €{{ selectedProduct.monthlyReports[selectedMonth].netRevenue }}
          </p>
          <p>
            Available Stock:
            {{ selectedProduct.inventory.available }}
          </p>
          <p>
            Awaiting Delivery:
            {{ selectedProduct.inventory.awaitingDelivery }}
          </p>
        </div>

        <div>
          <MonthlyBreakdownChart
            :product="selectedProduct"
            :month="selectedMonth"
          />
        </div>
      </div>
    </div>

    <div class="margin-top-50">
      <SalesChart
        v-if="selectedProduct"
        :product="selectedProduct"
        />

    </div>


  </div>

</template>



<script>

  import SalesChart from './charts/SalesChart.vue'
  import MonthlyBreakdownChart from './charts/MonthlyBreakdownChart.vue'
  import productData from './dashboard.js'


  export default {

    ...productData,


    components: {

      SalesChart,

      MonthlyBreakdownChart

    }

  }

</script>



<style scoped src="./dashboard.css"></style>