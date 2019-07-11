<template>


  <b-container fluid>
    <div class="row">
      <div class="col-6 col-md-3">
        <input type="text" class="form-control" placeholder="Mesto" v-model="mesto">
      </div>
      <div class="col-6 col-md-3">
        <input type="text" class="form-control" placeholder="Broj stanovnika" v-model="broj_stanovnika">
      </div>
      <div class="col-6 col-md-3">
        <input type="text" class="form-control" placeholder="PTT broj" v-model="ptt_broj">
      </div>
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" v-on:click="addTableRow()">Dodaj mesto</button>
      </div>
    </div> 

    <br>
    <br>


    <!-- User Interface controls -->
    <b-row class="row justify-content-between"> 
      <b-col md="5" class="my-1">
        <b-form-group label-cols-sm="1" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="4" class="my-1">
        <b-form-group label-cols-sm="1" label="Sort" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- none --</option>
            </b-form-select>
            <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
              <option :value="false">Asc</option> <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
<br>
    

    <!-- Main table element -->
    <b-table
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      @filtered="onFiltered"
    >

      <template slot="actions">


        <!--@click="info(row.item, row.index, $event.target)"
        @click.native="deleteQuote(index)"
        
        metoda
                    deleteQuote(index) {
                this.$emit('quoteDeleted', index);
            }-->

        <b-button size="sm" v-on:click="deleteRow(items.id)" class="mr-1">
          Obriši mesto
        </b-button>





<!--         <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button> -->
      </template>

<!--       <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template> -->
    </b-table>

    <b-row class="row justify-content-between">
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
      
      <b-col md="4" class="my-1">
        <b-form-group label-cols-sm="6" label="Per page" class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    
    <br>

    <!-- Info modal -->
<!--     <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal> -->
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { mesto: 'Beograd', broj_stanovnika: 1344844, ptt_broj: 11000},
          { mesto: 'Novi Sad', broj_stanovnika: 296157, ptt_broj: 21000},
          { mesto: 'Niš', broj_stanovnika: 202208, ptt_broj: 18000},
          { mesto: 'Kragujevac', broj_stanovnika: 150835, ptt_broj: 34000},
          { mesto: 'Leskovac', broj_stanovnika: 110240, ptt_broj: 16000},
          { mesto: 'Subotica', broj_stanovnika: 105681, ptt_broj: 24000},
          { mesto: 'Zrenjanin', broj_stanovnika: 76511, ptt_broj: 23000},
          { mesto: 'Pančevo', broj_stanovnika: 76203, ptt_broj: 26000},
          { mesto: 'Čačak', broj_stanovnika: 73331, ptt_broj: 32000},
          { mesto: 'Novi Pazar', broj_stanovnika: 66175, ptt_broj: 36300},
          { mesto: 'Kraljevo', broj_stanovnika: 64175, ptt_broj: 36000},
          { mesto: 'Smederevo', broj_stanovnika: 64175, ptt_broj: 11300}
        ],
        fields: [
          { key: 'mesto', label: 'Mesto', sortable: true},
          { key: 'broj_stanovnika', label: 'Broj stanovnika', sortable: true, class: 'text-center' },
          { key: 'ptt_broj', label: 'PTT broj' },
          { key: 'actions', label: 'Actions' }
        ],
                types: [
          'text',
          'password',
          'email'
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        sortBy: null,
        sortDesc: false,
        filter: null
        /* ,
        infoModal: {
          id: 'info-modal',
          title: '',
          content: '' 
        }*/
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
/*       info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      }, */
/*       resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      }, */
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      deleteRow(id) {
        if(confirm("Da li ste sigurni da želite da izbrišete mesto?"))
                this.items.splice(id, 1);
        },
      addTableRow : function() {
        this.fields.push()
        }
    }
  }
</script>