/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const part = { 
  "entity": "part",
  "title" :"Parts",

  "functions" : [
    {
      "name": "Clone",
      "function" : "clone"
    }
  ],

  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Details",
          "fields": [
            {
              "field": "part_name",
              "placeholder": "Part Name",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "revision",
              "placeholder": "Revision",
              "style": {
                "width": "80%",
              }
            },            
            {
              "field": "active",
              "placeholder": "Active?",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "part_status",
              "placeholder": "Status",
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
            } 
          ],
          "format": [
            [0,1],
            [2,3],
            [4]            
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
              "field": "part_name",
              "placeholder": "Part Name",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "revision",
              "placeholder": "Revision",
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
              "field": "active",
              "placeholder": "Active?",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "part_status",
              "placeholder": "Status",
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
            } 
          ],
          "format": [
            [0,1],
            [2],
            [3,4],
            [5]
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

    "part_name": {
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
    "revision": {
      "dataIndex":"revision",
      "inputMethod": "input",
      "sorter": true,
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        },
      ]
    }, 
    "description": {
      "updateable": false,
      "dataIndex": "description",
      "insertable": true,
      "inputMethod": "textArea",
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
      "dataIndex":"active",
      "inputMethod": "bool",
      "sorter": true,
    },
    "part_status": {
      "updateable": true,
      "insertable": true,
      "dataIndex": "part_status",
      "sorter": true,
      "inputMethod": "select",
      "chooser": "part_status",
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        }
      ]
    },
    "tags": {
      "inputMethod": "tags",
    },
    "bom": {
      "link" : '/router/bom',      
    },
    "locations": {
      "link" : '/router/locations',      
      "son" : true
    },    
  }
}
export {part}