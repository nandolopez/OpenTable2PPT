<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IDatabase } from './interfaces/IDatabase';
import { IElectronAPI } from './interfaces/IElectronAPI';

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

let Database = ref<IDatabase>({
  Config: {
    DarkMode: undefined,
    LastConfig: undefined,
    Language: 'EN'
  },
  ExcelConfigs: []
})



const onClickButtonShowSettingsMenu = () => {
}
const onClickButtonToggleDarkMode = () => {
  Database.value.Config.DarkMode = !Database.value.Config.DarkMode
  document.documentElement.classList.remove("dark");
  if (Database.value.Config.DarkMode) {
    document.documentElement.classList.add("dark")
  }
  onUpdateDatabase()
}


const onUpdateDatabase = () => {
  window.electronAPI.updateDatabase([JSON.stringify(Database.value)]);
}

onMounted(() => {
  window.electronAPI.getDatabase()
    .then((e: IDatabase) => {
      Database.value = { ...e }
      if(e.Config.DarkMode) document.documentElement.classList.add("dark")
    })
})

</script>

<template>
  <nav className="bg-blue-300 flex justify-between w-100 px-4 py-2">
    <button @click="onClickButtonShowSettingsMenu()">
      <img src="./assets/cog.svg" alt="" />
    </button>
    <button @click="onClickButtonToggleDarkMode()">
      <img v-if="Database.Config.DarkMode == true" src="./assets/moon.svg" alt="Lightmode" />
      <img v-else src="./assets/sun.svg" alt="Darkmode" />
    </button>
  </nav>
  <div className="dark:text-white flex flex-col gap-4 p-3">
    {{ Database.Config.DarkMode }}

    <br>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat pariatur earum quas odio deserunt cum veritatis,
    accusantium, doloremque nemo modi voluptates dolor nulla aliquam, eius ab! Reiciendis sed hic rem.
  </div>
</template>

<style scoped></style>
