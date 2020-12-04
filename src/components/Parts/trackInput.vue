<template>
    <v-container fluid>
        {{last}}
    </v-container>
</template>

<script>
//using this bitch for some code writing now, it's not used in anything so its just a spare file
import { mapGetters } from 'vuex';

export default {
    state: {
        name: 'andrew'
    },
    computed: {
        last: function() {return this.trackFieldInfo(1,'name')},

        ...mapGetters([
            'trackFieldInfo',
        ])
    }
}
</script>