/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const resource = { 
  "entity": "resource",
  "title": "Resources",  
  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Identifiers",
          "fields": [
            {
              "field": "resource_name",
              "placeholder": "Resource Name",
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
          ],
          "format": [
            [0,1]
          ]
        },
        {
          "title": "Details",
          "fields": [
            {
              "field": "dept_name",
              "placeholder": "Department",
              "style": {
                "width": "80%",
                "align": "center"
              }
            },
            {
              "field": "ap_name",
              "placeholder": "Availability",
              "style": {
                "width": "80%",
                "align": "center"
              }
            }            
          ],
          "format": [
            [0],[1]
          ]
        }
      ]
    },
    "update": {
      "steps": [
        {
          "title": "Identifiers",
          "fields": [
            {
              "field": "resource_name",
              "placeholder": "Resource Name",
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
            }
          ],
          "format": [
            [0,1]
          ]
        },     
        {
          "title": "Details",
          "fields": [
            {
              "field": "dept_name",
              "placeholder": "Department",
              "style": {
                "width": "100%"
              }
            },
            {
              "field": "ap_name",
              "placeholder": "Department",
              "style": {
                "width": "100%"
              }
            }            
          ],
          "format": [
            [0],
            [1]
          ]
        }
      ]
    }
  },
  "fields": {
    "id": {
      "required": false
    },  	
    "resource_name": {
      "dataIndex":"name",
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
    "active": {
      "dataIndex": "active",      
      "inputMethod": "bool",
      "defaultValue": true,
      "sorter": true,
      "align": "right",
    },  
    "type": {
      "dataIndex": "type",      
      "sorter": true,
      "align": "right",
    },       
    "dept_name": {
      "dataIndex": "dept_name",
      "link" : '/router/departments',      
      "type": "text",
      "sorter": true,
      "inputMethod": "select",
      "chooser": "departments",
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        }
      ]
    },    
    "ap_name": {
      "dataIndex": "ap_name",
      "link" : '/router/availability_profiles',      
      "type": "text",
      "sorter": true,
      "inputMethod": "select",
      "chooser" : "availability_profiles",
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        }
      ]
    }
  }
}
export {resource}