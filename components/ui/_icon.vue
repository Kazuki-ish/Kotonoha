<template>
    <div class="icon" :class="$route.name">
        <img v-if="this.$store.state.user.icon" class="icon__none" v-bind:src="this.$store.state.user.icon" alt="">
        <label v-else class="icon__image c-plus-wrapper" for="file_upload">
            <input class="icon__image__input" ref="imageInput" type="file" @change="uploadImage" />
            <span></span><span></span>
        </label>
    </div>
</template>

<style lang="scss">
.icon {
    @include NM_convex_op;
    border-radius: 9999px;
    width: 108px;
    height: 108px;
    border-radius: 9999px;
    margin-right: 12px;
}
.icon__none {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border-radius: 9999px;
}

.icon__image {
    @include NM_dent;
    align-items: center;
    border-radius: 9999px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    height: 108px;
    width: 108px;
}

.icon__image__input {
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
}
</style>

<script>
import { mapActions } from 'vuex';

export default {
    methods: {
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
    }
}
</script>