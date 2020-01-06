<template>
  <v-app>
    <image-modal :image="imageResponse" />
    <error-modal />
    <v-container class="blue-grey darken-4 fill-height">
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
        >
          <div class="mx-4">
            <v-file-input
              v-model="file"
              :disabled="locked"
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Censo y'self"
              prepend-icon=""
              label="Select file"
            />
            <div class="my-2">
              <v-btn
                class="ml-1"
                :disabled="locked || file === null"
                outlined
                color="primary"
                @click="handleFileUpload()"
              >
                Upload!
              </v-btn>
            </div>       
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-card
            :loading="isUploading ? 'success' : ''"
            class="my-2"
            color="#37474F"
            dark
          >
            <v-card-title    
              :class="{'green--text' : isProcessing || isReceiving || isDone}"     
              class="title font-weight-light"
            >
              Uploading file...
            </v-card-title>
          </v-card>
          <v-card
            :loading="isProcessing ? 'success' : ''"
            class="my-2"
            color="#37474F"
            dark
          >
            <v-card-title 
              :class="{'green--text' : isReceiving || isDone}" 
              class="title font-weight-light"
            >
              Finding and censoring face ...
            </v-card-title>
          </v-card>
          <v-card
            class="my-2"
            color="#37474F"
            dark
            :loading="isReceiving ? 'success' : ''"
          >
            <v-card-title 
              :class="{'green--text' : isDone }" 
              class="title font-weight-light "
            >
              Image delivery ..
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import imageModal from '../shared/imageModal';
import errorModal from '../shared/errorModal';
import { uploadService } from '../../service/api.service';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Home',
  components: {
    imageModal,
    errorModal
  },
  data: () => ({
    rules: [
      value => !value || value.size < 5000000 || 'Image size should be less than 5 MB!',
    ],
    file: null,
    imageResponse: [],
  }),
  computed: {
    ...mapState(['isUploading', 'isProcessing', 'isReceiving', 'isDone', 'locked'])
  },
  created() {
  // wake up Heroku backend app
    uploadService.get()
  },
  methods: {
    ...mapActions(['sent','done']),
    handleFileUpload() {
      this.sent();
      const formData = new FormData();
      formData.append('inputImage', this.file);
      uploadService.post(formData).then((x) => {
        if(x !== undefined) {
          this.imageResponse = x;
          this.done();
        }      
      });
    },
  }, 
};
</script>
<style scoped>
.theme--dark.v-application {
 background: #263238;
}
</style>