<template>
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
        <button class="btn btn-outline-secondary" type="button" @click.prevent="newQuote">Dodaj mesto</button>
      </div>
    </div> 
</template>
<script>
export default {
    
}
</script>
<style>

</style>


