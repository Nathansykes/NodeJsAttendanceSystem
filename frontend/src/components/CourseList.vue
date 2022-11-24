<template>
    <div class="list row">
      <div class="col-md-12">
        <div id="search-box-container">
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
            const data = response.data;

            for (var i = 0; i < data.length; i++) 
            {
              var course = 
              {
                id : data[i].Id,
                name : data[i].Title,
                routerLink : `Courses/${data[i].Id}`,
                children : this.createTreeViewData(data[i].Modules, "Modules"),
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

      createTreeViewData(model, type) 
      {
          const treeViewData = [];

          if (!model) 
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
            case "Modules":
              childType = "Sessions";
              break;
            case "Sessions":
              childType = "Students";
              break;
            case "Students":
              childType = ""
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
              routerLink : `${type}/${model[i].Id}`,
              children : this.createTreeViewData(this.GetPropertyValue(model[i], childType), childType),
            };

            treeViewData.push(item);
            this.models.push(model[i]);
          }
        
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
  
