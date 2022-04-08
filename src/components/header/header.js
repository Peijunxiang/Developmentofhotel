import logo from '../../common/images/logo.png';

export default {
  data() {
    return {
      userName: '',
      engName: '',
      url: '',
      color: '#515a6e',
      title: '',
      tip: '',
      currentEnv: '',
      logoSrc: logo,
    };
  },
  beforeMount() {
    this.userName = 'admin';
    this.engName = 'development';
    this.$store.commit('setUserEngName', 'development');
    this.currentEnv = window.location.host;
  },
};
