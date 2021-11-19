package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Notice;

import java.util.List;

public interface NoticeService {
    List<Notice> listNotice();
    List<Notice> FuzzyQueryNotice(String text);
}
