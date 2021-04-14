<template>
  <v-container fluid>
    <v-row
      no-gutters
      align="center"
      justify="center"
    >
      <v-col  lg=9 sm=12>
        
        <v-sheet 
          rounded
          class="LPb ColTwo"  
          color="#ffe4c4" 
          elevation="3"
        >
          <span class="ColTwo">This is all, or at least mostly, placeholder. 
            What changes depends on whether or not I decide to actually handle accounts and how I do it. 
            If I just use google login api then this is pretty much gone. 
          </span>

          <v-form
            v-model="isValid"
          >


            <v-text-field
              label="your@email.com"
              class="ColTwo"
              tabindex=1

              v-model="email"
              required
              :rules="emailRules"
            > </v-text-field>

            <v-text-field
              label="Username"
              class="ColTwo"
              tabindex=1

              v-model="username"
              required
              :rules="[v => !!v || 'Username is required']"
            > </v-text-field>

            <span> password fields temporarily disabled </span>
            <v-text-field
              label="password"
              class="ColTwo"
              tabindex=1
              disabled
            > </v-text-field>

            <v-text-field
              label="confirm password"
              class="ColTwo"
              tabindex=1
              disabled
            > </v-text-field>

            <v-btn
                class = "ColTwo"
                color=success
                :disabled="!isValid"
                @click="submitAccountCreation"
            >
                create account
            </v-btn>
          </v-form>

        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name:"CreatePage",

    data: function () {
      return {
        isValid: true,
        email: null,
        username: null,
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 5) || 'Password must have 5+ characters'
        ],
      }
    },

    methods: {
      submitAccountCreation() {
        console.log("new user info:",this.email, this.username)
        this.$store.dispatch('Users/UserCreate', {email:this.email, username: this.username})
        this.$router.push("/")
      },
    }
  }
    
</script>

<style scoped>
  
  .LPb {
    font-weight: bold;    
    text-align:center;
    word-wrap: break-word;
  }

  .ba{
    margin-bottom:20px;
  }

  
</style>