<template>
    <div id="upload">
        <body>
            <h3>CSV Upload</h3>
            <form>
                <input name="UserFile" type="file" @change="handleFileUpload">
                <button type="button" class="btn btn-primary" @click="submitFile">Upload</button>
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
        }
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        submitFile() {
            UploadFileService.uploadUserFile(this.file).then(response => {
                if (response.status == 200) {
                    this.uploadSuccess = true;
                    this.response = response.data.message;
                }
            })
                .catch(e => {
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
                });
        }
    }
}
</script>