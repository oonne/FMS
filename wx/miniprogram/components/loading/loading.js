Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    extClass: {
      type: String,
      value: '',
    },
    show: {
      // 默认显示出来
      type: Boolean,
      value: true,
      observer(newValue) {
        this.computedStyle(newValue, this.data.animated);
      },
    },
    animated: {
      type: Boolean,
      value: false,
      observer(newValue) {
        this.computedStyle(this.data.show, newValue);
      },
    },
    duration: {
      // 过渡动画时间
      type: Number,
      value: 350,
    },
    type: {
      type: String,
      value: 'dot-gray', // 取值dot-white、dot-gray、circle
    },
    tips: {
      // type是circle的时候才有效
      type: String,
      value: '加载中',
    },
  },
  data: {
    animationData: {},
    animationInstance: {},
    displayStyle: 'none',
  },
  methods: {
    computedStyle(show, animated) {
      if (!show) {
        if (!animated) {
          this.setData({
            displayStyle: 'none',
          });
        } else {
          this.startAnimation();
        }
      } else {
        this.setData({
          displayStyle: '',
        });
      }
    },
    startAnimation() {
      setTimeout(() => {
        const { data } = this;
        const animation = data.animationInstance;
        animation.height(0).step();
        this.setData({
          animationData: animation.export(),
        });
      }, 0);
    },
  },
  lifetimes: {
    attached() {
      const { data } = this;
      const animationInstance = wx.createAnimation({
        duration: data.duration,
        timingFunction: 'ease',
      });
      this.setData({ animationInstance });
      this.computedStyle(this.data.show, this.data.animated);
    },
  },
});
