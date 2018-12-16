/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const mnt_plan_items = { 
  "entity": "mnt_plan_items",
  "title" :"Maintenance Plan's Resources",
  'defaultKey' : 'name',  
  "forms": {
    "insert": {
      "steps": [
        {
          "title": "Resource",
          "fields": [
            {
              "field": "resource_name",
              "placeholder": "Resource Name",
              "style": {
                "width": "80%",
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
          "title": "Resource",
          "fields": [
            {
              "field": "resource_name",
              "placeholder": "Resource Name",
              "style": {
                "width": "80%",
              }
            }
          ],
          "format": [
            [0]
          ]
        }
      ]
    }
  },
  "fields": {
    "id": {
      "required": false
    },
    "name": {
      "dataIndex":"name",
      "sorter": true,
    }, 
    "resource_name": {
      "dataIndex":"resource_name",
      "inputMethod": "select",
      "link" : '/router/resources',       
      "chooser": "resources",      
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
export {mnt_plan_items}