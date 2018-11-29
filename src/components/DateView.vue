<template>
  <section :class="date.container">
    <p :class="date.item">
      <b :class="date.itemPrimary">{{ DATES.day }}</b>

      <span :class="[date.itemInner, date.itemAdd]">
        <b>{{ DATES.month }}</b>
        <span>{{ DATES.year }}</span>
      </span>
    </p>

    <b :class="date.itemAdd">{{ DATES.dayOfWeek }}</b>
  </section>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'date-view',

    computed: mapState([
      'DATES',
    ])
  }
</script>

<style lang="postcss" module="date">
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .item {
    display: flex;
    align-items: center;
  }

  .itemInner {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }

  .itemPrimary {
    font-size: 76px;
  }

  .itemAdd {
    font-size: 26px;
  }
</style>