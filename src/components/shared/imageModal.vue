<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-img
          v-if="src.length > 0"
          :src="src"
          aspect-ratio="1"
          class="grey lighten-2"
        />
        <v-card-actions
          text-center
        >
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false; imageDownload(); reset();"
          >
            Download
          </v-btn>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false; reset();"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';
import { downloadFile } from '../../service/download.service'
  export default {
      props: {
        image: {
            type: String,
            default: '',
            required: true,            
            } 
    },
     data: () => ({
        src: '',
        dialog: false,
    }),      
    watch: {
        image(val) {
          const reader = new FileReader();
          reader.readAsDataURL(val.data);
          reader.onload = () => {
          this.src = reader.result;
          this.dialog = true;   
          };
        },        
    },
    methods: {
          ...mapActions(['reset']),
          imageDownload() {
            downloadFile(this.image) 
          },
    },
  }
</script>

  