<template>
    <div id="upload">
        <body>
            <header>CSV Upload</header>
            <main>
                <form>
                    <label>Select File</label>
                    <input name="UserFile" type="file" @change="handleFileUpload">
                    <button type="submit" @click="submitFile">Upload</button>
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
        uploadFile() {
            UploadFileService.uploadUserFile(this.file)
        }
    }
}
</script>