import route from '../../config/route';

/*
 * 添加按钮
 * 功能：点击跳转到指定的表单
 */
Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/,
  },
  properties: {
    page: {
      type: String,
      value: 'INDEX',
    },
  },
  data: {
    color: '',
  },
  attached() {
    this.setColor();
  },
  methods: {
    setColor() {
      let color = '';
      switch (this.properties.page) {
        case 'NOTES_DETAIL':
          color = 'notes';
          break;
        case 'PASSWORD_DETAIL':
          color = 'password';
          break;
        case 'DIARY_DETAIL':
          color = 'diary';
          break;
        case 'INCOME_DETAIL':
          color = 'income';
          break;
        case 'EXPENSES_DETAIL':
          color = 'expenses';
          break;
        default:
      }
      this.setData({
        color,
      });
    },
    onAdd() {
      wx.navigateTo({
        url: route[this.properties.page],
      });
    },
  },
});
