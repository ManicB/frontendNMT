<template>
  <div>
    <Title name="Status" />
    
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
              <td class="text-xs-center">{{ props.item.proizvod }}</td>
              <td class="text-xs-center">{{ props.item.proizvodjac }}</td>
              <td class="text-xs-center">{{ props.item.vrstaProizvoda }}</td>
              <td class="text-xs-center">{{ props.item.mera }}</td>
              <td class="text-xs-center">{{ props.item.pakovanje }}</td>
              <td class="text-xs-center">{{ props.item.cena }}</td>
              <td class="text-xs-center">{{ props.item.kolicina }}</td>
              <td class="text-xs-center">{{ props.item.datumKreiranja }}</td>
            </template>
          </v-data-table>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Overi</v-btn>
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
        <td class="text-xs-center">{{ props.item.brojNarudzbenice }}</td>
        <td class="text-xs-center">{{ props.item.datumKreiranja }}</td>
        <td class="text-xs-center">{{ props.item.kupac }}</td>
        <td class="text-xs-center">{{ props.item.dobavljac }}</td>
        <td class="text-xs-center">{{ props.item.brojKataloga }}</td>
        <td class="text-xs-center">{{ props.item.status }}</td>
        <td class="justify-center layout px-0">
          <v-btn color="primary" dark class="mb-2" @click="authenticate(props.item)">Overi</v-btn>
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
    name: "Status",
    components: {
    Title
  },
    data: () => ({
      dialog: false,
              search: '',

      headers: [
        { text: 'Broj narudžbenice',value: 'brojNarudzbenice', class: "text-center"},
        { text: 'Datum kreiranja', value: 'datumKreiranja', class: "text-center"},
        { text: 'Kupac', value: 'kupac', class: "text-center"},
        { text: 'Dobavljač', value: 'dobavljac', class: "text-center"},
        { text: 'Broj kataloga', value: 'brojKataloga', class: "text-center"},
        { text: 'Status', value: 'status', class: "text-center"},
        { text: '', value: 'naziv', sortable: false, class: "text-center"}
      ],
      catalogs: [],
      editedIndex: -1,


      headersDialog: [
        { text: 'Proizvod', value: 'proizvod', class: "text-center"},
        { text: 'Proizvođač', value: 'proizvodjac', class: "text-center"},
        { text: 'Vrsta proizvoda', value: 'vrstaProizvoda', class: "text-center"},
        { text: 'Mera', value: 'mera', class: "text-center"},
        { text: 'Pakovanje', value: 'pakovanje', class: "text-center"},
        { text: 'Cena', value: 'cena', class: "text-center"},
        { text: 'Količina', value: 'kolicina', class: "text-center"},
        { text: 'Datum kreiranja', value: 'datumKreiranja', class: "text-center"}
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
        this.catalogs = [
          {
            brojNarudzbenice: 'Frozen Yogurt',
            datumKreiranja: 159,
            kupac: 6.0,
            dobavljac: 24,
            brojKataloga: 4.0,
            status: 'asda'
          },
          {
            brojNarudzbenice: 'Ice cream sandwich',
            datumKreiranja: 237,
            kupac: 9.0,
            dobavljac: 37,
            brojKataloga: 4.3,
            status: 'asda'
          },
          {
            brojNarudzbenice: 'Eclair',
            datumKreiranja: 262,
            kupac: 16.0,
            dobavljac: 23,
            brojKataloga: 6.0,
            status: 'asda'
          },
          {
            brojNarudzbenice: 'Cupcake',
            datumKreiranja: 305,
            kupac: 3.7,
            dobavljac: 67,
            brojKataloga: 4.3,
            status: 'asda'
          },
          {
            brojNarudzbenice: 'Gingerbread',
            datumKreiranja: 356,
            kupac: 16.0,
            dobavljac: 49,
            brojKataloga: 3.9,
            status: 'asda'
          },
          {
            brojNarudzbenice: 'Jelly bean',
            datumKreiranja: 375,
            kupac: 0.0,
            dobavljac: 94,
            brojKataloga: 0.0,
            status: 'asda'
          },
          {
            brojNarudzbenice: 'Lollipop',
            datumKreiranja: 392,
            kupac: 0.2,
            dobavljac: 98,
            brojKataloga: 0,
            status: 'asda'
          },
          {
            brojNarudzbenice: 'Honeycomb',
            datumKreiranja: 408,
            kupac: 3.2,
            dobavljac: 87,
            brojKataloga: 6.5,
            status: 'asda'
          },
          {
            brojNarudzbenice: 'Donut',
            datumKreiranja: 452,
            kupac: 25.0,
            dobavljac: 51,
            brojKataloga: 4.9,
            status: 'asda'
          },
          {
            brojNarudzbenice: 'KitKat',
            datumKreiranja: 518,
            kupac: 26.0,
            dobavljac: 65,
            brojKataloga: 7,
            status: 'asda'
          }
        ],

        this.catalogsDialog = [
          {
            proizvod: 'blabalbalb',
            proizvodjac: 'daffad',
            vrstaProizvoda: 'daffad',
            mera: '24',
            pakovanje: '4.0',
            cena: 'asdas',
            kolicina: 'asdas',
            datumKreiranja: 'asda'
          },
          {
            proizvod: 'blablablab',
            proizvodjac: 'sfdgdasf',
            vrstaProizvoda: 'daffad',
            mera: '24',
            pakovanje: '4.0',
            cena: 'asdas',
            kolicina: 'asdas',
            datumKreiranja: 'asda'
          },
          {
            proizvod: 'blalbalba',
            proizvodjac: 'dasfdaf',
            vrstaProizvoda: 'daffad',
            mera: '24',
            pakovanje: '4.0',
            cena: 'asdas',
            kolicina: 'asdas',
            datumKreiranja: 'asda'
          },
          {
            proizvod: 'vlavlala',
            proizvodjac: 'dfsafad',
            vrstaProizvoda: 'daffad',
            mera: '24',
            pakovanje: '4.0',
            cena: 'asdas',
            kolicina: 'asdas',
            datumKreiranja: 'asda'
          },
          {
            proizvod: 'sadasdasda',
            proizvodjac: 'fsgsdffs',
            vrstaProizvoda: 'daffad',
            mera: '24',
            pakovanje: '4.0',
            cena: 'asdas',
            kolicina: 'asdas',
            datumKreiranja: 'asda'
          },
          {
            proizvod: 'afdasdasd',
            proizvodjac: 'sdbsd',
            vrstaProizvoda: 'daffad',
            mera: '24',
            pakovanje: '4.0',
            cena: 'asdas',
            kolicina: 'asdas',
            datumKreiranja: 'asda'
          },
          {
            proizvod: 'sdgfdasbgvbbd',
            proizvodjac: 'sdvsdf',
            vrstaProizvoda: 'daffad',
            mera: '24',
            pakovanje: '4.0',
            cena: 'asdas',
            kolicina: 'asdas',
            datumKreiranja: 'asda'
          },
          {
            proizvod: 'bbgzbbbhtbthj',
            proizvodjac: 'acfsv',
            vrstaProizvoda: 'daffad',
            mera: '24',
            pakovanje: '4.0',
            cena: 'asdas',
            kolicina: 'asdas',
            datumKreiranja: 'asda'
          },
          {
            proizvod: 'dgsdgdsafads',
            proizvodjac: 'adfsda',
            vrstaProizvoda: 'daffad',
            mera: '24',
            pakovanje: '4.0',
            cena: 'asdas',
            kolicina: 'asdas',
            datumKreiranja: 'asda'
          },
          {
            proizvod: 'sdgdsdsgv',
            proizvodjac: 'asdas',
            vrstaProizvoda: 'daffad',
            mera: '24',
            pakovanje: '4.0',
            cena: 'asdas',
            kolicina: 'asdas',
            datumKreiranja: 'asda'
          }
        ]
      },

      authenticate (itemsDialog) {
        this.dialog = true
      },

      close () {
        this.dialog = false
      },
    }
  }
</script>