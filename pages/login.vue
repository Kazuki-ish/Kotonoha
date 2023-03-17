<template>
  <section class="login">
    <p>ログインページ</p>
  </section>
</template>

<style lang="scss" scoped>
.c-vertical {
  .big {
    font-size: 2rem;
  }
}
</style>

<script>
export default {
  name: 'LoginPage',

  data() {
    return {
      pageName: '',
      isScroll: true
    };
  },
  created() {
    this.$store.commit("common/inputPageName", 'ログイン')
  },
  mounted() {//DOMマウント時に実行

  },
}
</script>
