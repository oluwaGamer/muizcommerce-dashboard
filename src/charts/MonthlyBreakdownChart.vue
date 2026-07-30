<template>

  <div class="chart-container">

    <Doughnut
      :data="chartData"
      :options="chartOptions"
      :plugins="[centerTextPlugin]"
    />

  </div>

</template>


<script setup>

import { computed } from 'vue'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

import { Doughnut } from 'vue-chartjs'


const props = defineProps({

  product: Object,
  month: String

})


// Register only the Doughnut chart basics
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)



// This plugin belongs ONLY to this chart
const centerTextPlugin = {

  id: 'centerText',

  beforeDraw(chart) {

    const { ctx, chartArea } = chart

    if (!chartArea) return


    const productName = props.product.productName

    const monthName = props.month.toUpperCase()


    ctx.save()


    ctx.textAlign = "center"
    ctx.textBaseline = "middle"


    ctx.font = "12px Arial"


    const x =
      (chartArea.left + chartArea.right) / 2


    const y =
      (chartArea.top + chartArea.bottom) / 2



    const words = productName.split(" ")


    const firstLine =
      words.slice(0, 2).join(" ")


    const secondLine =
      words.slice(2).join(" ")



    ctx.fillText(
      firstLine,
      x,
      y - 12
    )



    if (secondLine) {

      ctx.fillText(
        secondLine,
        x,
        y + 3
      )

    }



    ctx.font = "bold 12px Arial"


    ctx.fillText(
      monthName,
      x,
      y + 25
    )


    ctx.restore()

  }

}



const chartData = computed(() => {


  const report =
    props.product.monthlyReports[props.month]


  return {

    labels: [

      "Net Revenue",

      "Gross Profit",

      "Refunded Amount"

    ],


    datasets: [

      {

        label: "Financial Breakdown",


        data: [

          report.netRevenue,

          report.grossProfit,

          report.amountRefunded

        ],


        backgroundColor: [

          "#42A5F5",

          "#66BB6A",

          "#EF5350"

        ]

      }

    ]

  }

})



const chartOptions = {

  responsive: true,
  maintainAspectRatio: false
,
  plugins: {
    legend: {
      position: "bottom"
    }
  }
}


</script>