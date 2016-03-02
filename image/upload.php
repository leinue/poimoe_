<?php
/******************************************************************************

参数说明:
$max_file_size  : 上传文件大小限制, 单位BYTE
$destination_folder : 上传文件路径
$watermark   : 是否附加水印(1为加水印,其他为不加水印);

使用说明:
1. 将PHP.INI文件里面的"extension=php_gd2.dll"一行前面的;号去掉,因为我们要用到GD库;
2. 将extension_dir =改为你的php_gd2.dll所在目录;
******************************************************************************/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Credentials: true');
header("Content-type: text/html; charset=utf-8");

function returnMessage($status, $message, $ret = false) {
    if($ret) {
        return json_encode(array('status' => $status, 'message' => $message));
    }
    die(json_encode(array('status' => $status, 'message' => $message)));
}

//上传文件类型列表
$uptypes=array(
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/pjpeg',
    'image/gif',
    'image/bmp',
    'image/x-png'
);

if(!isset($_GET['uid'])) {
    returnMessage(401, '缺少uid');
}

$cors = false;

if(!isset($_GET['cors'])) {
    $cors = false;
}else {
    $cors = true;
}

$corsurl = '';

if($cors) {
    if(!isset($_GET['corsurl'])) {
        returnMessage(401, '指定cors情况下，corsurl不可为空');
    }else {
        $corsurl = $_GET['corsurl'];
    }
}

$max_file_size = 2000000;     //上传文件大小限制, 单位BYTE
$destination_folder = "./upload/".$_GET['uid'].'/'; //上传文件路径
$watermark = 0;      //是否附加水印(1为加水印,其他为不加水印);
$watertype = 1;      //水印类型(1为文字,2为图片)
$waterposition = 1;     //水印位置(1为左下角,2为右下角,3为左上角,4为右上角,5为居中);
$waterstring = "http://www.poimoe.com/";  //水印字符串
$waterimg = "xplore.gif";    //水印图片
$imgpreview = 1;      //是否生成预览图(1为生成,其他为不生成);
$imgpreviewsize= 1/2;    //缩略图比例

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if (!is_uploaded_file($_FILES["upfile"][tmp_name]))
    //是否存在文件
    {
        if(!$cors) {
            returnMessage(401, '图片不存在');            
        }else {
            header('Location:'.$corsurl.'?data='.returnMessage(401, '图片不存在', true));
        }
    }

    $file = $_FILES["upfile"];
    if($max_file_size < $file["size"])
    //检查文件大小
    {
        if(!$cors) {
            returnMessage(401, '图片太大');            
        }else {
            header('Location:'.$corsurl.'?data='.returnMessage(401, '图片太大', true));
        }
    }

    if(!in_array($file["type"], $uptypes))
    //检查文件类型
    {
        if(!$cors) {
            returnMessage(401, "文件类型不符，".$file["type"]);            
        }else {
            header('Location:'.$corsurl.'?data='.returnMessage(401, "文件类型不符，".$file["type"], true));
        }
    }
    if(!file_exists($destination_folder))
    {
        $mkdirResult = mkdir($destination_folder);
        returnMessage(401, $mkdirResult);        
        chmod($destination_folder, 0777);
    }

    $filename=$file["tmp_name"];
    $image_size = getimagesize($filename);
    $pinfo=pathinfo($file["name"]);
    $ftype=$pinfo['extension'];
    $destination = $destination_folder.time().".".$ftype;
    if (file_exists($destination) && $overwrite != true)
    {
        if(!$cors) {
            returnMessage(401, '同名文件已经存在了');            
        }else {
            header('Location:'.$corsurl.'?data='.returnMessage(401, '同名文件已经存在了', true));
        }
    }

    if(!move_uploaded_file ($filename, $destination))
    {
        if(!$cors) {
            returnMessage(401, '移动文件出错');            
        }else {
            header('Location:'.$corsurl.'?data='.returnMessage(401, '移动文件出错', true));
        }
    }

    $pinfo=pathinfo($destination);
    $fname=$pinfo[basename];


    if($watermark==1)
    {
        $iinfo=getimagesize($destination,$iinfo);
        $nimage=imagecreatetruecolor($image_size[0],$image_size[1]);
        $white=imagecolorallocate($nimage,255,255,255);
        $black=imagecolorallocate($nimage,0,0,0);
        $red=imagecolorallocate($nimage,255,0,0);
        imagefill($nimage,0,0,$white);
        switch ($iinfo[2])
        {
            case 1:
            $simage =imagecreatefromgif($destination);
            break;
            case 2:
            $simage =imagecreatefromjpeg($destination);
            break;
            case 3:
            $simage =imagecreatefrompng($destination);
            break;
            case 6:
            $simage =imagecreatefromwbmp($destination);
            break;
            default:
            die("不支持的文件类型");
            exit;
        }

        imagecopy($nimage,$simage,0,0,0,0,$image_size[0],$image_size[1]);
        imagefilledrectangle($nimage,1,$image_size[1]-15,80,$image_size[1],$white);

        switch($watertype)
        {
            case 1:   //加水印字符串
            imagestring($nimage,2,3,$image_size[1]-15,$waterstring,$black);
            break;
            case 2:   //加水印图片
            $simage1 =imagecreatefromgif("xplore.gif");
            imagecopy($nimage,$simage1,0,0,0,0,85,15);
            imagedestroy($simage1);
            break;
        }

        switch ($iinfo[2])
        {
            case 1:
            //imagegif($nimage, $destination);
            imagejpeg($nimage, $destination);
            break;
            case 2:
            imagejpeg($nimage, $destination);
            break;
            case 3:
            imagepng($nimage, $destination);
            break;
            case 6:
            imagewbmp($nimage, $destination);
            //imagejpeg($nimage, $destination);
            break;
        }

        //覆盖原上传文件
        imagedestroy($nimage);
        imagedestroy($simage);
    }

    // if($imgpreview==1){
	   //  // echo "<br>图片预览:<br>";
	   //  // echo "<img src=\"".$destination."\" width=".($image_size[0]*$imgpreviewsize)." height=".($image_size[1]*$imgpreviewsize);
	   //  // echo " alt=\"图片预览:\r文件名:".$destination."\r上传时间:\">";
    // }

    if(!$cors) {
        returnMessage(200, array('origin' => 'http://image.poimoe.com/'.$destination_folder.$fname, 'preview' => 'http://image.poimoe.com/'.$destination));
    }else {
        header('Location:'.$corsurl.'?data='.returnMessage(200, array('origin' => 'http://image.poimoe.com/'.$destination_folder.$fname, 'preview' => 'http://image.poimoe.com/'.$destination), true));
    }
}
?>
