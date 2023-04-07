<template>
  <section class="my">
    <p>mypage</p>
    <form @submit.prevent="update" ref='form'>
      <div v-for="(value, key) in $store.state.user.profile" :key="key">
        <label :for="key">{{ key }}</label>
        <input
          :id="key"
          :placeholder="value"
          v-model="updatedValues[key]"
          :type="key === 'mail' ? 'email' : 'text'"
        />
      </div>
      <button type="submit">保存して更新</button>
    </form>

  </section>
</template>

<script>
export default {
  name: 'MyPage',

  data() {
    return {
      pageName: 'プロフィール',
      updatedValues: {
      },
    };
  },
  created () {
    this.$store.commit("common/inputPageName", 'プロフィール' )
  },
  computed: {
    profile() {
      return this.$store.state.user.profile
    }
  },
  methods: {
    async update() {
      await this.$store.dispatch('user/update', this.updatedValues)
      this.updatedValues = {
        name: '',
        mail: '',
        icon: '',
      };
    },
  },
}
</script>
