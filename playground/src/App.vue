<template>
  <div>
    lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate!
  </div>
</template>
<script lang="ts" setup>
console.log('Hello Bazi!')
import { Bazi } from 'bazi'
const bazi = new Bazi('1989-08-16T18:00')
console.log(bazi)
</script>
