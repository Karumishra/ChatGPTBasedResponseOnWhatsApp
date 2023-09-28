package com.whatsappplugin.controller;

import com.whatsappplugin.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/sendToOpenAI")
    public String SendMessageToOpenAI(@RequestBody String query) {
        return this.messageService.SendMessageToOpenAI(query);

    }

}
