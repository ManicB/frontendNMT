<template>
  <div>
    <Title name="Kupac" />
    
    <v-toolbar flat color="white">
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Dodaj kupca</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.KupacID" label="ID kupca"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Naziv" label="Naziv"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Logo" label="Logo"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Adresa" label="Adresa"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.MaticniBroj" label="Matični broj"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.E_posta" label="E-pošta"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Fax" label="Fax"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Sediste" label="Sedište"></v-text-field>
                </v-flex>
                <v-avatar>
                  <input type='file' onchange="readURL(this);" />
                  <img
                    src="http://placehold.it/47" 
                    alt="logo image"
                  >
                </v-avatar>
    
                    
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Odustani</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Sačuvaj</v-btn>
          </v-card-actions>
        </v-card>
        
      </v-dialog><v-spacer></v-spacer>
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
    <v-data-table
      :headers="headers"
      :items="customers"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.KupacID }}</td>
        <td class="text-xs-center">{{ props.item.Naziv }}</td>
        <td class="text-xs-center">{{ props.item.Logo }}</td>
        <td class="text-xs-center">{{ props.item.Adresa }}</td>
        <td class="text-xs-center">{{ props.item.MaticniBroj }}</td>
        <td class="text-xs-center">{{ props.item.E_posta }}</td>
        <td class="text-xs-center">{{ props.item.Fax }}</td>
        <td class="text-xs-center">{{ props.item.Sediste }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
       
      </template>
      
      <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
      </template>

    </v-data-table>

  </div>
  
</template>

<script>
import Title from "@/components/Title/Title";

import axios from "axios";

  export default {
    name: "Kupac",
    components: {
    Title
  },
    data: () => ({
      dialog: false,
              search: '',

      headers: [
        { text: 'ID',value: 'KupacID', class: "text-center"},
        { text: 'Naziv', value: 'Naziv', class: "text-center"},
        { text: 'Logo', value: 'Logo', class: "text-center"},
        { text: 'Adresa kupca', value: 'Adresa', class: "text-center"},
        { text: 'Matični broj', value: 'MatičniBroj', class: "text-center"},
        { text: 'E-pošta', value: 'E_pošta', class: "text-center"},
        { text: 'Fax', value: 'Fax', class: "text-center"},
        { text: 'Sedište', value: 'Sedište', class: "text-center"},
        { text: 'Actions', value: 'naziv', sortable: false, class: "text-center"},
      ],
      customers: [],
      editedIndex: -1,
      editedItem: {
        nazivKupca: '',
        adresa: '',
        maticniBroj: 0,
        ePosta: 0,
        fax: 0
      },
      defaultItem: {
        nazivKupca: '',
        adresa: '',
        maticniBroj: 0,
        ePosta: 0,
        fax: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Dodaj kupca' : 'Izmeni kupca'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        axios
          .get("http://localhost:3000/kupac")
          .then(response => {
            this.customers = response.data.recordset;
            console.log(response);
          })
        .catch(error => console.log(error));
    },

      editItem (item) {
        this.editedIndex = this.customers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.customers.indexOf(item)
        confirm('Da li ste sigurni da želite da izbrišete kupca?') && this.customers.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.customers[this.editedIndex], this.editedItem)
        } else {
          this.customers.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>