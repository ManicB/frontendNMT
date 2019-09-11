<template>
  <div>
    <Title name="Artikli" />
    <v-card>
      <v-card-title>

        <v-flex col-md-3 offset-md-9> 
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Pretraga"
            single-line
            hide-details
          >
          </v-text-field>
        </v-flex>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
      >
        <template v-slot:items="props">
          <td class="text-xs-center">{{ props.item.ArtikalID }}</td>
          <td class="text-xs-center">{{ props.item.Cena }}</td>
          <td class="text-xs-center">{{ props.item.DatumPromene }}</td>
          <td class="text-xs-center">{{ props.item.Pakovanje }}</td>
          <td class="text-xs-center">{{ props.item.Proizvodjac }}</td>
          <td class="text-xs-center">{{ props.item.Proizvod }}</td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  import Title from "@/components/Title/Title";
  import axios from "axios";
  import moment from 'moment'

  export default {
    name: "Artikli",
    components: {
      Title
    },
    data: () => ({
        search: '',
        headers: [
          { text: 'ID', align: 'center', value: 'ArtikalID' },
          { text: 'Cena', align: 'center', value: 'Cena' },
          { text: 'Datum promene cene', align: 'center', value: 'DatumPromene' },
          { text: 'Pakovanje', align: 'center', value: 'Pakovanje' },
          { text: 'Proizvođač', align: 'center', value: 'Proizvodjac' },
          { text: 'Proizvod', align: 'center', value: 'Proizvod' },
        ],
        items: []
      }),
    
    created() {
        this.initialize();
    },
    
    methods: {
      initialize() {
        axios.get('http://localhost:3000/artikal')
          .then(response => {
            this.items = response.data.recordset;
            console.log(response);
          })
          .catch(error => console.log(error)) 
        }
    }
  };
</script>