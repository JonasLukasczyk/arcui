<script lang="ts" setup>
import { reactive, onMounted, ref, nextTick } from 'vue';
import appProperties from '../AppProperties.ts';

const props = reactive({
  nodes: []
});
const arcTree = ref(null);
const selectedNode = ref(null);

onMounted(async () => {
  appProperties.title = 'Edit ARC';
  props.nodes = [{
    id:appProperties.arc_root,
    label: appProperties.arc_root.split('/').pop(),
    lazy: true
  }];

  await nextTick();

  arcTree._value.setExpanded(path);
});




// const readDir = ({ node, key, done, fail }) => {
//   window.ipc.invoke('FileBrowserService.readDir', key).then( done );
// };

// const openArc = async path => {
//   if(!path)
//     return;
//   const root = {
//     id:path,
//     label: path.split('/').pop(),
//     lazy: true
//   };
//   props.nodes = [root];

// }
// defineExpose({ openArc });

// const emit = defineEmits(['fileSelected'])
// const fileSelected = id=>{
//   if(!id)
//     return;
//   const n = arcTree._value.getNodeByKey(id);
//   if(n.isDirectory)
//     return;

//   emit('fileSelected',n);
// }

</script>

<template>
    <q-tree
      ref='arcTree'
      :nodes="props.nodes"
      node-key="id"
      dense
      v-model:selected="selectedNode"
      @lazy-load="readDir"
      @update:selected="fileSelected"
    ></q-tree>
</template>

<style>
/*.arcTree {*/
/*  height: 100%;*/
  /*position: absolute;*/
  /*left: 2em;*/
  /*right: 2em;*/
  /*top: 2em;*/
  /*bottom: 2em;*/
  /*border: 0.5em solid #f00;*/
/*}*/
</style>
