<script setup>
import { ref, onMounted } from "vue";
import FavList from "./components/FavList.vue";
import { computed } from "vue";
// 任務1. 引入FavList組件到App.vue的aside中

// 如果使用pinia
import { useFavoriteStore } from '@/stores/favorites'
const favoriteStore = useFavoriteStore()

// 任務2. 顯示專輯資料
// 目前畫面中僅呈現defaultData
// 請將資料替換成`public/albums.json`中的專輯資料
const defaultData = ref([]);
onMounted(() => {
  fetch("src/assets/albums.json")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      defaultData.value = json;
    });
});

// 任務3:開啟關閉側拉選單(收藏列表)
const asideToggle = ref(false);
const toggleAside = () => {
  asideToggle.value = !asideToggle.value;
};

// 任務4.專輯資料可以被input搜尋
const search = ref("");
const filteredData = computed(() => {
  return search.value == ""
    ? defaultData.value
    : defaultData.value.filter((album) => album.name.trim().toLowerCase().includes(search.value.trim() ));
});


// 任務5.加入我的收藏
// 不限定方式，如果不知道怎麼使用pinia可以用其他方式
// const addFav = (item) => {
//   console.log(item);
// };
</script>

<template>
  <header>
    <div>
      <input type="search" v-model="search" />
      <button @click="toggleAside">
        <img src="~@/assets/heartRed.png" alt="收藏列表" />
      </button>
    </div>
  </header>

  <main>
    <div v-for="album in filteredData" class="card">
      <img :src="album.images" />
      <div class="card_body">
        <h6>{{ album.name }}</h6>
        <p>{{ album.artists }}</p>
      </div>
      <div class="card_footer">
        <button class="favoriteBtn" @click="favoriteStore.addFav(album)">
          <img src="~@/assets/heartBlack.png" alt="收藏專輯" />
        </button>
      </div>
    </div>
  </main>

  <aside :class="{ open: asideToggle }">
    <!-- 收藏清單 -->
    <FavList></FavList>
  </aside>
</template>

<style lang="scss">
button {
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  padding: 0.2rem;
  img {
    width: 100%;
  }
}
</style>
<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  z-index: 2;
  background-color: #f9f9f9;
  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    max-width: 57rem;
    margin: auto;
    padding: 0.5rem;
    box-sizing: border-box;
  }
}
main {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 0.5rem;
  max-width: 57rem;
  margin: 3rem auto;
  padding: 0.5rem;
  box-sizing: border-box;
}
aside {
  width: 20rem;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  overflow-y: scroll;
  z-index: 1;
  top: 0;
  right: -20rem;

  background-color: #2a2a2b;
  color: #f9f9f9;

  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition: right 1s;

  &.open {
    right: 0;
  }
}

.card {
  width: 12rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #1a1a1a;
  color: #f9f9f9;

  &_body {
    height: 3.5rem;
  }
  &_footer {
    text-align: right;
    .favoriteBtn {
      background-color: #f9f9f9;
      filter: sepia(0);
      &:hover {
        filter: sepia(1);
      }
    }
  }
}
</style>
