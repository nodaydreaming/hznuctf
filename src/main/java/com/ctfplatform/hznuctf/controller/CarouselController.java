package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.entity.Carousel;
import com.ctfplatform.hznuctf.service.CarouselService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/carousel")
public class CarouselController {
    @Autowired
    private CarouselService carouselService;

    @RequestMapping(value = "/listSelectedCarousel",method = RequestMethod.POST)
    private Map<String,Object> listSelectedCarousel(){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        modelMap.put("status","success");
        modelMap.put("carouselList",carouselService.querySelectedCarousel());
        return modelMap;
    }
    @RequestMapping(value = "/listCarousel",method = RequestMethod.POST)
    private Map<String,Object> listCarousel(){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        List<Carousel> list = carouselService.ListCarousel();
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("carouselList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }
    @RequestMapping(value = "/insert",method = RequestMethod.POST)
    private Map<String,Object> insert(Carousel carousel){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        Map<String, Object> returnMap = new HashMap<String, Object>();
        synchronized (this) {      //同步锁 单服务器下保证只能一个线程访问 结束之后再释放
            returnMap = carouselService.insert(carousel);
            if (returnMap.get("message") == null) {
                modelMap.put("status", "success");
            } else {
                modelMap.put("status", "error");
                modelMap.put("message", returnMap.get("message"));
            }
        }
        return modelMap;
    }
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    private Map<String,Object> update(String id){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = carouselService.removeSelectedCarousel();    //撤销当前已选中的所有首页轮播图
        String[] idList = id.split(",");
        Carousel carousel = new Carousel();
        for(int i = 0; i < idList.length;i++){     //传过来几张图片更新几次
            carousel.setCarouselId(Integer.parseInt(idList[i]));
            carousel.setIsSelected(1);
            returnMap = carouselService.update(carousel);
            if(returnMap.get("message") == null){       //没出错就继续
                modelMap.put("status","success");
            }else{
                modelMap.put("status","error");
                modelMap.put("message",returnMap.get("message"));
                break;        //一旦出错 退出 返回错误信息
            }
        }
        return modelMap;
    }
    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    private Map<String,Object> delete(int carouselId){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();

        returnMap = carouselService.delete(carouselId);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }
}
