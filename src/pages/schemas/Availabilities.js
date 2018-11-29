/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const availabilities = { 
  "entity": "availabilities",
  "title": "Availabilities",  
  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Availability",
          "fields": [
            {
              "field": "from_time",
              "placeholder": "from time",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "to_time",
              "placeholder": "to time",
              "style": {
                "width": "80%",
              }
            }            
          ],
          "format": [
            [0,1]
          ]
        },
      ]
    },
    "update": {
       "steps": [
        {
          "title": "Availability",
          "fields": [
            {
              "field": "from_time",
              "placeholder": "from time",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "to_time",
              "placeholder": "to time",
              "style": {
                "width": "80%",
              }
            }            
          ],
          "format": [
            [0,1]
          ]
        },
      ]
    }
  },    
  "fields": {
    "id": {
      "required": false
    },  	
    "availability_profile_name": {
      "dataIndex":"name",
      "sorter": true,
      "align": "right",
    },    
    "from_time": {
      "inputMethod": "time",
      "defaultValue": 0,
      "sorter": true,
      "align": "right",
    }, 
    "to_time": {
      "inputMethod": "time",
      "defaultValue": 0,
      "sorter": true,
      "align": "right",
    },
    "weekday": {
      "inputMethod": "input",
      "defaultValue": 0,
      "sorter": true,
      "align": "right",
    },                
  }

}
export {availabilities}