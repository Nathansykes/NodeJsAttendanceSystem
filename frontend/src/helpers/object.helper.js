class ObjectHelper 
{
    GetPropertyValue(obj1, dataToRetrieve) 
      {
        if (!dataToRetrieve) { return; }

        return dataToRetrieve
          .split('.') // split string based on `.`
          .reduce(function(o, k) {
            return o && o[k]; // get inner property if `o` is defined else get `o` and return
          }, obj1) // set initial value as object
      }

      GetProperties(obj) 
      {
        var dictionary = [];
        
        for(var key in obj) 
        {
            if(Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] !== 'function' && !Array.isArray(obj[key])) 
            {
                if (key !== "Id" && key !== "__v" && key !== "Type")
                {
                  if (key === "DateAndTime") 
                  {
                    var date = new Date(obj[key]);
                    obj[key] = date.toLocaleString();
                  }
                  dictionary.push( { key : key, value : obj[key] });
                }
            }
        }
        return dictionary.sort();
      }

      GetObjectFromProperties(properties)
      {
        var obj = {};
        properties.forEach(property => {
          obj[property.key] = property.value;
        });
        return obj;
      }
}

export default new ObjectHelper();