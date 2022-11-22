<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by name"
            v-model="title"/>
            <select class="form-select" @change="filterTypeChange($event)">
              <option v-for="modelType in modelTypes" :key="modelType.Id" :value="modelType.Id">{{modelType.Name}}</option>
            </select>
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
            <label><strong>{{property.key}}: </strong></label> {{property.value}}
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
  import ModelDataService from "../services/models.data.service";
  import ModelTypes from '../../../shared/modelTypes';
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
        modelTypes: ModelTypes,
      };
    },
    methods: {
      filterTypeChange(event) 
      {
        switch (event.target.value) 
          {
            case ModelTypes.Course.Id.toString():
              this.retrieveCourses();
              break;
            case ModelTypes.Module.Id.toString():
              this.retrieveModules();
              break;
            case ModelTypes.Session.Id.toString():
              this.retrieveSessions();
              break;
            case ModelTypes.User.Id.toString():
              this.retrieveUsers();
              break;
              default:
                break;
          }
      },

      retrieveCourses() {
        ModelDataService.CourseDataService.getAll()
          .then(response => this.treeViewData = this.createTreeViewData(JSON.parse(response.data), ModelTypes.Course))
          .catch(error => console.log(error));
      },

      retrieveModules() {
        ModelDataService.ModuleDataService.getAll()
          .then(response => this.treeViewData = this.createTreeViewData(JSON.parse(response.data), ModelTypes.Module))
          .catch(error => console.log(error));
      },

      retrieveSessions() {
        ModelDataService.SessionDataService.getAll()
          .then(response => this.treeViewData = this.createTreeViewData(JSON.parse(response.data), ModelTypes.Session))
          .catch(error => console.log(error));
      },

      retrieveUsers() {
        ModelDataService.UserDataService.getAll()
          .then(response => this.treeViewData = this.createTreeViewData(JSON.parse(response.data), ModelTypes.User))
          .catch(error => console.log(error));
      },

      createTreeViewData(model, type) 
      {
          const treeViewData = [];

          if (!model || !type) 
          {
            return;
          }

          // if only one item is returned change to an array so we can iterate.
          if (!Array.isArray(model)) 
          {
            model = [model];
          }

          let childType

          switch (type) 
          {
            case ModelTypes.Course:
              childType = ModelTypes.Module;
              break;
            case ModelTypes.Module:
              childType = ModelTypes.Session;
              break;
            case ModelTypes.Session:
              childType = ModelTypes.User;
              break;
            case ModelTypes.User:
              childType = undefined;
              break;
              default:
                break;
          }

          for (let i = 0; i < model.length; i++) 
          {
            let item = 
            {
              id : model[i].Id,
              name : model[i].Title ?? (`${model[i].FirstName} ${model[i].LastName}`),
              routerLink : `${type.Name}/${model[i].Id}`,
            };
            
            if (childType) 
            {
              item.children = this.createTreeViewData(this.GetPropertyValue(model[i], childType.Name), childType);
            }

            treeViewData.push(item);
            this.models.push(model[i]);
          }
        
        return treeViewData;
      },

      GetPropertyValue(obj1, dataToRetrieve) 
      {
        if (!dataToRetrieve) { return; }

        return dataToRetrieve
          .split('.') // split string based on `.`
          .reduce(function(o, k) {
            return o && o[k]; // get inner property if `o` is defined else get `o` and return
          }, obj1) // set initial value as object
      },

      GetProperties(obj) 
      {
        var dictionary = [];
        
        for(var key in obj) 
        {
            if(Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] !== 'function' && !Array.isArray(obj[key])) 
            {
                if (key !== "Id" && key !== "__v")
                {
                  if (key === "DateAndTime") 
                  {
                    var date = new Date(obj[key]);
                    obj[key] = date.toLocaleString("en-GB");
                  }
                  dictionary.push( { key : key, value : obj[key] });
                }
            }
        }
        return dictionary.sort();
      },
  
      refreshList() {
        this.retrieveCourses();
        this.currentCourse = null;
        this.currentIndex = -1;
      },
  
      setActiveModel(model) 
      {
        this.currentModel = this.models.find(x => x.Id === model.id);
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