<template>
  <div>
    <Title name="Mesto" />

    <v-toolbar flat color="white">
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Dodaj mesto</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.MestoID" label="ID"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Naziv" label="Naziv"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.BrojStanovnika" label="Broj stanovnika"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.PttBroj" label="PTT broj"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Odustani</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Sacuvaj</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-spacer></v-spacer>

      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Pretraga"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    </v-toolbar>

    <v-data-table :headers="headers" :items="items" :search="search" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.MestoID }}</td>
        <td class="text-xs-center">{{ props.item.Naziv }}</td>
        <td class="text-xs-center">{{ props.item.BrojStanovnika }}</td>
        <td class="text-xs-center">{{ props.item.PttBroj }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Title from "@/components/Title/Title";
import axios from "axios";

export default {
  name: "Mesto",
  components: {
    Title
  },
  data: () => ({
    dialog: false,
    search: "",

    headers: [
      { text: "ID", value: "MestoID", class: "text-center" },
      { text: "Naziv", value: "Naziv", class: "text-center" },
      {
        text: "Broj stanovnika",
        value: "BrojStanovnika",
        class: "text-center"
      },
      { text: "PTT broj", value: "PttBroj", class: "text-center" },
      { text: "Actions", value: "naziv", sortable: false, class: "text-center" }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      MestoID: 0,
      Naziv: "",
      BrojStanovnika: 0,
      PttBroj: 0
    },
    defaultItem: {
      MestoID: 0,
      Naziv: "",
      BrojStanovnika: 0,
      PttBroj: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Dodaj mesto" : "Izmeni mesto";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get("http://localhost:3000/mesto")
        .then(response => {
          this.items = response.data.recordset;
          console.log(response);
        })
        .catch(error => console.log(error));
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const meestoID = item.MestoID;
      console.log(meestoID);
      axios.delete(
        "http://localhost:3000/mesto/obrisiMesto",
        {headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        data:{
          id: item.MestoID
        }}
      );
/*       axios
        .delete("http://localhost:3000/mesto/obrisiMesto", item)
        .then(resonse => {
          console.log(resonse);
        }); */
      /*       const index = this.items.indexOf(item);
      confirm("Da li ste sigurni da želite da izbrišete mesto?") &&
        this.items.splice(index, 1); */
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      const data = {
        MestoID: this.editedItem.MestoID,
        Naziv: this.editedItem.Naziv,
        BrojStanovnika: this.editedItem.BrojStanovnika,
        PttBroj: this.editedItem.PttBroj
      };
      console.log(data);
      axios
        .post("http://localhost:3000/mesto/dodajMesto", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(resp => console.log(resp))
        .catch(error => console.log(error)),
        this.close();
        window.location.reload();
    }
  }
};
</script>