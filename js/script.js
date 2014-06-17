$(document).ready(function()
{
	var i = 1;
	var row, col;
	
	while (i < 5)
	{
		row = Math.floor((Math.random() * 6) + 2);
		col = Math.floor((Math.random() * 5) + 1);
		
		if( $(".content table tr:nth-child("+ row +") td:nth-child("+ col +")").hasClass("pink") ) 
		{

		}
		else
		{
			$(".content table tr:nth-child("+ row +") td:nth-child("+ col +")").addClass("pink");
			i++;
		}
	}

	// $('td.cell').click(function(){
		// $(this).append('<img src="images/hor-connector1.png" alt="">');
	// });
});