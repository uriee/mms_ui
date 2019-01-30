/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const bom = { 
  "entity": "bom",
  "title" :"Bom",
  'defaultKey' : 'name',    
  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Details",
          "fields": [
            {
              "field": "partname",
              "placeholder": "Part Name",
            },          
            {
              "field": "coef",
              "placeholder": "coef",
            }, 
          ],
          "format": [
            [0],
            [1]
          ]
        },       
      ]
    },
    "update":{
      "steps": [
        {
          "title": "Details",
          "fields": [
            {
              "field": "partname",
              "placeholder": "Part Name",
            },          
            {
              "field": "coef",
              "placeholder": "coef",
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
      "required": false
    },
    "name": {
      "dataIndex":"name",
      "required" : false,      
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
    "coef": {
      "dataIndex":"coef",
      "inputMethod": "number",
      "sorter": true,
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        },
      ]      
    },
    "partname": {
      "dataIndex":"partname",
      "inputMethod": "input",
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
export {bom}