package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Carousel;

import java.util.List;

public interface CarouselDao {
    List<Carousel> ListCarousel();
    List<Carousel> querySelectedCarousel();
    Carousel queryCarouselById(int carouselId);
    int removeAllSelectedCarousel();
    int insert(Carousel carousel);
    int update(Carousel carousel);
    int delete(int carouselId);
}
