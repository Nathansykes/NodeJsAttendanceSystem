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
        <ul class="list-group" v-for="(course, index) in courses"
            :key="index">
          <TreeItem :model="course"/>
          <!-- <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(course, index) in courses"
            :key="index"
            @click="setActiveCourse(course, index)"
          >
            {{ course._id }}
            <br/>
            {{ course.Title }}
          </li> -->
        </ul>
  
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
                children : this.createTreeViewData(ModuleDataService.get, data[i].Modules),
              }

              this.courses.push(course);
            }
          })
          .catch(error => 
          {
            console.log(error);
          });
      },

      createTreeViewData(getData, ids) 
      {
        const collection = [];

        getData(ids).then(response => 
        {
          let data = JSON.parse(response.data);
          
          if (!data) 
          {
            return;
          }
          
          // switch(type) 
          // {
          //   case "Modules":
          //     getData = CourseDataService.get;
          //     break;
          //     default:
          //       break;
          // }
  
          for (let i = 0; i < data.length; i++) 
          {
            let item = 
            {
              name : data[i].Title,
              children : [],
            };
            collection.push(item);
          }
        })
        
        return collection;
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