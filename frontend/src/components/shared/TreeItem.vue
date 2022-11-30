<script>
import 'bootstrap';

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
  emits: ['selectedModel'],
  methods: {
    toggle(item, index) 
    {
      if (this.hasChildren(item)) 
      {
        this.isOpen[this.index] = !this.isOpen[this.index]
      }
      this.setSelectedIndex(index);
    },
    setSelectedIndex(index) 
    {
      this.index = index;
      this.$emit('selectedModel', this.model[this.index]);
      this.toggle(this.model[this.index]);
    },
    hasChildren(item) {
      return item.children && item.children.length
    },
  }
}
</script>

<template>
  <div>
    <ul class="list-group" v-for="(item, index) in model" :key="index">
      <li class="list-group-item list-group-item-action" @click="toggle(item, index)">
        <div style="display:flex">
          <div class="col-md-1">
            <span class="clickable" v-if="hasChildren(item)" style="display:inline-block">
              <i class="fa-solid fa-plus" v-if="!isOpen[index]"></i>
              <i class="fa-solid fa-minus" v-if="isOpen[index]"></i>
            </span>
          </div>
          <div class="col-md-11 ">
            <router-link :to="item.routerLink" class="nav-link">{{item.name}}</router-link>
          </div>
        </div>
      </li>
      <ul v-show="isOpen[index]" v-if="hasChildren(item)">
        <TreeItem :model="item.children" @selectedModel="(value) => this.$emit('selectedModel', value)"/>
      </ul>
    </ul>
  </div>
</template>