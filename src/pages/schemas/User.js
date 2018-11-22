/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const user = { 
  "entity": "user",
  "title": "Users",  
  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Identifiers",
          "fields": [
            {
              "field": "user_name",
              "placeholder": "User Name",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "currentAuthority",
              "placeholder": "Profile Name",
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
          "title": "Password",     	
          "fields": [
            {
              "field": "password",
              "placeholder": "Enter Password",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "password2",
              "placeholder": "Repeat Password",
              "style": {
                "width": "80%"
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
    "update": {
      "steps": [
        {
          "title": "Identifiers",
          "fields": [
            {
              "field": "user_name",
              "placeholder": "User Name",
              "style": {
                "width": "80%",
              }
            },
            {
              "field": "currentAuthority",
              "placeholder": "Profile Name",
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
          "title": "Info",
          "fields": [
            {
              "field": "title",
              "placeholder": "Title",
              "style": {
                "width": "100%"
              }
            },
            {
              "field": "email",
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
          "title": "Tags",
          "fields": [
            {
              "field": "tags",
              "placeholder": "Tags",
              "style": {
                "width": "100%"
              }
            },
          ],
          "format": [
            [0],
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
    "user_name": {
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
    "currentAuthority": {
      "updateable": true,
      "insertable": true,
      "dataIndex": "currentAuthority",
      "order": 7,
      "type": "text",
      "sorter": true,
      "inputMethod": "select",
      "chooser" : "profiles",
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        }
      ]
    },
    "email": {
      "updateable": false,
      "insertable": true,
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
    "title": {
      "updateable": false,
      "insertable": true,
      "inputMethod": "input",
      "sorter": true,
      "align": "right",
      "inputRules": [
        {
          "min": 2,
          "message": " minimum 2 character"
        }
      ]
    }, 
    "tags": {
      "inputMethod": "tags",
      "align": "right",
    },   
    "created_at": {
      "updateable": false,
      "insertable": true,
      "sorter": true,
      "align": "right",
      "inputRules": [
        {
          "min": 2,
          "message": " minimum 2 character"
        }
      ]
    }, 
    "password": {
      "align": "right",
      "required": false,      
      "inputRules": [
        {
          "required": true,
          "message": "This field is required"
        },
        {
          "min": 6,
          "message": " minimum 6 character"
        }
      ]
    } ,
    "password2": {
      "required": false,      
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
    }     
  }
}
export {user}