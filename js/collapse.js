$(document).ready(function()
{
	$(".spielanleitung h2").click(function() 
	{
		$(".spielanleitung p").slideToggle( "slow" );
		$(".spielanleitung ol").slideToggle( "slow" );
	});
});