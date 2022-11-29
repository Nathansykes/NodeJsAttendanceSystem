<template>
    <div id="upload">
        <body>
            <h3>CSV Upload</h3>
            <form>
                <div class="form-group">
                    <div class="row justify-content-center">
                        <div class="col-md-6 col-offset">
                            <div class="input-group">
                                <input class="form-control" name="UploadFile" type="file" @change="handleFileUpload">
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
            <div v-if="uploadSuccess != null">
                <p v-if="uploadSuccess === true">{{ response }}</p>
                <p v-if="uploadSuccess === false" style="white-space: pre-wrap;">{{ response }}</p>
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
                    })
                    .catch(e => {
                        this.handleErrors(e);
                    });
                    break;
                case this.fileTypes[1]:
                    UploadFileService.uploadAttendanceFile(this.file).then(response => {
                        if (response.status == 200) {
                            this.uploadSuccess = true;
                            this.response = response.data.message;
                        }
                    })
                    .catch(e => {
                        this.handleErrors(e);
                    });
                    break;
            }
            
        },
        handleErrors(e) {
            var response = e.response;
            if (response.status == 400) {
                this.uploadSuccess = false;
                var errors = [];
                Object.keys(response.data.result).forEach(function (key) {
                    var val = response.data.result[key];
                    errors.push(key + ': '+ val);
                });
                this.response = response.data.message + "\n" + errors.join("\n");
            }
            console.log(e);
        }
    }
}
</script>