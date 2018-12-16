/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const availabilityProfile = { 
  "entity": "availability_profile",
  "title": "Availability_profiles",  
  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Identifiers",
          "fields": [
            {
              "field": "availability_profile_name",
              "placeholder": "Availability_profile Name",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "active",
              "placeholder": "Active",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "tags",
              "placeholder": "tags",
              "style": {
                "width": "100%",
              }
            }                                   
          ],
          "format": [
            [0,1],
            [2]
          ]
        },
        {   
          "title": "Description",     	
          "fields": [
            {
              "field": "description",
              "placeholder": "Description",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "description_t",
              "placeholder": "Description",
              "style": {
                "width": "80%",
              }
            }            
          ],
          "format": [
            [0],[1]
          ]
        },
      ]
    },
    "update": {
      "steps": [
        {
          "title": "Identifiers",
          "fields": [
            {
              "field": "availability_profile_name",
              "placeholder": "Availability_profileloyee Name",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "active",
              "placeholder": "Active",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "tags",
              "placeholder": "tags",
              "style": {
                "width": "100%",
              }
            }                         
          ],
          "format": [
            [0,1],
            [2]
          ]
        },      
        {
          "title": "Description",
          "fields": [
            {
              "field": "description",
              "placeholder": "Description",
              "style": {
                "width": "100%"
              }
            },
 
          ],
          "format": [
            [0]
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
      "link" : '/router/availabilities',      
      "inputMethod": "input",
      "sorter": true,
      "align": "right",
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        },
        {
          "min": 2,
          "message": " minimum 2 character"
        }
      ]
    },    
    "description": {
      "type": "text",
      "dataIndex":"description",
      "inputMethod": "input",
      "sorter": true,
      "align": "right",
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        },
        {
          "min": 2,
          "message": " minimum 2 character"
        }
      ]
    },
    "description_t": {
      "inputMethod": "textArea",
      "sorter": true,
      "align": "right",
      "required": false,      
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        },
        {
          "min": 5,
          "message": " minimum 5 character"
        }
      ]
    },    
    "active": {
      "type": "text",
      "inputMethod": "bool",
      "defaultValue": true,
      "sorter": true,
      "align": "right",
    },
    "tags": {
      "inputMethod": "tags",
      "align": "right",
    } 
  }
}
export {availabilityProfile}