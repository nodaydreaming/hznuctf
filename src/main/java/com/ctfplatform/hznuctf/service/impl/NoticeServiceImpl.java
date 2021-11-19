package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.dao.NoticeDao;
import com.ctfplatform.hznuctf.entity.Notice;
import com.ctfplatform.hznuctf.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    private NoticeDao noticeDao;
    @Override
    public List<Notice> listNotice() {
        return noticeDao.listNotice();
    }

    @Override
    public List<Notice> FuzzyQueryNotice(String text) {
        return noticeDao.FuzzyQueryNotice(text);
    }
}
