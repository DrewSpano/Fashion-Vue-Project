<template>
  <v-container fluid>
    <v-row
      no-gutters
      justify="center"
      align="center"
    >
      <v-col  lg=9 sm=12>
        <v-sheet 
          rounded
          class="LPb ColTwo"  
          color="#ffe4c4" 
          elevation="3"
        >
          <p class="ColTwo">Welcome to my website!</p>
          <p class="ColTwo">
            This website exists to help you spend money on things you don't need! 
            Specifically, Clothing! 
            How will it do that? check out below!
          </p>
          
        </v-sheet>

        <v-sheet 
          rounded
          class="LPb ColTwo"  
          color="#ffe4c4" 
          elevation="3"
        >
          <p class="ColTwo">
            Keeping track of every single brand and web store that you want to follow is not easy.
            Following pages on instagram, subscribing to email newsletters, allowing notifications on your browser...
            There's no one good way to do it all. So I built this website to do it all for you!</p>
          <p class="ColTwo">
            Not only that, This website will help you find more websites to spend your money on! 
            Because this was another issue that I had. The most unique and inspired brands are often 
            incredibly obscure, independant, hard to find brands. </p>
          <p class="ColTwo">
            Hopefully, eventually, this website will help users share the brands they like and discover 
            new ones! </p>
        </v-sheet>

        <v-sheet
          rounded
          class="LPb ColTwo"
          color=#ffe4c4
          elevation="3"
        >
          <p class="ColTwo"> "Sounds great! How do I join? How much does it cost?"
            Good news! You can join for free by making an account below! </p>
          <v-btn large class="ColTwo ba" color="success" link to="create">Create an account</v-btn>
          <p class="ColTwo">Already have one?</p>
            <v-btn 
              link
              large
              class="ColTwo ba" 
              color="success"
              to="Login"
            >
              Log in here
          </v-btn>

        <p class="ColTwo">Want to support? Buy me lunch by clicki ng the link below.</p>
          <v-btn class="ColTwo" color="primary" link to="/Donate">Thanks :)</v-btn>   
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
