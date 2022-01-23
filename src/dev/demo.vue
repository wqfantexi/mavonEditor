<template>
    <div>
      <App></App>
    </div>
</template>

<script>
import app from './app.vue';
import editor from './editor.vue';

export default {
  name: 'demo',
  components: {
    App: app,
    Editor: editor
  },
  data() {
    return {
      viewIndex: 1
    };
  }
};
</script>
<style>
.navigate {
  text-align: center;
  font-size: 18px;
  color: blue;
}

.navigate span {
  margin-right: 5px;
}

.navigate span:hover {
  cursor: pointer;
  font-weight: bolder;
}
</style>
