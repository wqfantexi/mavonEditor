<template>
    <div id="app">
        <div class="item">
            <mavon-editor ref=md :subfield="subfield" :toolbarsFlag="toolbarsFlag" :editable="editable"
                          :language="d_language" @change="change"  :ishljs="true" class="item-editor" v-model="content"
                          :autofocus="autofocus"
                          :shortCut="true"
                          :externalLink="external_link"
                          @imgAdd="$imgAdd" @imgDel="$imgDel" @subfieldtoggle="$subfieldtoggle" @previewtoggle="$previewtoggle"
                          :imageFilter="image_filter"
                          :boxShadow="true"
                          :scrollStyle="true"
                          :transition="true"
                          :codeStyle="codeStyle"
                          box-shadow-style="0 2px 12px 0 rgba(0, 0, 0, 0.1)"
                          toolbars-background="#ffffff"
                          preview-background="#fbfbfb"
                          :toolbars="toolbars"
                          >
                <!-- <template slot="left-toolbar-before">
                    左工具栏前
                </template>
                <template slot="left-toolbar-after">
                    左工具栏后
                </template>

                <template slot="right-toolbar-before">
                    右工具栏前
                </template>
                <template slot="right-toolbar-after">
                    右工具栏后
                </template> -->
            </mavon-editor>
          <!--<button ref="localimg" type="button" @click="onLocalImage" class="op-icon fa fa-mavon-picture-o"
                  aria-hidden="true" title="本地图片"></button>
            <button ref="diy" type="button" @click="onScreenShot" class="op-icon fa fa-mavon-scissors"
                aria-hidden="true" title="屏幕截图"></button>
                -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import styles from '../lib/core/hljs/lang.hljs.css.js'
    import {CONFIG} from '../lib/config.js'
    import { Base64 } from 'js-base64';
    export default {
        name: 'app',
        data () {
            return {
                d_language: 'zh-CN',
                content: '',
                help1: '',
                help2: '',
                d_words: {},
                screen_phone: false,
                toolbars: {
                  bold: true, // 粗体
                  italic: true, // 斜体
                  header: true, // 标题
                  underline: true, // 下划线
                  strikethrough: true, // 中划线
                  mark: true, // 标记
                  superscript: true, // 上角标
                  subscript: true, // 下角标
                  quote: true, // 引用
                  ol: true, // 有序列表
                  ul: true, // 无序列表
                  link: true, // 链接
                  imagelink: true, // 图片链接
                  code: true, // code
                  table: true, // 表格
                  fullscreen: false, // 全屏编辑
                  readmodel: false, // 沉浸式阅读
                  htmlcode: true, // 展示html源码
                  help: false, // 帮助
                  /* 1.3.5 */
                  undo: true, // 上一步
                  redo: true, // 下一步
                  trash: true, // 清空
                  save: false, // 保存（触发events中的save事件）
                  /* 1.4.2 */
                  navigation: true, // 导航目录
                  /* 2.1.8 */
                  alignleft: true, // 左对齐
                  aligncenter: true, // 居中
                  alignright: true, // 右对齐
                  /* 2.2.1 */
                  subfield: true, // 单双栏模式
                  preview: true // 预览
                },
                autofocus: true,
                subfield: true,
                editable: true,
                toolbarsFlag: true,
                img_file: {},
                external_link: {
                    markdown_css: function() {
                        return '/markdown/github-markdown.min.css';
                    },
                    hljs_js: function() {
                        return '/highlightjs/highlight.min.js';
                    },
                    hljs_css: function(css) {
                        return '/highlightjs/styles/' + css + '.min.css';
                    },
                    hljs_lang: function(lang) {
                        return '/highlightjs/languages/' + lang + '.min.js';
                    },
                    katex_css: function() {
                        return '/katex/katex.min.css';
                    },
                    katex_js: function() {
                        return '/katex/katex.min.js';
                    }
                },
                toolbar_settings: {
                    undo: true, // 上一步
                    redo: true, // 下一步
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    code: true, // code
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                    /* 1.4.2 */
                    navigation: true // 导航目录
                },
                image_filter: function($files) {
                    console.log('image_filter files:', $files);
                    // console.log('here for you', $files);
                    return true;
                },
                imageClick: function (file) {
                    console.log(file);
                },
                imgName: '',
                codeStyle: "github",
                styles
            }
        },
        created () {
            var $vm = this;
            this.initLanguage();
            this.sizeToStatus()
            window.addEventListener('resize', function() {
                // 媒介查询
                $vm.sizeToStatus()
            })
        },
        mounted() {
            var md = this.$refs.md;
            var toolbar_left = md.$refs.toolbar_left;
            var diy = this.$refs.diy;
            // toolbar_left.$el.append(this.$refs.localimg);
            // toolbar_left.$el.append(diy)
            // toolbar_left.$el.append(diy.$el)
            // console.log(toolbar_left)
            this.registerGlobalFunc(this);
        },
        methods: {
            registerGlobalFunc(_this) {
              window.setMarkdownContent = function (content) {
                if (content.length === 0) {
                  _this.value = "";
                } else {
                  _this.content = Base64.decode(content);
                }
              };
            },
            clearCache() {
                this.$refs.md.$emptyHistory()
            },
            imgreplace($e) {
                console.log('here');
                this.$refs.md.$imglst2Url([
                    [0, 'https://raw.githubusercontent.com/hinesboy/mavonEditor/master/img/cn/cn-common.png'],
                    [1, 'https://raw.githubusercontent.com/hinesboy/mavonEditor/master/img/cn/cn-common.png']
                ]);
            },
            uploadimg($e) {
                console.log(this.img_file);
                for (var _img in this.img_file) {
                    this.$refs.md.$img2Url(_img, 'https://raw.githubusercontent.com/hinesboy/mavonEditor/master/img/cn/cn-common.png')
                }
                /* var formdata = new FormData();
                for (var _img in this.img_file) {
                    formdata.append(_img, this.img_file[_img]);
                    // _imglst.push([_img, this.img_file[_img]]);
                }
                axios({
                    url: 'http://127.0.0.1/index.php',
                    method: 'post',
                    data: formdata,
                    headers: {'Content-Type': 'multipart/form-data'},
                }).then((res) => {
                    console.log(res);
                }) */
            },
            $imgAdd(pos, $file) {
                // alert(`imgadd ${$file.name} ${pos}`);
                console.log('imgAdd', pos, $file);
                if (window.on_markdown_pasteimage) {
                  $file.arrayBuffer().then((buffer) => {
                    // const b64 = Base64.btoa(String.fromCharCode(...new Uint8Array(buffer)));
                    // console.log($file.miniurl);
                    window.on_markdown_pasteimage($file.name, $file.miniurl, (result) => {
                      console.log(`${pos} ---> ${result}`);
                      // $imgDel(pos)
                      const filename = $file.name;
                      // this.$refs.md.$imgDel($file);
                      this.$refs.md.$insertImage(filename, result);
                    })
                  });
                }
                // console.log(this.$refs.md.$refs.toolbar_left.$imgDelByFilename(pos));
                // console.log(this.$refs.md.$refs.toolbar_left.$imgAddByFilename('./test', $file))
                // console.log(this.$refs.md.$refs.toolbar_left.$imgUpdateByFilename('./test', $file))
                // console.log(this.$refs.md.$refs.toolbar_left.$imgAddByFilename('./test', $file))
                // console.log(this.$refs.md);
                // this.$refs.md.$imgUpdateByUrl(pos, 'http://pic.58pic.com/58pic/13/46/50/61758PICWZY_1024.jpg');
            },
            $imgDel(pos) {
                console.log('imgDel', pos);
                delete this.img_file[pos];
            },
            sizeToStatus () {
                if (window.matchMedia('(min-width:768px)').matches) {
                    // > 768
                    this.screen_phone = false
                } else {
                    // <  768
                    this.screen_phone = true
                }
            },
            saveone (val, render) {
                alert('save one')
            },
            savetwo (val, render) {
                alert('save two')
            },
            change (val, render) {
                if (window.on_markdown_change) {
                  // alert('change');
                  window.on_markdown_change(val);
                }
            },
            opchange (event) {
                this.d_language = event.target.value;
            },
            initLanguage() {
                this.d_words = CONFIG[`words_${this.d_language}`]
                this.help1 = CONFIG[`help_${this.d_language}`]
                this.help2 = CONFIG[`help_${this.d_language}`]
            },
            $subfieldtoggle(flag , value) {
                console.log('sufield toggle' + flag)
            },
            $previewtoggle(flag , value) {
                console.log('preview toggle' + flag)
            },
            imgdelete() {
                var md = this.$refs.md;
                var toolbar_left = md.$refs.toolbar_left;
                toolbar_left.$imgDelByFilename(this.imgName);
            }
        },
        watch: {
            d_language: function () {
                this.initLanguage();
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    body
        margin 0
        padding 0
        padding-bottom 50px
    .switch-code-style
        display inline
        margin-left 8px
    .page-lang
        position absolute
        top 15px
        right 2%
    .page-header
        box-sizing border-box
        padding 90px 15px
        width 100%
        height 380px
        color #fff
        text-align center
        background-color #159957
        background-image linear-gradient(120deg, #155799, #159957)
        @media only screen and (max-width 958px)
            height 300px
            padding 60px 15px
        @media only screen and (max-width 768px)
            height 370px
            padding 50px 15px
        .project-name
            margin-top 0
            margin-bottom 0.1rem
            font-size 2.25rem
            @media only screen and (max-width 768px)
                font-size 25px
        .project-tagline
            margin-bottom 2rem
            font-weight normal
            opacity 0.7
            @media only screen and (max-width 768px)
                font-size 16px
        .btn
            padding: 0.6rem 0.9rem
            font-size: 0.9rem
            display: inline-block
            margin-bottom: 1rem
            color: rgba(255, 255, 255, 0.7)
            background-color: rgba(255, 255, 255, 0.08)
            border-color: rgba(255, 255, 255, 0.2)
            border-style: solid
            border-width: 1px
            border-radius: 0.3rem
            transition: color 0.2s, background-color 0.2s, border-color 0.2s
            text-decoration: none
            margin-left 20px
            box-sizing border-box
            &:hover
                color: rgba(255, 255, 255, 0.8)
                text-decoration: none
                background-color: rgba(255, 255, 255, 0.2)
                border-color: rgba(255, 255, 255, 0.3)
            @media only screen and (max-width 768px)
                display: block
                width: 90%
                padding: 0.75rem
                font-size: 0.9rem
                margin-left 5%
    .item
        width 75%
        margin-left 12.5%
        @media only screen and (max-width 1100px)
            width 85%
            margin-left 7.5%
        @media only screen and (max-width 768px)
            width 92%
            margin-left 4%
        .item-header
            margin-top: 3.5rem
            margin-bottom: 2rem
            font-weight: normal
            color: #159957
            @media only screen and (max-width 768px)
                margin-top: 2rem
                margin-bottom: 1rem
        .item-button
            margin-bottom: 4rem
        .item-editor
            width 100%
            height 700px
            @media only screen and (max-width 1600px)
                height 550px
</style>
