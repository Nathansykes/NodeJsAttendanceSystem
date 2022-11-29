<template>
    <div id="upload">
        <body>
            <h3>CSV Upload</h3>
            <form>
                <div class="form-group">
                    <div class="row justify-content-center">
                        <div class="col-md-6 col-offset">
                            <div class="input-group">
                                <input class="form-control" name="UploadFile" type="file" accept=".csv text/csv" @change="handleFileUpload">
                                <span class="input-group-text">.csv</span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group">
                                <select class="form-select" @change="selectFileType">
                                    <option selected disabled>Select Upload Type</option>
                                    <option v-for="fileType in fileTypes" :key="fileType" :value="fileType">{{fileType}}</option>
                                </select>
                                <button type="button" class="btn btn-primary" @click="submitFile">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <br />
            <div v-if="uploadSuccess === true || uploadSuccess === false" class="alert alert-dismissible" :class="uploadSuccess === true ? 'alert-success' : 'alert-warning'">
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                <h4 class="alert-heading">{{uploadSuccess === true ? 'Success' : 'Error'}}</h4>
                <p v-if="uploadSuccess === true">{{ response }}</p>
                <p v-if="uploadSuccess === false" style="white-space: pre-wrap;">{{ response }}</p>
              </div>
            <div >
            </div>
        </body>
    </div>


</template>

<script>


import UploadFileService from '../services/uploadfile.data.service';

export default {
    name: "app",
    data() {
        return {
            file: null,
            response: null,
            uploadSuccess: null,
            fileTypes: ["Users","Attendance Records"],
            selectedFileType: null
        }
    },
    methods: {
        selectFileType(event) {
            this.selectedFileType = event.target.value;
        },
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        submitFile() {
            switch (this.selectedFileType){
                case this.fileTypes[0]:
                    UploadFileService.uploadUserFile(this.file).then(response => {
                        if (response.status == 200) {
                            this.uploadSuccess = true;
                            this.response = response.data.message;
                        }
                        else {
                            this.handleErrors(response);
                        }
                    })
                    break;
                case this.fileTypes[1]:
                    UploadFileService.uploadAttendanceFile(this.file).then(response => {
                        if (response.status == 200) {
                            this.uploadSuccess = true;
                            this.response = response.data.message;
                        }
                        else{
                            this.handleErrors(response);
                        }
                    })
                    break;
            }
            
        },
        handleErrors(e) {
            var response = e.response;
            if (response.status == 400) {
                console.log("is 400");
                this.uploadSuccess = false;
                var errStr = "";
                if(response.data.result) {          
                    Object.keys(response.data.result).forEach(function (key) {
                        var val = response.data.result[key];
                        errStr += key + ': '+ val + '\r\n';
                    });
                }
                console.log("setting response");
                this.response = response.data.message + "\n" + errStr;
            }
            console.log(this.response);
        }
    }
}
</script>