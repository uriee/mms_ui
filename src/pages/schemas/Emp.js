/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const emp = { 
  "entity": "emp",
  "title": "Employees",  
  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Identifiers",
          "fields": [
            {
              "field": "emp_number",
              "placeholder": "Employee Number",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "user_name",
              "placeholder": "User Name",
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
          "title": "Employee Names",     	
          "fields": [
            {
              "field": "fname",
              "placeholder": "First Name",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "fname_t",
              "placeholder": "First Name",
              "style": {
                "width": "80%"
              }
            },
            {
              "field": "sname",
              "style": {
                "width": "80%"
              }
            },
            {
              "field": "sname_t",
              "style": {
                "width": "80%"
              }
            }
          ],
          "format": [
            [0,1],
            [2,3]
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
              "field": "emp_number",
              "placeholder": "Employee Number",
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
          "title": "Employy Names",
          "fields": [
            {
              "field": "fname",
              "placeholder": "First Name",
              "style": {
                "width": "100%"
              }
            },
            {
              "field": "sname",
              "style": {
                "width": "100%"
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
              "field": "user_name",
              "placeholder": "User Name",
              "style": {
                "width": "100%"
              }
            },
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
            [1],
            [2]
          ]
        }
      ]
    }
  },
  "fields": {
    "id": {
      "required": false
    },  	
    "emp_number": {
      "dataIndex":"name",
      "type": "text",
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
    "fname": {
      "type": "text",
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
    "sname": {
      "type": "text",
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
    "fname_t": {
      "type": "text",
      "inputMethod": "input",
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        },
        {
          "min": 2,
          "message": " minimum 2 character"
        }
      ],
      "required": false,
      "defaultValue":{
      	"field": ["fname"]
      }
    },
    "sname_t": {
      "type": "text",
      "inputMethod": "input",
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        },
        {
          "min": 2,
          "message": " minimum 2 character"
        }
      ],
      "required": false,
      "defaultValue":{
      	"field": ["sname"]
      }      
    },
    "active": {
      "type": "text",
      "inputMethod": "bool",
      "sorter": true,
      "align": "right",
    },    
    "user_name": {
      "dataIndex": "user_name",
      "link" : '/router/users',      
      "type": "text",
      "sorter": true,
      "inputMethod": "select",
      "chooser": "users",
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
export {emp}