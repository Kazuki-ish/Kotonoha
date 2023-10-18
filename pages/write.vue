<template>
  <section class="write">
    <div class="c-vertical-inner">
      <div class="c-vertical">
        <p class="write__txt -title">タイトル</p>
        <p class="write__input -title c-vertical-input" ref="novelTitle" @input="updateTitle" contenteditable="true"></p>
        <p class="write__txt -body">本文</p>
        <p class="write__input -body c-vertical-input" ref="novelText" @input="updateBody" contenteditable="true"></p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.write__input {
  @include NM_dent_anim;
  border-radius: 24px;
  margin-top: 8px;
  min-height: 50%;
  padding: 8px 8px 8px 80vw;

  -webkit-user-select: text;
  user-select: text;

  &.-title {
    padding-left: 8px;
  }

}
.write__txt {
  display: block;
  margin-left: 0.5rem;

  &.-body {
    margin-right: 2rem;
  }
}
</style>

<script>
export default {
  name: 'WritePage',
  //https://qiita.com/oreo/items/da1c0f4ac946c48a8f49
  //縦書きコンテントエディタブル

  head() {
        return {
            title: this.pageName,
        };
  },

  data() {
    return {
      pageName: '作品を書く',
      name: '',
    }
  },
  async fetch() {
    this.$store.commit('novels/setSlug', null);
  },
  created() {
    this.$store.commit("common/inputPageName", '作品を書く')
    this.$store.commit('user/setMode', this.$route.name)
  },
  mounted() {
    this.$store.dispatch('common/changeIsMounted', true); 
    // console.log(this.$store.state.common.isMounted)
  },
  methods: {
    logText() {
      this.text = this.$refs.novelText.innerText
      if (this.text) {
        // console.log(this.text);
      }
      else {
        // console.log('text is nothing');
      }
    },
    addBr(txt) {
      const rawTxt = txt;
      const escapedTxt = rawTxt
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
      let formattedTxt = escapedTxt.replace(/(?:\r\n|\r|\n)/g, "<br>");

      // 最後の <br> タグを削除
      if (formattedTxt.endsWith("<br>")) {
        formattedTxt = formattedTxt.slice(0, -4);
      }

      return formattedTxt;
    },
    updateTitle() {
      const fmTxt = this.addBr(this.$refs.novelTitle.innerText);
      // console.log(fmTxt);
      this.$store.commit("novels/setTitle", fmTxt);
    },
    updateBody() {
      const fmTxt = this.addBr(this.$refs.novelText.innerText);
      // console.log(fmTxt);
      this.$store.commit("novels/setBody", fmTxt);
    },
  }
}
</script>
