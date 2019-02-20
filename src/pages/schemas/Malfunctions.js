/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const malfunctions = { 
  "entity": "malfunction",
  "title": "Malfunctions",  
  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Identifiers",
          "fields": [
            {
              "field": "malfunction_name",
              "placeholder": "Malfunction Name",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "dead",
              "placeholder": "Dead",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "status",
              "placeholder": "Status",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "type",
              "placeholder": "Type",
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
              "field": "equipment_name",
              "placeholder": "Availability",
              "style": {
                "width": "80%",
                "align": "center"
              }
            },
            {
              "field": "open_date",
              "placeholder": "Open Date",
              "style": {
                "width": "80%",
              },
            },  
            {
              "field": "close_date",
              "placeholder": "Close Date",
              "style": {
                "width": "80%",
              }              
            },
          ],
          "format": [
            [0],
            [1,2],
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
              "field": "malfunction_name",
              "placeholder": "Malfunction Name",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "dead",
              "placeholder": "Dead",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "status",
              "placeholder": "Status",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "type",
              "placeholder": "Type",
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
          "title": "Description",       
          "fields": [
            {
              "field": "description",
              "placeholder": "Description",
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
          "title": "Details",
          "fields": [
            {
              "field": "equipment_name",
              "placeholder": "Availability",
              "style": {
                "width": "80%",
                "align": "center"
              }
            },
            {
              "field": "open_date",
              "placeholder": "Open Date",
              "style": {
                "width": "80%",
              }
            },  
            {
              "field": "close_date",
              "placeholder": "Close Date",
              "style": {
                "width": "80%",
              }              
            },
          ],
          "format": [
            [0],
            [1,2],
          ]
        }
      ]
    },
  },
  "fields": {
    "id": {
      "required": false
    },    
    "malfunction_name": {
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
      "align": "right"
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
          "min": 3,
          "message": " minimum 5 character"
        }
      ]
    },    
    "status": {
      "dataIndex": "status",       
      "inputMethod": "select",
      "selectValues" : ['Open', 'Under Treatment', 'Closed'],      
      "defaultValue": 'Open',
      "sorter": true,
    }, 
    "dead": {
      "dataIndex": "dead",       
      "inputMethod": "bool",
      "sorter": true,
      "align": "right",
    },
    "close_date": {
      "dataIndex": "close_date",       
      "inputMethod": "timestamp",
      "sorter": true,
    },
    "open_date": {
      "dataIndex": "open_date",      
      "inputMethod": "timestamp",
      "sorter": true,
    },        
    "type": {
      "dataIndex": "type",
      "link" : '/router/malfunction_types',      
      "sorter": true,
      "inputMethod": "select",
      "chooser": "malfunction_types",
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        }
      ]
    },    
    "equipment_name": {
      "dataIndex": "equipment_name",
      "link" : '/router/equipments',      
      "type": "text",
      "sorter": true,
      "inputMethod": "select",
      "chooser" : "equipments",
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
    }     
  }
}
export {malfunctions}