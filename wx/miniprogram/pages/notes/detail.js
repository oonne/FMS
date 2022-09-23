import { note } from '../../intercept/index';

Page({
  data: {
    isAdd: true,
    id: '',
    title: '',
    content: '',
    loading: true,
  },
  onLoad(options) {
    if (options.id) {
      const content = wx.getStorageSync('note');
      this.setData({
        isAdd: false,
        id: options.id,
        title: decodeURIComponent(options.note_title),
        content,
        loading: false,
      });
      wx.setNavigationBarTitle({
        title: decodeURIComponent(options.note_title),
      });
    } else {
      wx.setNavigationBarTitle({
        title: '新增笔记',
      });
      this.setData({
        loading: false,
      });
    }
  },
  onUnload() {
    wx.removeStorage({
      key: 'note',
    });
  },
  /*
   * 保存按钮
   */
  save(e) {
    const { title, content } = e.detail.value;
    if (!title) {
      wx.showToast({
        title: '请填写标题',
        icon: 'none',
      });
      return;
    }
    if (!content) {
      wx.showToast({
        title: '请填写内容',
        icon: 'none',
      });
      return;
    }

    this.setData({
      loading: true,
    });
    if (this.data.isAdd) {
      this.add({ title, content });
    } else {
      this.update({ title, content });
    }
  },
  /*
   * 新增
   * @params {string} params.title 标题
   * @params {object} params.content 内容
   */
  add(params) {
    note
      .add({
        note_title: params.title,
        note_content: params.content,
      })
      .then((res) => {
        this.setData({
          loading: false,
        });
        wx.navigateBack();
      });
  },
  /*
   * 修改
   * @params {string} params.title 标题
   * @params {object} params.content 内容
   */
  update(params) {
    note
      .update({
        id: this.data.id,
        note_title: params.title,
        note_content: params.content,
      })
      .then((res) => {
        this.setData({
          loading: false,
        });
        wx.navigateBack();
      });
  },
  /*
   * 删除
   */
  delete() {
    wx.showModal({
      title: `确认删除${this.data.title}?`,
      confirmText: '删除',
      confirmColor: '#F00',
      success: (res) => {
        if (res.confirm) {
          note
            .delete({
              id: this.data.id,
            })
            .then((res) => {
              wx.navigateBack();
            });
        }
      },
    });
  },
});
