<template>
    <div id="upload">
        <body>
            <h3>CSV Upload</h3>
            <br />
            <form>
                <input name="UserFile" type="file" @change="handleFileUpload">
                <button type="button" class="btn btn-primary" @click="submitFile">Upload</button>
            </form>
        </body>
    </div>


</template>

<script>


import UploadFileService from '../services/uploadfile.data.service';

export default {
    name: "app",
    data() {
        return {
            file: null
        }
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        submitFile() {
            UploadFileService.uploadUserFile(this.file).then(response => {
                console.log(response);
            })
                .catch(e => {
                    console.log(e);
                });
        }
    }
}
</script>