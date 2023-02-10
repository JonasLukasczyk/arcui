import { reactive } from 'vue'

const appProperties = reactive({
  STATES: {
    OPEN_ARC: 0,
    HISTORY: 1,
    DATAHUB: 2,
    INSTALL_AC: 3,
  },
  state: 0,
  arc_root: '',
  title: '',
  ac_ready: false
});

export default appProperties;
