package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Carousel;

import java.util.List;
import java.util.Map;

public interface CarouselService {
    List<Carousel> ListCarousel();
    Carousel queryCarouselById(int carouselId);
    List<Carousel> querySelectedCarousel();
    Map<String,Object> insert(Carousel carousel);
    Map<String,Object> removeSelectedCarousel();
    Map<String,Object> update(Carousel carousel);
    Map<String,Object> delete(int carouselId);
}
