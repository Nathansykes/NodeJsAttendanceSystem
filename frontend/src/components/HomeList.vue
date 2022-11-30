<template>
    <div class="list row">
      <div class="col-md-12">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by name"
            v-model="name"/>
            <select class="form-select" @change="filterTypeChange($event)">
              <option v-for="modelType in modelTypes" :key="modelType.Id" :value="modelType.Id">{{modelType.PathName}}</option>
            </select>
            <UserSelectList v-if="isUsersSelected()" @selectUserType="(value) => updateUserType(value)"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="refresh"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <TreeItem :model="treeViewData" @selectedModel="(value) => setActiveModel(value)"/>
      </div>
      <div class="col-md-6">
        <div v-if="currentModel" class="card text-white bg-primary mb-3" style="max-width: 20rem;">
          <div class="card-header">Details</div>
          <div class="card-body">
              <div v-for="(property) in currentModelProperties"
                :key="property">
                <label v-if="property.key === 'DateAndTime'" class="form-label mt-4">Date: {{property.value}}</label>
                <label v-else class="form-label mt-4">{{property.key}}: {{property.value}}</label>
              </div>
              <div>
                <router-link :to="`/attendance/${currentModel.Id}`" class="btn btn-light" v-if="currentModel.Type.Name === 'Sessions'">Attendance</router-link>
              </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
  import ModelDataService from "../services/models.data.service";
  import ModelTypes from '../../../shared/modelTypes';
  import UserSelectList from "./shared/UserSelectList.vue";
  import TreeItem from './shared/TreeItem.vue'
  import ObjectHelper from "@/helpers/object.helper";
  import UserTypes from "../../../shared/usertypes";

  export default {
    name: "courses-list",
    components: {
      TreeItem,
      UserSelectList
    },
    data() {
      return {
        models: [],
        treeViewData: [],
        currentModel: null,
        currentModelProperties: [],
        currentIndex: -1,
        name: "",
        modelTypes: ModelTypes,
        selectedModelType: null,
        selectedUserType: null,
        thisUserAccess : null,
      };
    },
    methods: {
      filterTypeChange(event)
      {
        this.selectedModelType = event.target.value;
        this.refresh();
      },

      refresh()
      {
        switch (this.selectedModelType)
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

      updateUserType(value)
      {
        this.selectedUserType = value;
        this.retrieveUsers();
      },

      retrieveCourses() {
        if(this.thisUserAccess == UserTypes.CourseLeader.Id){
          console.log("Test");
        }
        ModelDataService.CourseDataService.findByName(this.name)
          .then(response => this.treeViewData = this.createTreeViewData(JSON.parse(response.data), ModelTypes.Course))
          .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));
      },

      retrieveModules() {

        switch (this.thisUserAccess) {
          case UserTypes.Tutor.Id:
                      console.log("user is tutor");
                      ModelDataService.ModuleDataService.findByName(this.name)
                      .then(response => 
                      {
                        let res = JSON.parse(response.data);
                        res.forEach(x => {
                          if(x.Tutors){
                            x.Tutors.forEach(y =>{
                              if(ModelDataService.HTTPCommonDataService.getApplicationUser().Id == y.Id){
                                console.log("If hit");
                                this.treeViewData = this.createTreeViewData(x, ModelTypes.Module)
                              }
                            })
                          }
                        });
                      })
                      
                      .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));
            break;

          case UserTypes.ModuleLeader.Id:
                      ModelDataService.ModuleDataService.findByName(this.name)
                      .then(response => 
                      {
                        let res = JSON.parse(response.data);
                        res.forEach(x => {
                          if(x.ModuleLeader){
                              if(ModelDataService.HTTPCommonDataService.getApplicationUser().Id == x.ModuleLeader){
                                this.treeViewData = this.createTreeViewData(x, ModelTypes.Module)
                              }
                            
                          }
                        });
                      })
                      
                      .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));
              break;
          default:
                console.log("else hit");
                ModelDataService.ModuleDataService.findByName(this.name)
                .then(response => this.treeViewData = this.createTreeViewData(JSON.parse(response.data), ModelTypes.Module))
                .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));


            break;
        }

      },

      retrieveSessions() {
        ModelDataService.SessionDataService.findByName(this.name)
          .then(response => this.treeViewData = this.createTreeViewData(JSON.parse(response.data), ModelTypes.Session))
          .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));
      },

      retrieveUsers() {
        const names = this.name.split(" ");
        ModelDataService.UserDataService.findByName(this.selectedUserType, names[0], names[1])
          .then(response => this.treeViewData = this.createTreeViewData(JSON.parse(response.data), ModelTypes.User))
          .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));
      },

      isUsersSelected()
      {
        return this.selectedModelType === ModelTypes.User.Id.toString();
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
            model[i].Type = type;

            let item =
            {
              id : model[i].Id,
              name : model[i].Title || (`${model[i].FirstName} ${model[i].LastName}`),
              routerLink : `${type.PathName}/${model[i].Id}`,
            };
            if (type === ModelTypes.Session) 
            {
              var date = new Date(model[i].DateAndTime);
              item.date = date;
            }

            if (childType)
            {
              item.children = this.createTreeViewData(ObjectHelper.GetPropertyValue(model[i], childType.Name), childType);

              if (childType === ModelTypes.Session)
              {
                var TitleSessions = Array.from(new Set(item.children.map(item => item.name)));
                var sessions = []

                TitleSessions.map(title => {

                  var filterChildren = item.children.filter(child => child.name === title);
                  var sortChildren = filterChildren.sort((a, b) => a.date - b.date);
                  sortChildren.map(child => child.name = ` ${child.date.toLocaleDateString()}`)

                  sessions.push({
                    id : 0,
                    name : title,
                    routerLink : "",
                    children : sortChildren,
                  })
                })

                item.children = sessions;
              }
            }

            treeViewData.push(item);
            this.models.push(model[i]);
          }

          return treeViewData;
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
        this.currentModelProperties = ObjectHelper.GetProperties(this.currentModel);
      },
    },
    mounted() {
      this.thisUserAccess = ModelDataService.HTTPCommonDataService.getApplicationUser().UserTypeId;

      switch (this.thisUserAccess) {
        case UserTypes.Tutor.Id:
            this.retrieveModules();
          break;
        case UserTypes.ModuleLeader.Id:
            this.retrieveModules();
          break;
      
        default:
            this.retrieveCourses();
          break;
      }
      
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