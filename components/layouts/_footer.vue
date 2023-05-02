<template>
    <footer :class="{
        '-write': $route.name == 'write',
        '-novel-list': $route.name == 'myNovels',
        '-profile': $route.name == 'profile'
    }">
        <div class="button-list" v-if="$route.name == 'write'">
            <button @click="saveNovel">保存する</button>
        </div>
        <UiToggleMode />
    </footer>
</template>

<style lang="scss" scoped>

footer {
    bottom: 0;
    min-height: calc(120 / 1686 * 100vh);
    position: absolute;
    pointer-events: auto;
    width: 100%;

    &.-write {
        pointer-events: visible;
    }

    &.-profile {
        pointer-events: visible;
    }
}

.button-list {
    @include absolute(50%, -62px);
    color:black;
    display: flex;
    justify-content: center;
    margin-top: calc(12 / 1686 * 100vh);
    transform: translateX(-50%);

    button {
        @include NM_convex;
        border-radius: calc(21 / 780 * 100vw);
        padding: 8px;

        &:nth-child(n + 2) {
            margin-left: calc(94 / 780 * 100vw);
        }
    }
}

</style>

<script>
import { getRedirectResult } from '@firebase/auth';

export default {
    name: 'Footer',
    computed: {
    },
    methods: {
        async saveNovel() {
            const title = this.$store.state.novels.title;
            const body = this.$store.state.novels.body;
            // console.log(this.$store.state.novels.title)

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
        }
    },
}
</script>