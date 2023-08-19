<template>
  <section class="c-vertical-inner -top" id="js-c-scroll">
    <UiBooklist />
  </section>
</template>

<script>
export default {
  name: 'TopPage',

  data() {
    return {
      pageName: 'ホーム',
      isScroll: true,
    }
  },

  created() {
        this.$store.commit("common/inputPageName", '')
  },
}
</script>