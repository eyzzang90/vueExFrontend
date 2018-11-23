<template>
  <section id="one" class="main style1">
    <router-view/>
  </section>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        chartValues: [
          {val: 24, color: '#94c0cf'},
          {val: 32, color: '#a17ccf'},
          {val: 66, color: '#3bcfb1'},
          {val: 1, color: '#5c68cf'},
          {val: 28, color: '#f8f9b6'},
          {val: 60, color: '#cf7384'},
        ]
      }
    },
    // Randomly selects a value to randomly increment or decrement every 16 ms.
    // Not really important, just demonstrates that reactivity still works.
    mounted() {
      let dir = 1;
      let selectedVal = Math.floor(Math.random() * this.chartValues.length);

      setInterval(() => {
        if (Math.random() > 0.995) dir *= -1;
        if (Math.random() > 0.99) selectedVal = Math.floor(Math.random() * this.chartValues.length);

        this.chartValues[selectedVal].val = Math.min(Math.max(this.chartValues[selectedVal].val + dir * 0.5, 0), 100);
      }, 16);

    }
  }
</script>

<style>

</style>
