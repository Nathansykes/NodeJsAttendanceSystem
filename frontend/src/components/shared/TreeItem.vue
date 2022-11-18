<script>
export default {
  name: 'TreeItem', // necessary for self-reference
  props: {
    model: Object
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    hasChildren() {
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggle() {
      if (this.hasChildren) {
        this.isOpen = !this.isOpen
      }
    },
  }
}
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      @click="toggle">
        {{ model.name }}
    </li>
    <ul v-show="isOpen" v-if="hasChildren">
      <ul v-for="(model, index) in model.children" :key="index">
        <TreeItem :model="model"/>
      </ul>
    </ul>
  </ul>
</template>

<style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
</style>