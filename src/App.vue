<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { IDatabase } from './interfaces/IDatabase';
import { IElectronAPI } from './interfaces/IElectronAPI';

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

const Database = reactive<IDatabase>({
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
  Database.Config.DarkMode = !Database.Config.DarkMode
  document.documentElement.classList.remove("dark");
  if(Database.Config.DarkMode){
    document.documentElement.classList.add("dark")
  }
  
}


onUpdateDatabase(){
  window.electronAPI.updateDatabase([Database]);
}

onMounted(() => {
  
})

</script>

<template>
   <nav className="bg-blue-300 flex justify-between w-100 px-4 py-2">
        <button @click="onClickButtonShowSettingsMenu()">
          <img src="./assets/cog.svg" alt="" />
        </button>
        <button @click="onClickButtonToggleDarkMode()">
          <img v-if="Database.Config.DarkMode" src="./assets/moon.svg" alt="no moon" />
          <img v-else src="./assets/sun.svg" alt="no moon" />
        </button>
      </nav>
      <div className="dark:text-white flex flex-col gap-4 p-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat pariatur earum quas odio deserunt cum veritatis, accusantium, doloremque nemo modi voluptates dolor nulla aliquam, eius ab! Reiciendis sed hic rem.
      </div>
</template>

<style scoped>
</style>
