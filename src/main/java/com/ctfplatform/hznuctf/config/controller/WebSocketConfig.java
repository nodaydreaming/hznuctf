package com.ctfplatform.hznuctf.config.controller;//package com.ctfplatform.hznuctf.config.controller;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

/**
 * @author Tiecheng Jia
 * @date

 * @return
 * @throws
 * @since
 * @notes 打包时整个文件注释
*/
@Configuration
public class WebSocketConfig {
    @Bean
    public ServerEndpointExporter serverEndpointExporter(){
        return new ServerEndpointExporter();
    }
}
