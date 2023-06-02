<template>
  <div id="app">
    <div class="header">
      <img class="logo1" src="../image/Logo-evraz.png" />
      <div class="findBlock">
        <input placeholder="Поиск..." class="findInput" />
        <div class="findButton">
          <div>НАЙТИ</div>
        </div>
      </div>
    </div>
    <div class="mainPage">
      <div class="backButton">
        <img class="icon1" src="../image/Group 1.png" />
      </div>
      <div class="way"></div>
      <div v-if="activePage === 'warehouses'" class="headline">
        ВЫБЕРИТЕ СКЛАД
      </div>
      <div v-if="activePage === 'rooms'" class="headline">
        ВЫБЕРИТЕ ПОМЕЩЕНИE
      </div>
      <div class="addWarehouse" @click="isWarehouseCreate = true">
        <div>Добавить</div>
      </div>
      <div class="Menu" v-if="isWarehouseCreate === true">
        <div style="font-size: 25px">Введите название:</div>
        <input v-model="activeName" class="MenuInput1" />
        <div v-if="activePage === 'warehouses'">
          <div style="font-size: 25px">Введите Город:</div>
          <input
            v-model="activeCity"
            class="MenuInput2"
            list="cities"
            @input="findCities"
          />
          <datalist id="cities">
            <option v-for="(city, index) in cities" :key="index">
              {{ city }}
            </option>
          </datalist>
        </div>
        <div
          @click="(isWarehouseCreate = false), addWarehouse()"
          class="ButAccept1"
        >
          Принять
        </div>
      </div>
      <div v-if="activePage === 'warehouses'" class="Warehouses">
        <div
          class="Warehouse"
          v-for="item in this.warehouses"
          :key="item.id"
          @click="changePage(activePage)"
        >
          <div>
            <div style="display: flex">
              <img class="icon2" src="../image/edit.png" />
            </div>
          </div>
          <div class="WarehouseName">Новый склад {{ item.id }}</div>
        </div>
      </div>
      <div>
        <div
          class="Room"
          v-for="item in this.rooms"
          :key="item.id"
          @click="changePage(activePage)"
        >
          <div>
            <div style="display: flex">
              <img class="icon2" src="../image/edit.png" />
            </div>
          </div>
          <div class="WarehouseName">Новый склад {{ item.id }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      isWarehouseCreate: false,
      cities: [],
      warehouses: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      rooms: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      racks: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      shelves: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      activeName: "",
      activePage: "warehouses",
      activeCity: "",
    };
  },
  methods: {
    addWarehouse() {
      const warehouse = {
        name: this.activeName,
        city: this.activeCity,
        id: new Date(),
      };
      console.log(warehouse);
      this.warehouses.push(warehouse);
    },
    async findCities(event) {
      const city = event.target.value;
      const url =
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
      const reqData = {
        query: city,
        from_bound: {
          value: "city",
        },
        to_bound: {
          value: "city",
        },
      };
      const options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + "8b282a0d8ec6d7cbed844d08ddf01072eea00c20",
        },
      };
      try {
        if (city.length > 2) {
          this.cities = [];
          const response = await axios.post(url, reqData, options);
          if ("data" in response) {
            const data = response.data;
            if ("suggestions" in data) {
              for (const suggestion of data.suggestions) {
                this.cities.push(suggestion.value);
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    changePage(oldPage) {
      if (oldPage === "warehouses") {
        this.activePage = "rooms";
      } else if (oldPage === "rooms") {
        this.activePage = "racks";
      } else if (oldPage === "racks") {
        this.activePage = "shelves";
      } else if (oldPage === "shelves") {
        this.activePage = "items";
      } else if (oldPage === "items") {
        this.activePage = "itemInf";
      }
    },
  },
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
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.Warehouse {
  display: flex;
  margin-top: 20px;
  background-color: #d9d9d9;
  width: 20%;
  height: 396px;
  border: 4px solid #d9d9d9;
  border-radius: 5px;
  flex-direction: column;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 45px;
  /* justify-content: center;
  align-items: center; */
  margin: 15px;
  box-shadow: 5px 5px 5px gray;
}
.WarehouseName {
  display: flex;
  justify-content: center;
  align-items: center;
}
.Warehouse:hover {
  margin-top: 20px;
  background-color: rgba(238, 121, 24, 0.5);
  width: 396px;
  height: 396px;
  border: 4px solid #d9d9d9;
  border-radius: 5px;
  flex-direction: column;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 45px;
  /* justify-content: center;
  align-items: center; */
  margin: 15px;
}
.icon2 {
  width: 10%;
  margin: 5px 5px 115px auto;
}
.MenuInput1 {
  width: 60%;
  height: 30px;
  margin-bottom: 50px;
  font-size: 20px;
}
.MenuInput2 {
  width: 60%;
  height: 30px;
  font-size: 20px;
}
.Menu {
  display: flex;
  width: 20%;
  height: 300px;
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
.ButAccept1 {
  font-size: 20px;
  color: white;
  display: flex;
  width: 35%;
  margin-top: 30px;
  background-color: #ee7918;
  height: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid black;
}
</style>

