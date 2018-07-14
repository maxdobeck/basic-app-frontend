<template>
  <v-layout row justify-center id="container">
    <v-flex>
      <v-dialog
      @keydown.esc="nameModal = false"
      v-model="nameModal"
      max-width="290"
      >
        <v-card id="modal">
          <h3>New Name:</h3>
          <v-text-field
          autofocus
          v-model="newName">
          </v-text-field>
          <v-btn @click="saveName">Save</v-btn><v-btn @click.stop="nameModal = false; newName = '';">Cancel</v-btn>
        </v-card>
      </v-dialog>

      <v-card id="memberCard">
        <h3>Name</h3>
        <div id="body">
          {{memberName}}
          <v-btn @click.stop="nameModal = true">Edit</v-btn>
        </div>
      </v-card>

      <v-dialog
        @keydown.esc="emailModal = false"
        v-model="emailModal"
        max-width="290"
        >
        <v-card id="modal">
          <h3>New Email:</h3>
          <v-text-field
          autofocus
          v-model="newEmail1">
          </v-text-field>
          <h3>Confirm New Email:</h3>
          <v-text-field
          v-model="newEmail2">
          </v-text-field>
          <v-btn @click="saveEmail">Save</v-btn><v-btn @click.stop="emailModal = false; newEmail1 = ''; newEmail2 = ''">Cancel</v-btn>
        </v-card>
      </v-dialog>

      <v-card id="memberCard">
        <h3>Email</h3>
        {{memberEmail}}
        <v-btn @click.stop="emailModal = true">Edit</v-btn>
      </v-card>

      <v-dialog
        @keydown.esc="delModal = false"
        v-model="delModal"
        max-width="500"
      >
        <v-card id="modal">
          <h3>DELETE MY ACCOUNT PERMANENTLY</h3>
          <v-btn color="error">Delete My Account Forever</v-btn> <v-btn color="success" @click.stop="delModal = false; delConfirm = '';">Nevermind!</v-btn>
        </v-card>
      </v-dialog>

      <v-btn id="delBtn"
        flat
        color="error"
        small
        @click.stop="delModal = true"
      >Delete My Account</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
let api // Need to find a way to turn all this into a function
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') {
  api = process.env.DEV_API
} else if (process.env.NODE_ENV === 'test') {
  api = process.env.TEST_API
} else {
  api = process.env.PROD_API
}
const apiURL = api + 'members' + '/'
export default {
  data () {
    return {
      errors: [],
      nameModal: false,
      newName: '',
      emailModal: false,
      newEmail1: '',
      newEmail2: '',
      delModal: false
    }
  },
  name: 'Settings',
  methods: {
    saveName () {
      let self = this
      fetch(apiURL + this.memberId + '/name', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'X-CSRF-Token': this.token
        },
        body: JSON.stringify({newName: this.newName})
      })
        .then(response => {
          this.nameModal = false
          return response.json()
        })
        .then(response => {
          if (response['Status'] !== 'OK') {
            self.errors = response['Message']
          } else {
            this.setMemberName(response['Message'][0])
            this.newName = ''
          }
        })
    },
    saveEmail () {
      let self = this
      fetch(apiURL + this.memberId + '/email', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'X-CSRF-Token': this.token
        },
        body: JSON.stringify({newEmail1: this.newEmail1, newEmail2: this.newEmail2})
      })
        .then(response => {
          this.emailModal = false
          return response.json()
        })
        .then(response => {
          if (response['Status'] !== 'OK') {
            self.errors = response['Message']
          } else {
            this.setMemberEmail(response['Message'][0])
            this.newEmail1 = ''
            this.newEmail2 = ''
          }
        })
    },
    setMemberName (memberName) {
      this.$store.dispatch('setMemberName', memberName)
    },
    setMemberEmail (memberEmail) {
      this.$store.dispatch('setMemberEmail', memberEmail)
    }
  },
  computed: mapGetters({
    token: 'curCSRFToken',
    loggedIn: 'logInStatus',
    memberId: 'curMemberId',
    memberName: 'memberName',
    memberEmail: 'memberEmail'
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #container {
    margin-top: 2%;
    margin-left: 30%;
  }
  #memberCard {
    width: 35%;
    min-width: 250px;
    padding: 2%;
    margin-top: 1%;
  }
  #modal {
    padding: 10px;
  }
  #delBtn {
    margin-left: 0px;
    margin-top: 1%;
  }
</style>
