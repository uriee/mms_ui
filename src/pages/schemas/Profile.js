/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const profile = { 
  "entity": "profile",
  "title" :"Profiles",
  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Details",
          "fields": [
            {
              "field": "profile_name",
              "placeholder": "Profile Name",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "active",
              "placeholder": "Type",
              "style": {
                "width": "80%",
              }
            }

          ],
          "format": [
            [0,1]
          ]
        },
        {
          "title": "Descriptions",
          "fields": [
            {
              "field": "description",
              "placeholder": "Description in English",
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
            [0],
            [1],
          ]
        }        
      ]
    },
    "update": {
      "steps": [
        {
          "title": "Details",
          "fields": [
            {
              "field": "profile_name",
              "placeholder": "Profile Name",
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
              "field": "description",
              "placeholder": "Description",
              "style": {
                "width": "80%",
              }
            }
          ],
          "format": [
            [0,1],
            [2],
          ]
        },
      ]
    }
  },
  "fields": {
    "id": {
      "required": false
    },

    "profile_name": {
      "dataIndex":"name",
      "inputMethod": "input",
      "sorter": true,
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
      "dataIndex": "description",
      "inputMethod": "textArea",
      "sorter": true
    },
    "description_t": {
      "inputMethod": "textArea",
      "sorter": true,
      "required": false,      
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        }
      ]
    },    

    "active": {
      "dataIndex":"active",
      "inputMethod": "bool",
      "sorter": true,
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        },
      ]
    },
  }
}
export {profile}