/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const malfunction_types = { 
  "entity": "malfunction",
  "title": "Malfunctions",  
  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Identifiers",
          "fields": [
            {
              "field": "malfunction_type_name",
              "placeholder": "Malfunction Type Name",
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
            [2]
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
              "field": "malfunction_type_name",
              "placeholder": "Malfunction Type Name",
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
    },
  },
  "fields": {
    "id": {
      "required": false
    },    
    "malfunction_type_name": {
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
  }
}
export {malfunction_types}