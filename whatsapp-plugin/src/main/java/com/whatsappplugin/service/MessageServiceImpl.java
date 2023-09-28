package com.whatsappplugin.service;


import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MessageServiceImpl implements MessageService{

    private static final Logger logger = LoggerFactory.getLogger(MessageServiceImpl.class);
    @Value("${openai.api.key}")
    private String openAPIKey;
    @Value("${openai.api.url}")
    private String openAPIUrl;
    @Autowired
    private RestTemplate restTemplate;
    @Override
    public String SendMessageToOpenAI(String query) {

        logger.info("Starting task of auto suggestion generation of response");

        String Text="Give probable multiple auto response for message as a human being- "+query+" Just give 2 responses like 1) and 2)";

        // Setting HTTPHeaders
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Content-Type", "application/json");
        httpHeaders.set("Authorization", "Bearer " + openAPIKey);

        JSONObject jsonObject = new JSONObject();

        //Storing role and content to Map List message
        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", Text);
        messages.add(message);

        //Assigning model and message to requestBody
        jsonObject.put("model","gpt-3.5-turbo-16k");
        jsonObject.put("messages", messages);
        jsonObject.put("max_tokens", 100);
        String requestBody = jsonObject.toString();

        HttpEntity<String> httpEntity = new HttpEntity<>(requestBody, httpHeaders);

        logger.info("Starting communication with Open AI API");

        // Calling open ai api through rest template
        ResponseEntity<String> response = restTemplate.postForEntity(openAPIUrl, httpEntity, String.class);

        logger.info("Completing communication with Open AI API");

        return getFilteredResponse(response.getBody());
    }


    public String getFilteredResponse(String jsonData)
    {
        logger.info("Starting content filtering task of Open AI API response");
        JSONObject jsonDat = new JSONObject(jsonData);
        JSONArray choices = jsonDat.getJSONArray("choices");

        JSONObject choice = choices.getJSONObject(0);
        JSONObject mes = choice.getJSONObject("message");
        String content = mes.getString("content").replace("\n","")
                .replace("/","");
        logger.info("Completing content filtering task of Open AI API response");
        logger.info("Completing task of auto suggestion generation of response ");
        return content;
    }
}
