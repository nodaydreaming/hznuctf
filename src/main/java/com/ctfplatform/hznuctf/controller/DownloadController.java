package com.ctfplatform.hznuctf.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

@RestController
@RequestMapping("")
public class DownloadController {

    @RequestMapping(value = "/downloadResource", method = RequestMethod.GET)
    public void downLoadFile(HttpServletRequest request, HttpServletResponse response, String filename){
        try{
            String realName = filename.substring(20);
            String path = request.getSession().getServletContext().getRealPath("/upload/problemResource/" + filename);
            File file = new File(path);
            // 以流的形式下载文件。
            InputStream fis = new BufferedInputStream(new FileInputStream(file.getPath()));
            byte[] buffer = new byte[fis.available()];
            fis.read(buffer);
            fis.close();
            // 清空response
            response.reset();

            OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
            //设置内容类型，设置http响应头，文件内容显示方式（支持ie下载图片和txt）
            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment;filename="+new String(realName.getBytes("utf-8"),"ISO8859-1"));
            toClient.write(buffer);
            toClient.flush();
            toClient.close();
        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            try {

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
