<template>
  <div>
    <Title name="Katalozi" />
    
    <v-toolbar flat color="white">
      <v-dialog v-model="dialog" max-width="1000px">

        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-data-table
            :headers="headersDialog"
            :items="catalogsDialog"
            hide-actions
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item.Proizvod.NazivProizvoda }}</td>
              <td class="text-xs-center">{{ props.item.Proizvodjac.NazivProizvodjaca }}</td>
              <td class="text-xs-center">{{ props.item.VrstaProizvoda }}</td>
              <td class="text-xs-center">{{ props.item.JedinicaMere }}</td>
              <td class="text-xs-center">{{ props.item.Pakovanje }}</td>
              <td class="text-xs-center">{{ props.item.Cena }}</td>
              <td class="text-xs-center">{{ props.item.Kolicina }}</td>
            </template>
          </v-data-table>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Zatvori</v-btn>
          </v-card-actions>
        </v-card>
        
      </v-dialog><v-spacer></v-spacer>

      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Pretraga"
          single-line
          hide-details>
        </v-text-field>
      </v-card-title>

    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="catalogs"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.KatalogID }}</td>
        <td class="text-xs-center">{{ props.item.BrojKataloga }}</td>
        <td class="text-xs-center">{{ props.item.DatumIzdavanja }}</td>
        <td class="text-xs-center">{{ props.item.DatumVaziOd }}</td>
        <td class="text-xs-center">{{ props.item.DatumVaziDo }}</td>
        <td class="text-xs-center">{{ props.item.Dobavljac }}</td>
        <td class="justify-center layout px-0">
          <v-btn color="primary" dark class="mb-2" @click="detailView(props.item)">Detaljnije</v-btn>
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
    name: "Katalozi",
    components: {
    Title
  },
    data: () => ({
      dialog: false,
              search: '',

      headers: [
        { text: 'ID',value: 'KatalogID', class: "text-center"},
        { text: 'Broj kataloga', value: 'BrojKataloga', class: "text-center"},
        { text: 'Datum izdavanja', value: 'DatumIzdavanja', class: "text-center"},
        { text: 'Važi od', value: 'DatumVaziOd', class: "text-center"},
        { text: 'Važi do', value: 'DatumVaziDo', class: "text-center"},
        { text: 'Dobavljač', value: 'Dobavljac', class: "text-center"},
        { text: '', value: 'naziv', sortable: false, class: "text-center"}
      ],
      catalogs: [],
      editedIndex: -1,


      headersDialog: [
        { text: 'Proizvod', value: 'Proizvod.NazivProizvoda', class: "text-center"},
        { text: 'Proizvođač', value: 'Proizvođač.NazivProizvođača', class: "text-center"},
        { text: 'Vrsta proizvoda', value: 'VrstaProizvoda', class: "text-center"},
        { text: 'Mera', value: 'JedinicaMere', class: "text-center"},
        { text: 'Pakovanje', value: 'Pakovanje', class: "text-center"},
        { text: 'Cena', value: 'Cena', class: "text-center"},
        { text: 'Količina', value: 'Količina', class: "text-center"}
      ],
      catalogsDialog: [],
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
        axios.get('http://localhost:3000/katalog')
          .then(response => {
            this.catalogs = response.data.recordset;
            console.log(response);
          })
          .catch(error => console.log(error))
      },
      
      detailView (itemsDialog) {
        this.dialog = true;
        
      
        axios.get('http://localhost:3000/katalogDetaljnije')
          .then(response => {
            this.catalogsDialog = response.data.recordset;
            console.log(response);
          })
          .catch(error => console.log(error))
      
      },

      close () {
        this.dialog = false
      },
    }
  }
</script>