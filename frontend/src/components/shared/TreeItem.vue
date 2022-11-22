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
  emits: ['selectedModel'],
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
      this.$emit('selectedModel', this.model[this.index]);
      this.toggle();
    }
  }
}
</script>

<template>
  <div>
    <ul class="list-group" v-for="(item, index) in model" :key="index">
      <li class="list-group-item">
        <span class="clickable" @click="setSelectedIndex(index)">
          <i class="fa-solid fa-plus"></i>
        </span>
        <router-link :to="item.routerLink" class="nav-link">{{item.name}}</router-link>
      </li>
      <ul v-show="isOpen[index]" v-if="hasChildren">
        <TreeItem :model="item.children" @selectedModel="(value) => this.$emit('selectedModel', value)"/>
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