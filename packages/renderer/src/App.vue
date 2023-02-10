<template>
  <!--<q-layout view="lHh Lpr lff" class="no-selection">-->
  <q-layout view="hHh Lpr lff" class="no-selection">
    <q-header>
      <q-toolbar style="padding:0;">
        <q-icon color="accent" size="3.5rem" name="img:../assets/dpLogo.svg"></q-icon>
        <q-toolbar-title>{{appProperties.title}}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="layoutProperties.drawer"
      show-if-above

      :mini="layoutProperties.miniState"
      @mouseover="layoutProperties.miniState = true"
      @mouseout="layoutProperties.miniState = true"

      :width="layoutProperties.drawerWidth"
      :breakpoint="0"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <q-item v-ripple :clickable='appProperties.ac_ready' :style="formatButton('OPEN_ARC')" v-on:click='appProperties.state=appProperties.STATES.OPEN_ARC'>
            <q-item-section avatar>
              <q-icon name="folder_open"></q-icon>
            </q-item-section>
            <q-item-section>
              Open
            </q-item-section>
          </q-item>
          <q-item v-ripple :clickable='appProperties.arc_root!==""' :style="formatButton('DATAHUB')" v-on:click='appProperties.state=appProperties.STATES.DATAHUB'>
            <q-item-section avatar>
              <!--<q-icon name="edit_document"></q-icon>-->
              <q-icon name="mode_edit"></q-icon>
            </q-item-section>
            <q-item-section>
              Edit
            </q-item-section>
          </q-item>
          <q-item v-ripple :clickable='appProperties.arc_root!==""' :style="formatButton('HISTORY')" v-on:click='appProperties.state=appProperties.STATES.HISTORY'>
            <q-item-section avatar>
              <q-icon name="history"></q-icon>
            </q-item-section>
            <q-item-section>
              History
            </q-item-section>
          </q-item>
          <q-item v-ripple :clickable='appProperties.arc_root!==""' :style="formatButton('HISTORY')" v-on:click='appProperties.state=appProperties.STATES.HISTORY'>
            <q-item-section avatar>
              <q-icon name="sync"></q-icon>
            </q-item-section>
            <q-item-section>
              Sync
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <!--<div v-touch-pan.preserveCursor.prevent.mouse.horizontal="resizeDrawer" class="q-drawer__resizer"></div>-->
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <div style='display:block;max-width:600px;margin:0 auto;'>
          <OpenArcView v-if     ='appProperties.state===appProperties.STATES.OPEN_ARC'></OpenArcView>
          <HistoryView v-else-if='appProperties.state===appProperties.STATES.HISTORY'></HistoryView>
          <DataHubView v-else-if='appProperties.state===appProperties.STATES.DATAHUB'></DataHubView>
          <InstallArcCommander v-else-if='appProperties.state===appProperties.STATES.INSTALL_AC'></InstallArcCommander>
        </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts" setup>

import OpenArcView from './components/OpenArcView.vue';
import FileView from './components/FileView.vue';
import HistoryView from './components/HistoryView.vue';
import DataHubView from './components/DataHubView.vue';
import InstallArcCommander from './components/InstallArcCommander.vue';

import logoURL from '../assets/dpLogo.png'

import { setCssVar } from 'quasar';
setCssVar('primary', '#2d3e50');

import { onMounted, ref, reactive } from 'vue';

import appProperties from './AppProperties.ts';

const formatButton = state=>{
  let style = ''
  if (state==='OPEN_ARC') {
    style+= appProperties.ac_ready ? '' : 'opacity:0.2;';
  } else {
    style+= appProperties.arc_root ? '' : 'opacity:0.2;';
  }
  style+= appProperties.state === appProperties.STATES[state] ? 'background-color:#ccc;' : '';
  return style;
}

onMounted(async () => {
  const status = await window.ipc.invoke('ArcCommanderService.run', '--version');
  appProperties.ac_ready = status[0];
  appProperties.state = appProperties.ac_ready ? appProperties.STATES.OPEN_ARC : appProperties.STATES.INSTALL_AC;
});

const layoutProperties = reactive({
  drawerWidth: 200,
  drawer: true,
  miniState: true,
  insideModel: 50
});
let initialDrawerWidth = 0;
const resizeDrawer = e=> {
  if (e.isFirst === true) {
    initialDrawerWidth = layoutProperties.drawerWidth;
  }
  layoutProperties.drawerWidth = Math.max(200,initialDrawerWidth + e.offset.x);
};

</script>

<style>

.no-selection {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.q-drawer__resizer {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -2px;
  width: 4px;
  background-color: #ccc;
  cursor: ew-resize;
}

.link {

}

</style>
