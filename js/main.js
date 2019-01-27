$(document).ready(function() {
	$.ajax({
		type:"GET",
		url :"/freedisk",
		success:(function(data,status){
			
			for(i=0 ; i < data.length ; i++)
			{
				drive = data[i];
				used = parseInt(drive.total) - parseInt(drive.free);
				el = $("#template").html();
				el = el.replace(/{{name}}/g,drive.name);
				el = el.replace(/{{percentage}}/g,parseInt((used*100)/drive.total));

				el = el.replace(/{{used_gb}}/g,((used)/1073741824).toFixed(2));
				el = el.replace(/{{free_gb}}/g,(drive.free/1073741824).toFixed(2));
				el = el.replace(/{{total_gb}}/g,(drive.total/1073741824).toFixed(2));
				$("#drives").append(el);
			}
		})
	});

	$.ajax({
		type:"GET",
		url :"/minidlnastatus",
		success:(function(data,status){
			console.log("print");
			el = $("#minidlnatable").html();
			el = el.replace(/{{audiofiles}}/g,data[0].count);
			el = el.replace(/{{videofiles}}/g,data[1].count);
			el = el.replace(/{{imagefiles}}/g,data[2].count);

			$("#minidlnastatus").append(el);
			
			// $("#minidlnastatus").append(data);
		})
	});

	$(".danger").click(function()
	{
		var href = $(this).attr("href");

		$(".loading").fadeIn();
		$(".message").html($(this).html() + "...");

		$.ajax({
			type:"GET",
			url :href,
			success:(function(data,status){
				$(".loading").fadeOut(2000);
			}),
			error:(function(){
				$(".message").html("Error!");

				$(".loading").fadeOut(function(){
					$(".loading").fadeIn(function(){
						$(".loading").fadeOut(2000);
					});
				});
			})
		});
		return false;
	});
});

