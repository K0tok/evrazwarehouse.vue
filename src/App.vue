<template>
  <div id="app">
    <div class="header">
      <img class="logo1" src="../image/Logo-evraz.png" >
      <div class="findBlock">
        <input placeholder="Поиск..." class="findInput">
        <div class="findButton">
          <div>НАЙТИ</div>
        </div>
      </div>
    </div>
    <div class="mainPage">
      <div class="backButton">
        <img class="icon1" src="../image/Group 1.png" >
      </div>
      <div class="way">
        
      </div>
      <div class="headline">
        ВЫБЕРИТЕ СКЛАД
      </div>
      <div
       class="addWarehouse"
       @click="isWarehouse = true"
       >
        <div>Добавить</div>
      </div>
      <div
      class="Menu"
      v-if="isWarehouse === true"
      >
        <div>Введите название:</div>
        <input class="MenuInput1">
        <div>Введите Город:</div>
        <input class="MenuInput2" list="cities" @input="findCities">
        <datalist id="cities">
          <option v-for="(city, index) in cities" :key="index">
            {{ city }}
          </option>
        </datalist>
      </div>
      <div class="Warehouses">
        <div>
          <div 
           class="Warehouse"
           >

             <div>
                <img class="icon2" src="../image/edit.png">
             </div>
              <div class="WarehouseName">
               Новый склад#1
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "App",
  data() {
    return {
      isWarehouse: false,
      cities: [],
    };
  },
  methods: {
    addFolder() {
        const warehouse = {};
        console.log(warehouse);
        this.warehouses.push(warehouse);
    },
    async findCities(event) {
      const city = event.target.value;
      const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
      const reqData = {
        query: city,
        from_bound: {
          value: "city"
        },
        to_bound: {
          value: "city",
        },
      }
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token ' + '8b282a0d8ec6d7cbed844d08ddf01072eea00c20',
        }
      };
      try {
        if (city.length > 2) {
          this.cities = [];
          const response = await axios.post(url, reqData, options)
          if ('data' in response) {
            const data = response.data
            if ('suggestions' in data) {
              for (const suggestion of data.suggestions) {
                  this.cities.push(suggestion.value);
              }
            }
          }
        }
      }
      catch(error) {
        console.error(error)
      }
    }
  }
  
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100vh;
  display: flex;
}
.header {
  width: 100%;
  height: 50px;
  position: fixed;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
}
.logo1 {
  height: 64px;
  margin-left: 5%;
}
.findBlock {
  width: 20%;
  height: 32px;
  margin: 0 64px 0 auto;
  display: flex;
  align-items: center;
}
.findInput {
  height: 32px;
  border-width: 1px 0px 1px 1px;
  border-style: solid;
  border-color: #8a8a8a;
  width: 120%;
}
.findButton {
  color: #ffffff;
  height: 36px;
  width: 50%;
  background-color: #ee7918;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.mainPage {
  margin-top: 50px;
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
}
.backButton {
  position: absolute;
  top: 85px;
  left: 2%;
  width: 50px;
  height: 50px;
}
.icon1 {
  width: 100%;
}
.headline {
  width: 100%;
  font-size: 200%;
  align-self: center;
  text-align: center;
  border-bottom: 2px solid black;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.addWarehouse {
  width: 9%;
  height: 45px;
  margin: 10px 0 0 auto;
  display: flex;
  align-items: center;
  background-color: #ee7918;
  justify-content: center;
  color: #ffffff;
  font-size: 22px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  border: 3px solid #d9d9d9;
  border-radius: 5px;
}
.Warehouses {
}
.Warehouse {
  display: flex;
  margin-top: 20px;
  background-color: #d9d9d9;
  width: 350px;
  height: 350px;
  border: 4px solid #d9d9d9;
  border-radius: 5px;
  flex-direction: column;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 45px;
  justify-content: center;
  align-items: center;
}
.Warehouse:hover {
  margin-top: 20px;
  background-color: rgba(238, 121, 24, 0.5);
  width: 350px;
  height: 350px;
  border: 4px solid #d9d9d9;
  border-radius: 5px;
  flex-direction: column;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 45px;
}
.icon2 {
  width: 20%;
  margin: 0 0 20px auto;
}
.WarehouseName {
}
.MenuInput1 {
  width: 70%;
  height: 20px;
  margin-bottom: 50px;
}
.MenuInput2 {
  width: 70%;
  height: 20px;
}
.Menu {
  display: flex;
  width: 30%;
  height: 200px;
  background-color: #d9d9d9;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 210px;
  right: 50px;
  border: 1px solid black;
  border-radius: 5px;
  position: absolute;
}
</style>

