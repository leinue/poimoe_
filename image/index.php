<html>
	<head>
		<title>poimoe图片服务器</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<style type="text/css">
		<!--
		body
		{
		     font-size: 9pt;
		}
		input
		{
		     background-color: #66CCFF;
		     border: 1px inset #CCCCCC;
		}
		-->
		</style>
	</head>

	<body>

		<form enctype="multipart/form-data" method="post" action="upload.php" name="upform">
		  上传文件:
		  <input name="upfile" type="file">
		  <input type="submit" value="上传"><br>
		  允许上传的文件类型为:<?=implode(', ',$uptypes)?>
		</form>

	</body>
</html>