<template>
    <div class="bookmark-arrow">
        <button class="bookmark-arrow__btn"
            :class="{ '-first': isFirst == true, '-is-active': isActive == true }"
        @click="moveBookmarks($event)">
            <img class="bookmark-arrow__ico" src="~/assets/imgs/ico/arrow_line.png">
        </button>
    </div>
</template>

<style lang="scss" scoped>
.bookmark-arrow {
    @include cubic_ease(box-shadow, $time: .2s);
    @include NM_convex_anim;
    border-radius: calc(21 / 780 * 100vw);

    button {
        padding: .5rem .5rem .5rem .75rem;
    }

    .-first {
        padding: .5rem .75rem .5rem .5rem;
    }

    .-first &__ico {
        transform: rotate(180deg);
    }
    .-first.-is-active {
        @include NM_normal_anim;
    }

    &__ico {
        display: block;
        height: 1.5rem;
    }

    &.-favorited {
        @include NM_normal_anim;
    }
    &.-is-active {
        @include NM_normal_anim;
    }
}
</style>

<script>
export default {
    data() {
        return {
            isActive : false,
        };
    },
    props: {
        isFirst: Boolean
    },

    mounted() {

    },
    watch: {
    // Vuexのステートを監視
    '$store.state.common.scrollAmount': {
      handler(newVal) {
        if (this.$store.state.novels.bookmarks.includes(newVal)) {
            this.$store.commit('novels/setCurrentBookmark', true)
            // console.log('')
        }
        else {
            this.$store.commit('novels/setCurrentBookmark', false)
            // console.log(this.$store.state.novels.bookmarks)
        }
      },
      immediate: true, // コンポーネントがマウントされた時点で即座にチェックを行う
    },
  },
    methods: {
        findClosestIndexes() {
            const array = [...this.$store.state.novels.bookmarks];
            const target = this.$store.state.common.scrollAmount;

            // console.log(array)

            if (!array.length) return [null, null];

            let leftIndex = null;
            let rightIndex = null;
            let leftDiff = Infinity; // 左側の差を無限大で初期化
            let rightDiff = Infinity; // 右側の差を無限大で初期化

            for (let i = 0; i < array.length; i++) {
                const diff = Math.abs(array[i] - target);

                if (array[i] < target && diff < leftDiff) {
                    leftIndex = i;
                    leftDiff = diff;
                } else if (array[i] > target && diff < rightDiff) {
                    rightIndex = i;
                    rightDiff = diff;
                }
            }
            // console.log(leftIndex)
            return [leftIndex, rightIndex];
        },

        moveBookmarks(event) {
            // 右側を基準にして定義
            const [leftIndex, rightIndex] = this.findClosestIndexes();
            let closestIndex = [rightIndex]

            // console.log(event)

            if (!this.isFirst && rightIndex !== null) {
                // console.log(closestIndex)
                this.$store.dispatch('common/setBmIndex', closestIndex)
                this.$scrollSet()
            }
            else  if (this.isFirst) {
                closestIndex = [leftIndex]
                if (leftIndex !== null) {
                    // console.log(closestIndex)
                    this.$store.dispatch('common/setBmIndex', closestIndex)
                    this.$scrollSet()
                }
            }
            // console.log(this.$store.state.common.setReadyBmIndex)
            // 必ずインデックスをクリアする
            console.log(this.$store.state.novels.bookmarks)
            this.$store.commit('common/clearReadyBmIndex')
        },
    },
    beforeUnmount() {
        this.$store.commit('novels/clearBookmarks')
    },
}

</script>