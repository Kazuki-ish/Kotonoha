<template>
  <section class="my">
    <p>mypage</p>
  </section>
</template>

<script>
export default {
  name: 'MyPage',

  data() {
    return {
      pageName: 'プロフィール'
    };
  },
  created () {
    this.$store.commit("common/inputPageName", 'プロフィール' )
  },
}
</script>
