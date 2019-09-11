<template>
  <div>
    <Title name="Kupac" />
    <v-card>
      <v-data-table :headers="headers" :items="customers" :search="search" class="elevation-1">
        <template v-slot:items="props">
          <td class="text-xs-center">{{ props.item.KupacID }}</td>
          <td class="text-xs-center">{{ props.item.Naziv }}</td>
          <td class="text-xs-center">{{ props.item.Logo }}</td>
          <td class="text-xs-center">{{ props.item.Adresa }}</td>
          <td class="text-xs-center">{{ props.item.MaticniBroj }}</td>
          <td class="text-xs-center">{{ props.item.E_posta }}</td>
          <td class="text-xs-center">{{ props.item.Fax }}</td>
          <td class="text-xs-center">{{ props.item.Sediste }}</td>
        </template>

        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </template>
      </v-data-table>
    </v-card>
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
    search: "",

    headers: [
      { text: "ID", value: "KupacID", class: "text-center" },
      { text: "Naziv", value: "Naziv", class: "text-center" },
      { text: "Logo", value: "Logo", class: "text-center" },
      { text: "Adresa kupca", value: "Adresa", class: "text-center" },
      { text: "Matični broj", value: "MatičniBroj", class: "text-center" },
      { text: "E-pošta", value: "E_pošta", class: "text-center" },
      { text: "Fax", value: "Fax", class: "text-center" },
      { text: "Sedište", value: "Sedište", class: "text-center" }
    ],
    customers: []
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get("http://localhost:3000/kupac")
        .then(response => {
          this.customers = response.data.recordset;
          console.log(response);
        })
        .catch(error => console.log(error));
    }
  }
};
</script>