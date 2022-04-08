import SiderMenu from '../sider/sider.vue';
import ConHeader from '../conheader/conheader.vue';

export default {
  components: {
    SiderMenu,
    ConHeader,
  },
  data() {
    return {
      fontSize: 14,
      collapsed: false,
      isRouterAlive: true,
    };
  },
  methods: {
    collapsedSider() {
      this.$refs.siderBar.toggleCollapse();
    },
    handleCollapsedChange() {
      this.collapsed = !this.collapsed;
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
  computed: {
    menuList() {
      return this.$store.getters.menuList;
    },
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : ''];
    },
  },
};
