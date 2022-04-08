import { mapState } from 'vuex';

export default {
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      iconSize: 16,
      rootIconSize: 20,
    };
  },
  watch: {
    activeName() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName();
      });
    },
  },
  computed: {
    ...mapState(['openedNames', 'activeName']),
  },
};
