<template>
    <div id="upload">
        <body>
            <header>CSV Upload</header>
            <main>
                <form>
                    <label>Select File</label>
                    <input name="UserFile" type="file" @change="handleFileUpload">
                    <button type="button" @click="submitFile">Upload</button>
                </form>

            </main>

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