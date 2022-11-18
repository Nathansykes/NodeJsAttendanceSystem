<script>
export default {
  name: 'TreeItem', // necessary for self-reference
  props: {
    model: []
  },
  data() {
    return {
      isOpen: [],
      index: -1
    }
  },
  computed: {
    hasChildren() {
      return this.model[this.index]?.children && this.model[this.index]?.children.length
    }
  },
  methods: {
    toggle() 
    {
      if (this.hasChildren) 
      {
        this.isOpen[this.index] = !this.isOpen[this.index]
      }
    },
    setSelectedIndex(index) 
    {
      this.index = index;
      this.toggle();
    }
  }
}
</script>

<template>
  <ul class="list-group">
    <li v-for="(model, index) in model" :key="index"
      class="list-group-item"
      @click="setSelectedIndex(index)">
        {{ model.name }}
        <ul v-show="isOpen[index]" v-if="hasChildren">
          <TreeItem :model="model.children"/>
        </ul>
    </li>
  </ul>
</template>

<style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
</style>