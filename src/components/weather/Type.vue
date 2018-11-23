<template>
  <div>
    <!-- template refs:: https://speckyboy.com/open-source-css-javascript-select-box-snippets/   -->
    <div class="container">
      <div class="control">
        <h1>시</h1>
        <div class="select">
          <select v-model="topCode" id="city">
            <option disabled value="">선택해주세요</option>
            <option v-for="(item, index) in topCodes" :value="item.code">{{item.value}}</option>
          </select>
          <div class="select__arrow"></div>
        </div>
      </div>
      <div class="control" v-if="topCode != ''">
        <h1>구</h1>
        <div class="select">
          <select v-model="mdlCode" id="country">
            <option disabled value="">선택해주세요</option>
            <option v-for="(item, index) in mdlCodes" :value="item.code">{{item.value}}</option>
          </select>
          <div class="select__arrow"></div>
        </div>
      </div>
      <div class="control" v-if="mdlCode != ''">
        <h1>동</h1>
        <div class="select">
          <select v-model="leafCode" id="village">
            <option disabled value="">선택해주세요</option>
            <option v-for="(item, index) in leafCodes" :value="item.code">{{item.value}}</option>
          </select>
          <div class="select__arrow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "type",
    data() {
      let topCode = '';
      let mdlCode = '';
      let leafCode = '';
      leafCode = this.$cookie.get('_leafCode');
      if(leafCode){
        topCode = leafCode.substr(0,2);
        mdlCode = leafCode.substr(0,5);
      }else{
        leafCode = '';
      }
      return {
        topCode: topCode,
        mdlCode: mdlCode,
        leafCode: leafCode,
        topCodes: [],
        mdlCodes: [],
        leafCodes: [],
        mdlName: '',
        city: '',
        country: '',
        village: ''
      }
    },
    watch: {
      //값이 변경될 때마다 실행
      topCode: function () {
        this.getMdlCode();
        this.mdlCode = '';
        this.leafCode = '';
        this.city = $('#city').find(':selected').text();
      },
      mdlCode: function () {
        this.getLeafCode();
        this.leafCode = '';
        this.city = $('#city').find(':selected').text();
        this.mdlName = $('#country').find(':selected').text();
        this.country = $('#country').find(':selected').text();
        this.emitMdlName();
      },
      leafCode : function(){
        this.city = $('#city').find(':selected').text();
        this.country = $('#country').find(':selected').text();
        this.village = $('#village').find(':selected').text();
        this.emitLeafCode();
      }

    },
    methods: {
      emitMdlName: function(){
        this.$emit('takeMdlName', this.mdlName);
      },

      getMdlCode: function () {
        this.$http.get('/api/weather/mdlCode?topCode=' + this.topCode)
          .then((response) => {
            let data = response.data;
            this.mdlCodes = [];
            for (let key of Object.keys(data)) {
              this.mdlCodes.push(data[key]);
            }
          }).catch((error) => {
          if (error) throw error;
          console.error(error);
        });
      },
      getLeafCode: function () {
        this.$http.get('/api/weather/leafCode?mdlCode=' + this.mdlCode)
          .then((response) => {
            let data = response.data;
            this.leafCodes = [];
            for (let key of Object.keys(data)) {
              this.leafCodes.push(data[key]);
            }
          }).catch((error) => {
          if (error) throw error;
          console.error(error);
        });
      },
      emitLeafCode: function() {
        this.$emit('takeLeafCode', this.leafCode);
        this.$emit('takeCity', this.city);
        this.$emit('takeCountry', this.country);
        this.$emit('takeVillage', this.village);
        this.$cookie.set('_leafCode', this.leafCode, 7);                                //expire 7days
        this.$cookie.set('_wCity', this.city+'|'+this.country+'|'+this.village, 7);    //expire 7days
      }
    },
    mounted() {
      this.$http.get('/api/weather/city')
      // this.$http.get('/api/weather/topCode')
        .then((response) => {
          //console.log(response.data)
          let data = response.data;
          this.topCodes = [];
          for (let key of Object.keys(data)) {
            this.topCodes.push(data[key]);
          }
          //console.log(this.codes)
        }).catch((error) => {
        if (error) throw error;
        console.error(error);
      });
      if(this.mdlCode){
        this.getMdlCode();
      }
      if(this.leafCode){
        this.getLeafCode();
      }
    }
  }
</script>

<style scoped>
  html,
  body {
    height: 100%;
  }

  body {
    background: #e6e6e6;
    font-family: 'Source Sans Pro', sans-serif;
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-family: 'Alegreya Sans', sans-serif;
    font-weight: 300;
    margin-top: 0;
  }

  .control-group {
    display: inline-block;
    vertical-align: top;
    background: #fff;
    text-align: left;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 200px;
    height: 210px;
    margin: 10px;
  }

  .control {
    display: block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 15px;
    /*cursor: pointer;*/
  }

  .control input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  .control__indicator {
    position: absolute;
    top: 0px;
    left: 0;
    height: 16px;
    width: 16px;
    background: #fff;
    border: 1px solid #ccc;
    /*
      .control:hover input:not([disabled]):checked ~ &,
      .control input:checked:focus ~ &
        border-color: #666
        */
  }

  .control--checkbox .control__indicator {
    border-radius: 3px;
  }

  .control--radio .control__indicator {
    border-radius: 50%;
  }

  .control:hover input:not([disabled]) ~ .control__indicator,
  .control input:focus ~ .control__indicator {
    border-color: #666;
  }

  .control input:checked ~ .control__indicator {
    background: #fff;
  }

  .control input:disabled ~ .control__indicator {
    background: #e6e6e6;
    opacity: 0.6;
    pointer-events: none;
  }

  .control__indicator:after {
    content: '';
    position: absolute;
    display: none;
  }

  .control input:checked ~ .control__indicator:after {
    display: block;
  }

  .control--checkbox .control__indicator:after {
    left: 5px;
    top: 0px;
    width: 5px;
    height: 12px;
    border: solid #34bb92;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .control--checkbox input:disabled ~ .control__indicator:after {
    border-color: #7b7b7b;
  }

  .control--radio .control__indicator:after {
    left: 5px;
    top: 5px;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background: #34bb92;
  }

  .control--radio input:disabled ~ .control__indicator:after {
    background: #7b7b7b;
  }

  .select {
    position: relative;
    display: inline-block;
    margin-bottom: 15px;
    width: 100%;
  }

  .select select {
    display: inline-block;
    width: 100%;
    cursor: pointer;
    padding: 10px 15px;
    outline: 0;
    border: 0;
    border-radius: 0;
    background: #e6e6e6;
    color: #7b7b7b;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .select select::-ms-expand {
    display: none;
  }

  .select select:hover,
  .select select:focus {
    color: #000;
    background: #ccc;
  }

  .select select:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .select__arrow {
    position: absolute;
    top: 16px;
    right: 15px;
    width: 0;
    height: 0;
    pointer-events: none;
    border-style: solid;
    border-width: 8px 5px 0 5px;
    border-color: #7b7b7b transparent transparent transparent;
  }

  .select select:hover ~ .select__arrow,
  .select select:focus ~ .select__arrow {
    border-top-color: #000;
  }

  .select select:disabled ~ .select__arrow {
    border-top-color: #ccc;
  }
</style>
