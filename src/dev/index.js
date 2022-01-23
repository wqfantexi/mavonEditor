/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-04T23:26:08+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: index.js
 * @Last modified by:   chc
 * @Last modified time: 2017-11-25T12:14:56+08:00
 * @License: MIT
 * @Copyright: 2017
 */

import Vue from 'vue';
import qwebchannel from "qwebchannel";

// eslint-disable-next-line no-undef
if (window.qt !== undefined) {
  const _channel = new qwebchannel.QWebChannel(qt.webChannelTransport, function (channel) {
    // 将QWebChannel的实例挂载到window.PyHandler，后面在javascript中通过window.PyHandler即可调用
    window.pyHandler = channel.objects.PyHandler;
    window.on_markdown_change = window.pyHandler.on_markdown_change;
    window.on_markdown_screenshot = window.pyHandler.on_markdown_screenshot;
    window.on_markdown_localimage = window.pyHandler.on_markdown_localimage;
    window.on_markdown_pasteimage = window.pyHandler.on_markdown_pasteimage;
  });
}

var demo = require('./app.vue');
var sMd = require('../index.js');

Vue.use(sMd);
var app = new Vue({
  el: '#main',
  render: (h) => h(demo)
});
