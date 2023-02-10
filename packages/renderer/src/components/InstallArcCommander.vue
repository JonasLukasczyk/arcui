<script lang="ts" setup>
import {onMounted,reactive} from 'vue';

import appProperties from '../AppProperties.ts';

const navigateToArcCommanderWebpage = ()=>{
  window.ipc.invoke('DataHubService.inspectArc', "https://github.com/nfdi4plants/arcCommander/releases");
}

onMounted(() => {
  appProperties.title = 'Install ARC Commander';
});

</script>

<template>
  <q-banner rounded inline-actions class="bg-grey-3">
    <template v-slot:avatar>
      <q-icon name="warning" color="primary" />
    </template>
    Unable to detect ArcCommander.

    <template v-slot:action>
      <q-btn color="secondary" label="Install" style="margin-right:0.5em;" v-on:click='navigateToArcCommanderWebpage()' />
      <q-btn color="secondary" label="Retry" v-on:click='' />
    </template>
  </q-banner>
</template>

