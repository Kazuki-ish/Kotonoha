<template>
  <section class="write">
    <div class="c-vertical-inner">
      <div class="c-vertical">
        <p class="writing c-vertical-input" ref="novelTitle" placeholder="タイトルを入力" contenteditable="true"></p>
        <p class="writing c-vertical-input" ref="novelText" placeholder="入力ください" contenteditable="true"></p>
      </div>
    </div>
    <button @click="saveNovel">Save Novel</button>
  </section>
</template>

<style lang="scss" scoped>

.writing {
  @include NM_dent_anim;
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
      pageName: '作品を書く',
      name: '',
    }
  },
  created () {
    this.$store.commit("common/inputPageName", '作品を書く' )
  },
  mounted(){
  },
  methods:{
    logText() {
      this.text = this.$refs.novelText.innerText
      if (this.text){
        console.log(this.text);
      }
      else{
        console.log('text is nothing');
      }
    },
    async saveNovel() {
      const title = this.$refs.novelTitle.innerText;
      const body = this.$refs.novelText.innerText;

      if (!title || !body) {
        console.log("Title or body is missing");
        return;
      }

      await this.$store.dispatch("novels/addNovel", {
        uid: this.$store.state.user.uid,
        title,
        body
      });

      console.log("Novel saved successfully");
    },
  }
}
</script>
