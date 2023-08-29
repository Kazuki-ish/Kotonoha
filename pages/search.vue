<template>
  <section class="search">
    <p>searchpage</p>
  </section>
</template>

<script>
export default {
  name: 'SerchPage',

  data() {
    return {
      pageName: '探す',
    };
  },
  created () {
    this.$store.commit("common/inputPageName", '探す' )
  },
  beforeDestroy() {
    this.$store.commit('common/setIsMounted', false)
  },
}
</script>
