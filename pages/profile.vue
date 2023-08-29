<template>
  <section class="profile">

    <div class="profile__inner -edit" v-if="this.$store.state.user.editProfile">

      <UiIcon />

      <form class="profile__form" @submit.prevent="update" ref='form'>
        <div class="profile__list" v-for="(value, key) in $store.state.user.profile" :key="key">
          <label class="profile__list__label" :for="key" :class="`profile__list__${key}`">
            {{ key === 'name' ? '表示名' : 'メールアドレス' }}
          </label>
          <input class="profile__list__input" :class="`profile__list__input-${key}`" :id="key" :placeholder="value"
            v-model="updatedValues[key]" :type="key === 'mail' ? 'email' : 'text'" />
        </div>
        <button class="profile__btn -save" type="submit">保存して更新</button>
      </form>

      <button class="profile__btn -logout" @click="logOut">ログアウトする</button>

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
  margin-top: 18px;
  color: #121212;

}

.profile__list__input {
  color: #121212;
  @include NM_dent;
  border-radius: 0.75rem;
  padding: 8px 6px;
  text-align: center;
  margin-top: 0.725rem;
  min-width: 13rem;
}

.profile__btn {
  @include NM_convex;
  border-radius: 0.75rem;
  color: #121212;
  padding: 8px 1.725rem;
  margin: 2rem auto 0;
  min-width: 11rem;

  &.-save {
    margin-top: 4rem;
  }
}
</style>

<script>
import { update } from 'immutable';


export default {
  name: 'ProfilePage',

  data() {
    return {
      pageName: 'プロフィール',
      updatedValues: {
      },
    };
  },
  fetch () {
    this.update()
    this.$store.commit('user/setMode', this.$route.name)
  },
  created() {
    this.$store.commit("common/inputPageName", 'プロフィール')
    // console.log(this.$store.state.user.icon)
  },
  mounted() {
      this.$store.dispatch('common/changeIsMounted', true);
  },
  methods: {
    async logOut() {
      await this. $store.dispatch('user/logOut')
      this.$router.push('/');
    },
    async update() {

      if ( this.$store.state.user.uid === 'IqzNLCMUsagNOVaVxcJW2vG2nEn2') {
        this.$store.dispatch('common/setMessage', 'このユーザーの情報は変更できません')
        return
      }
      else{
        await this.$store.dispatch('user/update', this.updatedValues)
        this.updatedValues = {
          name: '',
          mail: '',
        };
      } 
    },
  },
  beforeDestroy() {
    this.$store.dispatch('common/changeIsMounted', false); 
  }
}
</script>
