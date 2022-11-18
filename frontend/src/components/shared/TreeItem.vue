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
  <div>
    <ul class="list-group" v-for="(item, index) in model" :key="index">
      <li class="list-group-item">
        <span @click="setSelectedIndex(index)">
          {{ item.name }}
        </span>
      </li>
      <ul v-show="isOpen[index]" v-if="hasChildren">
        <TreeItem :model="item.children"/>
      </ul>
    </ul>
  </div>
</template>

<style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
</style>