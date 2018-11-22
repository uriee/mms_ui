/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const dept = { 
  "entity": "dept",
  "title" :"Departments",
  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Details",
          "fields": [
            {
              "field": "dept_name",
              "placeholder": "Department Name",
              "style": {
                "width": "80%",
              }
            },
          ],
          "format": [
            [0]
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
      "steps":[
        {
          "title": "Details",
          "fields": [
            {
              "field": "dept_name",
              "placeholder": "Department Name",
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
            [0],
            [1]
          ]
        },
      ]
    }
  },
  "fields": {
    "id": {
      "updateable": false,
      "insertable": false,
      "required": false
    },

    "dept_name": {
      "dataIndex":"name",
      "updateable": false,
      "insertable": true,
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
      "updateable": false,
      "dataIndex": "description",
      "insertable": true,
      "inputMethod": "input",
      "sorter": true,
      "align": "right",
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
    "description_t": {
      "updateable": false,
      "insertable": true,
      "inputMethod": "input",
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
  }
}
export {dept}