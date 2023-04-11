<template>
  <section class="profile">

    <div class="profile__inner -edit" v-if="this.$store.state.user.editProfile">

      <img v-if="this.$store.state.user.icon" class="profile__icon" v-bind:src="this.$store.state.user.icon"  alt=""> 
      <label v-else class="profile__image" for="file_upload">
        <input class="profile__image__input" ref="imageInput" type="file" @change="uploadImage" />
      </label>

      <form class="profile__form" @submit.prevent="update" ref='form'>
        <div class="profile__list" v-for="(value, key) in $store.state.user.profile" :key="key">
          <label class="profile__list__label" :for="key" :class="`profile__list__${key}`">
            {{ key === 'name' ? 'ユーザー名' : 'メールアドレス' }}
          </label>
          <input class="profile__list__input" :class="`profile__list__input-${key}`" :id="key" :placeholder="value"
            v-model="updatedValues[key]" :type="key === 'mail' ? 'email' : 'text'" />
        </div>
        <button class="profile__btn -save" type="submit">保存して更新</button>
      </form>

      <div class="profile__inner">

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.profile {
  margin: 8px;
}

.profile__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.profile__icon {
  max-width: 108px;
  margin: 0 auto;
  border-radius: 9999px;
}

.profile__image {
  @include NM_dent;
  align-items: center;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  height: 108px;
  width: 108px;
}

.profile__image__input {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.profile__form {
  width: 100%;
  text-align: center;
}

.profile__list {
  text-align: center;
}

.profile__list__label,
.profile__list__input {
  display: block;
  margin: 0 auto;
}

.profile__list__label {
  margin-top: 24px;
  color: #121212;
}

.profile__list__input {
  color: #121212;
  @include NM_dent;
  border-radius: 16px;
  padding: 8px 0;
  text-align: center;
  margin-top: 16px;
  min-width: calc(338px / 2);
}

.profile__btn {
  @include NM_convex;
  border-radius: 10px;
  color: #121212;
  padding: 8px 32px;
  margin: 48px auto 0;
}
</style>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ProfilePage',

  data() {
    return {
      pageName: 'プロフィール',
      updatedValues: {
      },
    };
  },
  created() {
    this.$store.commit("common/inputPageName", 'プロフィール')
    console.log(this.$store.state.user.icon)
  },
  methods: {
    async update() {
      await this.$store.dispatch('user/update', this.updatedValues)
      this.updatedValues = {
        name: '',
        mail: '',
      };
    },
    
    ...mapActions('user', ['uploadImage']),
    async uploadImage() {
      const imageFile = this.$refs.imageInput.files[0]

      if (imageFile) {
        // ログインしているユーザーのUIDを取得
        const uid = this.$store.state.user.uid

        // 画像をアップロードするアクションを呼び出す
        await this.$store.dispatch('user/uploadIconImage', { uid, imageFile })
      }
      // console.log(this.$store.state.user.icon)
    },
  },
}
</script>
