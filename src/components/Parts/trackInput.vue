<template>
    <v-text-field
        :disabled="!canEdit"
        :label="label"
        :hint="hint"
        v-model="testvar"
    />
</template>

<script>
export default {
    props: [
        'canEdit',
        'label',
        'hint',
        'value',
    ],
    computed: {
        testvar: {
            get () {
                return this.$store.state.testvar
            },
            set(value) {
                this.$store.commit('testUpdate',value)
            }
        }
    }
}
</script>