<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-img
       v-if="src.length > 0"
      :src="src"
      aspect-ratio="1"
      class="grey lighten-2"
      ></v-img>
        <v-card-actions
        text-center>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false; reset()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';
  export default {
      methods: {
          ...mapActions(['reset'])
      },
    data: () => ({
        src: '',
        dialog: false,
    }),
    props: {
        image: Object,
    },
    watch: {
        image(val) {
          const reader = new FileReader();
          reader.readAsDataURL(val);
          reader.onload = () => {
          this.src = reader.result;
          this.dialog = true;          
        };
        }
    }

  }
</script>

  