/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const machine = { 
  "entity": "machine",
  "title": "Machines",  
  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Identifiers",
          "fields": [
            {
              "field": "machine_name",
              "placeholder": "Machine Name",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "mac_address",
              "placeholder": "MacAddress",
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
            [0],[1],[2]
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
              "field": "machine_name",
              "placeholder": "Machineloyee Name",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "mac_address",
              "placeholder": "MacAddress",
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
            [0,2],[1]            
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
    "machine_name": {
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
    "mac_address": {
      "dataIndex":"mac_address",
      "type": "text",
      "inputMethod": "input",
      "defaultValue": "00:00:00:00:00:00",
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
      "link" : '/router/ap',      
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
export {machine}