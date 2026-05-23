<template>
  <div>
    lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate!
    <input type="datetime" v-model="birthday" />
    <pre>{{ bazi.chart }}</pre>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed }  from 'vue'
import { Bazi } from 'bazi'

const birthday = ref('1959-12-17 15:00')

const bazi = computed(() => {
  return new Bazi(birthday.value)
})

console.log(bazi.value)
</script>
