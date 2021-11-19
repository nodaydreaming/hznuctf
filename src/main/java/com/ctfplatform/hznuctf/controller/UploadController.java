package com.ctfplatform.hznuctf.controller;


import com.ctfplatform.hznuctf.entity.Carousel;
import com.ctfplatform.hznuctf.service.CarouselService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/file")
public class UploadController {

    @Autowired
    private CarouselService carouselService;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    //上传题目资源
    @RequestMapping(value = "/problemResourceUpload",method = RequestMethod.POST)
    public Map<String, String> problemResourceUpload(MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws IllegalStateException, IOException{
        Map<String, String> map = new HashMap<String,String>();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");//设置日期格式  HH:mm:ss
        String date = df.format(new Date());// new Date()为获取当前系统时间，也可使用当前时间戳
        String path = request.getSession().getServletContext().getRealPath("/upload/problemResource");
        File filepath = new File(path);
        if(!filepath.exists()){
            filepath.mkdirs();
        }
        System.out.println(file.getOriginalFilename() + file.getSize());
        String originalFilename = file.getOriginalFilename();
        String fileName =  getRandomFileName() + originalFilename;
        File dir = new File(path, fileName);
        try {
            file.transferTo(dir);
            map.put("status", "success");
            map.put("src", contextPath+"/upload/problemResource/" + fileName);
        }catch (IOException e){
            map.put("status", "error");
            map.put("message", "上传失败！");
        }
        return map;
    }
    //上传题目脚本
    @RequestMapping(value = "/problemScriptUpload", method = RequestMethod.POST)
    public Map<String, String> problemScriptUpload(MultipartFile file, HttpServletRequest request, HttpServletResponse response){
        Map<String, String> map = new HashMap<String,String>();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");//设置日期格式  HH:mm:ss
        String date = df.format(new Date());// new Date()为获取当前系统时间，也可使用当前时间戳
        String path = request.getSession().getServletContext().getRealPath("/upload/problemScript");
        File filepath = new File(path);
        if(!filepath.exists()){
            filepath.mkdirs();
        }
        System.out.println(file.getOriginalFilename() + file.getSize());
        String originalFilename = file.getOriginalFilename();
        String fileName =  getRandomFileName() + originalFilename;
        File dir = new File(path, fileName);
        try {
            file.transferTo(dir);
            map.put("status", "success");
            map.put("src", contextPath+"/upload/problemScript/" + fileName);
        }catch (IOException e){
            map.put("status", "error");
            map.put("message", "上传失败！");
        }
        return map;
    }

    //上传管理员头像
    @RequestMapping(value = "/uploadImg",method = RequestMethod.POST)
    public Map<String, String> uploadImg(MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws IllegalStateException, IOException{
        Map<String, String> map = new HashMap<>();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");//设置日期格式  HH:mm:ss
        String date = df.format(new Date());// new Date()为获取当前系统时间，也可使用当前时间戳
        String path = request.getSession().getServletContext().getRealPath("/upload/adminPhoto");
        File filepath = new File(path);
        if(!filepath.exists()){
            filepath.mkdirs();
        }
        String originalFilename = file.getOriginalFilename();
        String fileName =  getRandomFileName() + originalFilename;
        File dir = new File(path, fileName);
        try {
            file.transferTo(dir);
            map.put("status", "success");
            map.put("src", contextPath+"/upload/adminPhoto/" + fileName);
        }catch (IOException e){
            map.put("status", "error");
            map.put("message", "上传失败！");
        }


        return map;

    }
    //上传赛事海报
    @RequestMapping(value = "/uploadCompetitionImage",method = RequestMethod.POST)
    public Map<String, String> uploadCompetitionImage(MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws IllegalStateException, IOException{
        Map<String, String> map = new HashMap<>();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");//设置日期格式  HH:mm:ss
        String date = df.format(new Date());// new Date()为获取当前系统时间，也可使用当前时间戳
        String path = request.getSession().getServletContext().getRealPath("/upload/CompetitionImage");
        File filepath = new File(path);
        if(!filepath.exists()){
            filepath.mkdirs();
        }
        String originalFilename = file.getOriginalFilename();
        String fileName =  getRandomFileName() + originalFilename;
        File dir = new File(path, fileName);
        try {
            file.transferTo(dir);
            map.put("status", "success");
            map.put("src", contextPath+"/upload/CompetitionImage/" + fileName);
        }catch (IOException e){
            map.put("status", "error");
            map.put("message", "上传失败！");
        }


        return map;

    }
    //单张上传精彩瞬间
    //上传赛事海报
    @RequestMapping(value = "/uploadHighlight",method = RequestMethod.POST)
    public Map<String, String> uploadHighlight(MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws IllegalStateException, IOException{
        Map<String, String> map = new HashMap<>();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");//设置日期格式  HH:mm:ss
        String date = df.format(new Date());// new Date()为获取当前系统时间，也可使用当前时间戳
        String path = request.getSession().getServletContext().getRealPath("/upload/highlight");
        File filepath = new File(path);
        if(!filepath.exists()){
            filepath.mkdirs();
        }
        String originalFilename = file.getOriginalFilename();
        String fileName =  getRandomFileName() + originalFilename;
        File dir = new File(path, fileName);
        try {
            file.transferTo(dir);
            map.put("status", "success");
            map.put("src", contextPath+"/upload/highlight/" + fileName);
        }catch (IOException e){
            map.put("status", "error");
            map.put("message", "上传失败！");
        }
        return map;
    }
    //上传轮播图
    @RequestMapping(value = "/uploadCarousel",method = RequestMethod.POST)
    public Map<String, String> uploadCarousel(MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws IllegalStateException, IOException{
        Map<String, String> map = new HashMap<>();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");//设置日期格式  HH:mm:ss
        String date = df.format(new Date());// new Date()为获取当前系统时间，也可使用当前时间戳
        String path = request.getSession().getServletContext().getRealPath("/upload/carousel");
        File filepath = new File(path);
        if (!filepath.exists()) {
            filepath.mkdirs();
        }
        String originalFilename = file.getOriginalFilename();
        String fileName = getRandomFileName() + originalFilename;
        File dir = new File(path, fileName);
        //文件上传
        try {
            file.transferTo(dir);
            map.put("status", "success");
            map.put("src", contextPath+"/upload/carousel/" + fileName);
            //轮播图文件上传后在数据库内添加该记录
            Carousel carousel = new Carousel();
            carousel.setImage(map.get("src"));
            Map<String,Object>  returnMap = new HashMap<>();
            returnMap = carouselService.insert(carousel);
            //如果操作不成功就删除文件
            if(returnMap.get("message") == null){}
            else{
                if(dir.isFile()){
                    dir.delete();
                    map.put("status", "error");
                    map.put("message", "上传失败！");
                }
                else{
                    map.put("status", "error");
                    map.put("message", "上传失败！");
                }
            }
        } catch (IOException e) {
            map.put("status", "error");
            map.put("message", "上传失败！");
        }

        return map;

    }
    public static String getRandomFileName(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String dateStr = sdf.format(new Date());
        Random random = new Random();
        int rannum = (int) (random.nextDouble() * (999999 - 100000 + 1)) + 100000;
        return dateStr + rannum;
    }

}
