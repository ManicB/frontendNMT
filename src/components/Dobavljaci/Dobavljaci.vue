<template>
  <div>
    <Title name="Dobavljači" />
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
          <td class="text-xs-center">{{ props.item.DobavljacID }}</td>
          <td class="text-xs-center">{{ props.item.Naziv }}</td>
          <td class="text-xs-center">{{ props.item.Logo }}</td>
          <td class="text-xs-center">{{ props.item.Adresa }}</td>
          <td class="text-xs-center">{{ props.item.Sediste }}</td>
          <td class="text-xs-center">{{ props.item.MaticniBroj }}</td>
          <td class="text-xs-center">{{ props.item.PIB }}</td>
          <td class="text-xs-center">{{ props.item.TekuciRacun }}</td>
          <td class="text-xs-center">{{ props.item.Telefon }}</td>
          <td class="text-xs-center">{{ props.item.Sajt }}</td>
          <td class="text-xs-center">{{ props.item.E_posta }}</td>
          <td class="text-xs-center">{{ props.item.Fax }}</td>
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

  export default {
    name: "Dobavljaci",
    components: {
      Title
    },
    data: () => ({
        search: '',
        headers: [
          { text: 'ID', align: 'center', value: 'DobavljacID' },
          { text: 'Naziv', align: 'center', value: 'Naziv' },
          { text: 'Logo', align: 'center', value: 'Logo' },
          { text: 'Adresa', align: 'center', value: 'Adresa' },
          { text: 'Sedište', align: 'center', value: 'Sediste' },
          { text: 'Matični broj', align: 'center', value: 'MaticniBroj' },
          { text: 'PIB', align: 'center', value: 'PIB' },
          { text: 'Tekući račun', align: 'center', value: 'TekuciRacun' },
          { text: 'Telefon', align: 'center', value: 'Telefon' },
          { text: 'Sajt', align: 'center', value: 'Sajt' },
          { text: 'E-pošta', align: 'center', value: 'E_posta' },
          { text: 'Fax', align: 'center', value: 'Fax' }
        ],
        items: []
    }),
    
    created() {
      this.initialize();
    },

    methods: {
      initialize() {
          axios.get('http://localhost:3000/dobavljac')
          .then(response => {
            this.items = response.data.recordset;
            console.log(response);
          })
          .catch(error => console.log(error)) 
      },
    }
  };
</script>