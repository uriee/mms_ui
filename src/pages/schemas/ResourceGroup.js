/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const resourceGroup = { 
  "entity": "resource_group",
  "title": "Resource Groups",  
  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Identifiers",
          "fields": [
            {
              "field": "group_name",
              "placeholder": "Group Name",
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
              "field": "resource_names",
              "placeholder": "Resources In Group",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "tags",
              "placeholder": "Tags",
              "style": {
                "width": "100%"
              }
            },             
          ],
          "format": [
            [0,1],
            [2],
            [3]     
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
            [0],
            [1]
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
            [0],
            [1]
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
              "field": "group_name",
              "placeholder": "Group Name",
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
              "field": "resource_names",
              "placeholder": "Resources In Group",
              "style": {
                "width": "80%",
              }
            } ,
            {
              "field": "tags",
              "placeholder": "Tags",
              "style": {
                "width": "100%"
              }
            },             
          ],
          "format":  [
            [0,1],
            [2],
            [3]     
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
    "group_name": {
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
      "dataIndex" : "active",
      "type": "text",
      "inputMethod": "bool",
      "defaultValue": true,
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
    },
    "tags": {
      "inputMethod": "tags",
      "align": "right",
    },   
  
    "resource_names": {
      "dataIndex": "resource_names",
      "type": "array",
      "sorter": true,
      "inputMethod": "tags",
      "chooser" : "resources",
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        }
      ]
    },
    "resource_types": {
      "dataIndex": "resource_types",
      "required": false,
    } 
  }
}
export {resourceGroup}