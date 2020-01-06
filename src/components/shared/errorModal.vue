<template>
  <v-row justify="center">
    <v-dialog
      v-model="errorDialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-actions
          text-center
        >
          <v-card-text>
            <div
              class="red--text"
              v-text="errorMessage"
            >
              ERROR MESSAGE
            </div>
          </v-card-text>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="reset();"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState, mapActions } from 'vuex';
  export default {
   computed: {
    ...mapState(['errorDialog','errorMessage'])
   },
   methods: {
     ...mapActions(['reset'])
   }
  }
</script>

  