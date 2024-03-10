<script setup lang="ts">
import { reactive, ref } from 'vue';
import { IDatabase } from './interfaces/IDatabase';

const Datavase = reactive<IDatabase>({
  Config: {
    DarkMode: undefined,
    LastConfig: undefined,
    Language: 'EN'
  },
  ExcelConfigs: []
})

const onClickButtonShowSettingsMenu = () =>{
  
}
const onClickButtonToggleDarkMode = () =>{
  
}

onMounted(() => {
  
}),
</script>

<template>
   <nav className="bg-blue-300 flex justify-between w-100 px-4 py-2">
        <button @click="onClickButtonShowSettingsMenu()">
          <img src="./assets/cog.svg" alt="" />
        </button>
        <button @click="onClickButtonToggleDarkMode()">
          <img src="./assets/moon.svg" alt="no moon" />
          <img src="./assets/sun.svg" alt="no moon" />
        </button>
      </nav>

</template>

<style scoped>
</style>
