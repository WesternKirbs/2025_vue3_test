import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 可以不用做到local storage

export const useFavoriteStore = defineStore('favoriteStore', () => {
  const list = ref([])

  // 任務8. 加入我的最愛
  const addFav = (target) => {
    const targetID = target && target.id? target.id : null
    if (!targetID) return

    const idx = list.value.findIndex(fav => fav.id == targetID)
    if (idx == -1){
      list.value.push(target)
    }
  }
  const isEmpty = computed(() => {return list.value.length == 0})
  // 移除我的最愛
  const removeFav = (target) => {
    const targetID = target && target.id? target.id : null
    if (!targetID) return

    const idx = list.value.findIndex(fav => fav.id == targetID)
    if (idx >= 0){
      list.value.splice(idx, 1)
    }
  }

  return { list, isEmpty, addFav, removeFav }
})
