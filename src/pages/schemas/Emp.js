/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const emp = { 
  "entity": "employee",
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
            }            
          ],
          "format": [
            [0],[1]            
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
            }
          ],
          "format": [
            [0]
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
            }
          ],
          "format": [
            [0]            
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
      "updateable": false,
      "insertable": false,
      "required": false
    },  	
    "emp_number": {
      "dataIndex": "emp_name",
      "updateable": false,
      "insertable": false,
      "order": 1,
      "type": "text",
      "inputMethod": "input",
      "insert": true,
      "sorter": true,
      "defaultValue":{
      	"field": ["fname","sname"]
      }      
    },
    "emp_number": {
      "dataIndex":"name",
      "updateable": false,
      "insertable": true,
      "order": 2,
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
      "updateable": false,
      "insertable": true,
      "order": 2,
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
      "updateable": false,
      "insertable": true,
      "order": 3,
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
      "updateable": true,
      "insertable": true,
      "order": 4,
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
      "updateable": true,
      "insertable": true,
      "order": 5,
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
    "user_name": {
      "updateable": true,
      "insertable": true,
      "dataIndex": "user_name",
      "order": 6,
      "type": "text",
      "sorter": true,
      "inputMethod": "select",
      "chooser": "users",
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        }
      ]
    },
    "dept_name": {
      "updateable": true,
      "insertable": true,
      "dataIndex": "dept_name",
      "order": 7,
      "type": "text",
      "sorter": true,
      "inputMethod": "select",
      "chooser" : "departments",
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