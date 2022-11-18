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
          <TreeItem :model="courses"/>

      </div>
      <div class="col-md-6">
        <div v-if="currentCourse">
          <h4>Course</h4>
          <div>
            <label><strong>Id:</strong></label> {{ currentCourse._id }}
          </div>
          <div>
            <label><strong>Title:</strong></label> {{ currentCourse.Title }}
          </div>
  
          <router-link :to="'/courses/' + currentCourse._id" class="badge badge-warning">Edit</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on an Course...</p>
        </div>
      </div>
    </div>
  </template>
  
<script>
  import CourseDataService from "../services/course.data.service";
  import ModuleDataService from "../services/module.data.service";
  import SessionDataService from "../services/session.data.sevice";
  import TreeItem from './shared/TreeItem.vue'
  
  export default {
    name: "courses-list",
    components: {
      TreeItem
    },
    data() {
      return {
        courses: [],
        currentCourse: null,
        currentIndex: -1,
        title: "",
      };
    },
    methods: {
      retrieveCourses() {
        CourseDataService.getAll()
          .then(response => 
          {
            const data = JSON.parse(response.data);

            for (var i = 0; i < data.length; i++) 
            {
              var course = 
              {
                name : data[i].Title,
                children : this.createTreeViewData(ModuleDataService.get, data[i].Modules, "Modules"),
              }

              this.courses.push(course);
            }
            console.log(this.courses);
          })
          .catch(error => 
          {
            console.log(error);
          });
      },

      createTreeViewData(getData, ids, type) 
      {
        const collection = [];

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
              getData = SessionDataService.get;
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
              name : data[i].Title,
              children : this.createTreeViewData(SessionDataService.get, this.GetPropertyValue(data[i], "Sessions")),
            };
            collection.push(item);
          }
        })
        
        return collection;
      },

      GetPropertyValue(obj1, dataToRetrieve) 
      {
        return dataToRetrieve
          .split('.') // split string based on `.`
          .reduce(function(o, k) {
            return o && o[k]; // get inner property if `o` is defined else get `o` and return
          }, obj1) // set initial value as object
      },
  
      refreshList() {
        this.retrieveCourses();
        this.currentCourse = null;
        this.currentIndex = -1;
      },
  
      setActiveCourse(course, index) {
        this.currentCourse = course;
        this.currentIndex = course ? index : -1;
      },
      
      searchName() {
        CourseDataService.findByName(this.title)
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