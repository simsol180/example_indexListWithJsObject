// an example of how to use a javascript object to index sharepoint query responses
//  check out the associated article here:

//  tested in office365

(function(){"use strict"
	function read(query,list,web){
		var w=web||_spPageContextInfo.webAbsoluteUrl
	    return $.ajax({
	        url: w+"/_api/web/lists/getbytitle('"+list+"')/items?"+query,
	        method: "GET",headers: { "Accept": "application/json; odata=verbose" }
	    });
	}
	
	//storing both indexes in the same index variable to use it like a namespace,  this could just as easily be two variables
	var index={
		list2:{},
		users:{}
	}
	_spBodyOnLoadFunctions.push(function(){
		$.when.apply({},[
			read("$select=Title,AuthorId,Id,List2Id","List1"),
			read("$select=Title,AuthorId,Id","List2"),

			//get's the users from the user information list, 
			//for simplicity, this assumes there aren't many users (because I'm the only *real* user in my site)
			//it also assumes that you have access  to the top of your site, to access the hidden "user information list"
			//honestly, It is way better to use the siteusers's query to grab user info, 
			//I'm doing it this way to illistrate how the people picker is basically a lookup to the hidden user information list
			//you should use the siteusers way: https://stackoverflow.com/questions/51159997/how-to-get-sharepoint-user-by-title-using-rest
			read("$select=Title,Id","User Information List",_spPageContextInfo.siteAbsoluteUrl)
		]).then(function(list1Query,list2Query,usersQuery){
			var list1=list1Query[0].d.results;
			var list2=list2Query[0].d.results;
			var users=usersQuery[0].d.results
			
			$(document).ready(function(){
				var html=$("<table><thead><tr>"+
					"<th>List 1 Title</th>"+
					"<th>List 1 Author</th>"+
					"<th>List 2 Title</th>"+
					"<th>List 2 Author</th>"+
				"</tr></thead></table>");
				
				var tbody=$("<tbody id='thisBody'></tbody>")
				
				html.append(tbody)
				
				$("#displayHere").append(html)
				
				// this is where the indexing happens
				for(var i in list2){
					var row=list2[i];
					index.list2[row.Id]=row;
				}
				for(var i in users){
					var row=users[i];
					index.users[row.Id]=row;
				}
				var html=[]
				for(var i in list1){
					//this is where the indexing is used
					var listOneRow=list1[i];
					var listTwoRow=index.list2[listOneRow.List2Id];//use id stored in List1>List2/Id to get the indexed object from index.list2
					var listOneAuthorRow=index.users[listOneRow.AuthorId];
					var listTwoAuthorRow=index.users[listTwoRow.AuthorId];
					
					tbody.append('<tr>'+
						'<td>'+listOneRow.Title+'</td>'+
						'<td>'+listOneAuthorRow.Title+'</td>'+
						'<td>'+listTwoRow.Title+'</td>'+
						'<td>'+listTwoAuthorRow.Title+'</td>'+
					'</tr>')
				}
			});
		});
	});
})()
