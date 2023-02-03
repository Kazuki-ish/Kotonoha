<template>
  <main class="l-main">
    <LayoutsHeader />
    <div class="c-vertical-inner">
      <div class="c-vertical">
            <p class="writing c-vertical-input" ref="novelText" placeholder="入力ください" type="text" contenteditable="true">
            </p>
      </div>
    </div>
    <LayoutsFooter v-on:saveText="logText" />
  </main>
</template>

<style lang="scss" scoped>

.writing {
  @include NM_dent(1px, 12px);
  border-radius: 24px;
  min-height: 50%;
  padding:8px 8px 8px 80vw;

}
</style>

<script>
export default {
  name: 'WritePage',
  //https://qiita.com/oreo/items/da1c0f4ac946c48a8f49
  //縦書きコンテントエディタブル

  data() {
    return {
      name: '',
    }
  },
  mounted() {
  },
  methods:{
    logText() {
        console.log(this.$refs.novelText.innerText);
    }
  }
}
</script>
