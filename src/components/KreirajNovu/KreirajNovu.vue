<template>
  <div>
    <Title name="Narudžbenice: Kreiraj novu" />
    
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
                  <v-text-field v-model="editedItem.nazivMesta" label="Naziv"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.brojStanovnika" label="Broj stanovnika"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.pttBroj" label="PTT broj"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Odustani</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Sačuvaj</v-btn>
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
        >
        </v-text-field>
      </v-card-title>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.nazivMesta }}</td>
        <td class="text-xs-center">{{ props.item.brojStanovnika }}</td>
        <td class="text-xs-center">{{ props.item.pttBroj }}</td>
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

  export default {
    name: "Kreiraj novu",
    components: {
    Title
  },
    data: () => ({
      dialog: false,
      search: '',

      headers: [
        { text: 'Naziv',value: 'nazivMesta', class: "text-center"},
        { text: 'Broj stanovnika', value: 'brojStanovnika', class: "text-center"},
        { text: 'PTT broj', value: 'pttBroj', class: "text-center"},
        { text: 'Actions', value: 'naziv', sortable: false, class: "text-center"}
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        nazivMesta: '',
        brojStanovnika: 0,
        pttBroj: 0
      },
      defaultItem: {
        nazivMesta: '',
        brojStanovnika: 0,
        pttBroj: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Dodaj mesto' : 'Izmeni mesto'
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
        fetch('http://localhost:3000/mesto', {method: 'GET'})
          .then((response) => response.json())
          .then((myData) => {
            this.items = myData
          });
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Da li ste sigurni da želite da izbrišete mesto?') && this.items.splice(index, 1)
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
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>