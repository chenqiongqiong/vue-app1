export default {
  install: function(Vue, options) {
    console.log(options);
    Vue.prototype.$testMethod = function (methodOptions) {
      console.log(methodOptions);
    }
  }
}