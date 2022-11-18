<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by name"
            v-model="title"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchName"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Courses List</h4>
        <TreeItem :model="treeViewData" @selectedModel="(value) => setActiveModel(value)"/>
      </div>
      <div class="col-md-6">
        <h4>Details</h4>
        <div v-if="currentModel">
          <div v-for="(property) in currentModelProperties"
            :key="property">
            <label><strong>{{property.key}}:</strong></label>{{property.value}}
          </div>
        </div>
        <div v-else>
          <br />
          <p>Please click on an Course...</p>
        </div>
      </div>
    </div>
  </template>
  
<script>
  // TODO: Make a master data service routes file
  import ModelDataService from "../services/models.data.service";
  import TreeItem from './shared/TreeItem.vue'
  
  export default {
    name: "courses-list",
    components: {
      TreeItem
    },
    data() {
      return {
        models: [],
        treeViewData: [],
        currentModel: null,
        currentModelProperties: [],
        currentIndex: -1,
        title: "",
      };
    },
    methods: {
      retrieveCourses() {
        ModelDataService.CourseDataService.getAll()
          .then(response => 
          {
            const data = JSON.parse(response.data);

            for (var i = 0; i < data.length; i++) 
            {
              var course = 
              {
                id : data[i]._id,
                name : data[i].Title,
                children : this.createTreeViewData(ModelDataService.ModuleDataService.get, data[i].Modules, "Modules"),
              }

              this.treeViewData.push(course);
              this.models.push(data[i]);
            }
          })
          .catch(error => 
          {
            console.log(error);
          });
      },

      createTreeViewData(getData, ids, type) 
      {
        const treeViewData = [];

        getData(ids).then(response => 
        {
          let data = JSON.parse(response.data);

          if (!data) 
          {
            return;
          }

          switch(type) 
          {
            case "Sessions":
              getData = ModelDataService.SessionDataService.get;
              break;
              default:
                break;
          }

          if (!Array.isArray(data)) 
          {
            data = [data];
          }
  
          for (let i = 0; i < data.length; i++) 
          {
            let item = 
            {
              id : data[i]._id,
              name : data[i].Title,
              children : this.createTreeViewData(ModelDataService.SessionDataService.get, this.GetPropertyValue(data[i], "Sessions")),
            };

            treeViewData.push(item);
            this.models.push(data[i]);
          }
        })
        
        return treeViewData;
      },

      GetPropertyValue(obj1, dataToRetrieve) 
      {
        return dataToRetrieve
          .split('.') // split string based on `.`
          .reduce(function(o, k) {
            return o && o[k]; // get inner property if `o` is defined else get `o` and return
          }, obj1) // set initial value as object
      },

      GetProperties(obj) 
      {
        var properties = [];
        var values = [];
        var dictionary = [];
        
        for(var key in obj) 
        {
            if(Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] !== 'function') 
            {
                properties.push(key);
                values.push(this.GetPropertyValue(obj, key));
                dictionary.push( { key : key, value : this.GetPropertyValue(obj, key) });
            }
        }
        return dictionary;
      },
  
      refreshList() {
        this.retrieveCourses();
        this.currentCourse = null;
        this.currentIndex = -1;
      },
  
      setActiveModel(model) 
      {
        this.currentModel = this.models.find(x => x._id === model.id);
        this.currentIndex = this.models.indexOf(this.currentModel);
        this.currentModelProperties = this.GetProperties(this.currentModel);
      },
      
      searchName() {
        ModelDataService.CourseDataService.findByName(this.title)
          .then(response => 
          {
            const courses = JSON.parse(response.data);
            this.courses = courses;
            this.setActiveCourse(null);
          })
          .catch(error => 
          {
            console.log(error);
          });
      }
    },
    mounted() {
      this.retrieveCourses();
    }
  };
</script>
  
<style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
</style>