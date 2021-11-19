package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.dao.CarouselDao;
import com.ctfplatform.hznuctf.entity.Carousel;
import com.ctfplatform.hznuctf.service.CarouselService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CarouselServiceImpl implements CarouselService {


    @Autowired
    private CarouselDao carouselDao;
    @Override
    public List<Carousel> ListCarousel() {
        return carouselDao.ListCarousel();
    }

    @Override
    public Carousel queryCarouselById(int carouselId) {
        return carouselDao.queryCarouselById(carouselId);
    }

    @Override
    public List<Carousel> querySelectedCarousel() {
        return carouselDao.querySelectedCarousel();
    }

    @Transactional
    @Override
    public Map<String, Object> insert(Carousel carousel) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        if (carousel.getImage() != null && !"".equals(carousel.getImage())) {
            carousel.setIsSelected(0);
            int effectedNum = carouselDao.insert(carousel);
            if (effectedNum > 0) {
            } else {
                modelMap.put("message", "添加轮播图资源失败");
            }
        } else {
            modelMap.put("message", "必填项不能为空");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> removeSelectedCarousel() {
        Map<String,Object> modelMap = new HashMap<>();
        int effectedNum = carouselDao.removeAllSelectedCarousel();
        return modelMap;
    }

    @Override
    public Map<String, Object> update(Carousel carousel) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int effectedNum = carouselDao.update(carousel);
        if(effectedNum > 0){
        }else{
            modelMap.put("message","更新失败");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> delete(int carouselId) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int effectedNum = carouselDao.delete(carouselId);
        if(effectedNum>0){}
        else{
            modelMap.put("message","删除轮播图资源失败");
        }
        return modelMap;
    }
}
