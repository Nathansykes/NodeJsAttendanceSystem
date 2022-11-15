<template>
    <div id="upload">
        <body>
            <header>CSV Upload</header>
            <main>
                <form>
                    <label>Select File</label><input name="CSVFile" type="file">


                </form>
                
            </main>
            
        </body>
        
    </div>
        
    
</template>

<script>


import UserDataService from '../services/user.data.service';

export default{
    name:"app",
    methods: {
        upload(){            
            // UserDataService.login({File: this.userId).then(response => 
            // {
                
            // })
            // .catch(error => 
            // {
            //     console.log(error);
            // });
        }
    }
}
</script>