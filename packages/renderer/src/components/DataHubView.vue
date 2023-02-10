<script lang="ts" setup>
import {onMounted,reactive} from 'vue';

import appProperties from '../AppProperties.ts';

const props = reactive({
  list: [],
  carousel: true
});

const inspectArc = url =>{
  window.ipc.invoke('DataHubService.inspectArc', url);
};

const importArc = async url =>{
  const destination = await window.ipc.invoke('DataHubService.selectImportDestination');
  if(!destination)
    return;
  console.log(destination);
  const status = await window.ipc.invoke('ArcCommanderService.run', {
    args: [`get`,`-r`,url],
    cwd: destination
  });
  console.log(status);
};

onMounted(async () => {
  appProperties.title = 'Import ARC from DataHUB';
  props.list = await window.ipc.invoke('DataHubService.getArcs');
});
</script>

<template>

  <q-dialog v-model="props.carousel">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Importing Arc</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-circular-progress
          indeterminate
          rounded
          size="10em"
          color="primary"
          class="q-ma-md"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <div style="display:block;text-align:center;" v-if="props.list.length<1">
      <q-circular-progress
        indeterminate
        rounded
        size="10em"
        color="primary"
        class="q-ma-md"
      />
      <div>Fetching Remote ARCs</div>
  </div>

  <q-list separator v-else>
    <q-item v-ripple
      v-for="(item,i) in props.list"
      :style="i%2===1?'background-color:#fff;':''"
    >
      <q-item-section avatar>
        <q-avatar v-if="item.avatar_url!=null">
          <img :src="item.avatar_url">
        </q-avatar>
        <q-avatar color="blue" v-else>{{item.namespace.name[0]}}</q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label overline><b>{{item.name}}</b></q-item-label>
        <q-item-label style="color:#999">[{{item.created_at}}]</q-item-label>
        <q-item-label>{{item.namespace.name}}</q-item-label>
      </q-item-section>
      <q-item-section avatar>
        <q-btn unelevated color="secondary" v-on:click="inspectArc(item.http_url_to_repo)" icon='search'></q-btn>
      </q-item-section>
      <q-item-section avatar>
        <q-btn unelevated color="secondary" v-on:click="importArc(item.http_url_to_repo)" icon='file_download'></q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>

