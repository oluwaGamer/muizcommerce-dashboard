<template>

  <div class="sales-chart">

    <h2>
      Jan - June Sales Trend for {{ product.productName }}
    </h2>


    <Line
      :data="chartData"
      :options="chartOptions"
    />

  </div>

</template>


<script setup>

import { computed } from 'vue'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import { Line } from 'vue-chartjs'


ChartJS.register(

  CategoryScale,

  LinearScale,

  PointElement,

  LineElement,

  Title,

  Tooltip,

  Legend

)



const props = defineProps({

  product: Object

})



const chartData = computed(() => {


  return {

    labels: [

      "January",

      "February",

      "March",

      "April",

      "May",

      "June"

    ],


    datasets: [

      {

        label: `${props.product.productName} Sales Trend`,


        data: [

          props.product.monthlyReports.january.revenue,

          props.product.monthlyReports.february.revenue,

          props.product.monthlyReports.march.revenue,

          props.product.monthlyReports.april.revenue,

          props.product.monthlyReports.may.revenue,

          props.product.monthlyReports.june.revenue

        ]

      }

    ]

  }

})



const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom"
    },
    tooltip: {
      callbacks: {
        label(context) {
          return " €" + context.raw.toLocaleString()
        }
      }
    }
  }
}


</script>