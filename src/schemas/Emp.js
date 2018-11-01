/*
The label in forms is determind by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
export default {
	entity: 'employee',
	forms: {
		insert: {
			steps: 2,
			steps: [
				{
					fields: [
					{
						field:'fname',
						placeholder: 'First Name',
						style:{
							width: '80%'
						}
					},
					{
						field:'fname_t',
						placeholder: 'First Name',
						style:{
							width: '80%'
						}
					},					
					{
						field: 'sname',
						style:{
							width: '80%'
						}
					},
					{
						field:'fname_t',
						style:{
							width: '80%'
						}
					},					
					],
					format:[2,2]
				},
			],
		},
		
		update: {
			steps: 2,
			steps: [
				{},
				{},
			]
		}		
	},

	fields:{
		emp_name:{
			dataIndex:'name',
			updateable:false,
	      insertable:false,
	      order:1,
	      type:'text',
	      inputMethod:'input',
	      insert:true,
	      sorter: true,
	      align: 'right',

	   },
	   fname:{

	      updateable:false,
	      insertable:true,
	      order:2,
	      type:'text',
	      inputMethod:'input',
	      sorter: true,
	      align: 'right',	      
	      inputRules:[  
	         {  
	            required:true,
	            message:'This field is required'
	         },
	         {  
	            min:2,
	            message:' minimum 2 charecter'
	         }         
	      ],
	      
	   },
	   sname:{  
	      updateable:false,
	      insertable:true,
	      order:3,
	      type:'text',
	      inputMethod:'input',
	      sorter: true,
	      align: 'right',	      
	      inputRules:[  
	         {  
	            required:true,
	            message:'This field is required'
	         },
	         {  
	            min:2,
	            message:' minimum 2 charecter'
	         }         
	      ],
	      

	   },
	   fname_t:{  
	      updateable:true,
	      insertable:true,
	      order:4,
	      type:'text',
	      inputMethod:'input',
	      
	      inputRules:[  
	         {  
	            required:true,
	            message:'This field is required'
	         },
	         {  
	            min:2,
	            message:' minimum 2 charecter'
	         }         
	      ],
	      required : no	      

	   },
	   sname_t:{  
	      updateable:true,
	      insertable:true,
	      order:5,
	      type:'text',
	      inputMethod:'input',
	      inputRules:[  
	         {  
	            required:true,
	            message:'This field is required'
	         },
	         {  
	            min:2,
	            message:' minimum 2 charecter'
	         }         
	      ],
	      required : no	 	      

	   },
	   user_name:{  
	      updateable:true,
	      insertable:true,
	      order:1,
	      type:'text',
	      inputMethod:'input',
	      inputRules:[  
	         {  
	            required:true,
	            message:'This field is required'
	         },
	      ],	      

	   },
	   dept_name:{  
	      updateable:true,
	      insertable:true,
	      order:1,
	      type:'text',
	      inputMethod:'input',
	      inputRules:[  
	         {  
	            required:true,
	            message:'This field is required'
	         },
	      ],	      
	   },

	}
}
