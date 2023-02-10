<script lang="ts" setup>
import {onMounted,reactive} from 'vue';

import appProperties from '../AppProperties.ts';

onMounted(() => {
  appProperties.title = 'Open ARC';
});

</script>

<template>
  <q-list>
    <q-item>
      <q-item-section top avatar>
        <q-btn color="secondary" icon="file_open"/>
      </q-item-section>

      <q-item-section>
        <q-item-label><b>Open Arc</b></q-item-label>
        <q-item-label caption lines="2">Open an existing ARC on the local file system.</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced />

    <q-item>
      <q-item-section top avatar>
        <q-btn color="secondary" icon="note_add"/>
      </q-item-section>

      <q-item-section>
        <q-item-label><b>New Arc</b></q-item-label>
        <q-item-label caption lines="2">Create a new ARC on the local file system.</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced />

    <q-item>
      <q-item-section top avatar>
        <q-btn color="secondary" icon="file_download" v-on:click='appProperties.state=appProperties.STATES.DATAHUB'/>
      </q-item-section>

      <q-item-section>
        <q-item-label><b>Import Arc</b></q-item-label>
        <q-item-label caption lines="2">Import your ARCs and public ARCs from the <span class='link'>nfdi4plants DataHUB</span>.</q-item-label>
      </q-item-section>
    </q-item>

  </q-list>
</template>

