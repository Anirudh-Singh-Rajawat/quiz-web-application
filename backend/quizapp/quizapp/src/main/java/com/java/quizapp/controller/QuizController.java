package com.java.quizapp.controller;

import com.java.quizapp.model.QuestionWrapper;
import com.java.quizapp.model.Response;
import com.java.quizapp.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("quiz")

public class QuizController {

    @Autowired
    QuizService quizService;

    @PostMapping("create")
    public ResponseEntity<Integer> createQuiz(
            @RequestParam String category,
            @RequestParam int numQ,
            @RequestParam String title){
        return quizService.createQuiz(category,numQ,title);
    }

    @GetMapping("get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable Integer id){
        return quizService.getQuizQuestions(id);
    }

    @PostMapping("submit/{id}")
    public ResponseEntity<Integer> submitQuiz(
            @PathVariable Integer id,
            @RequestBody List<Response> responses){
        return quizService.calculateResult(id,responses);
    }
}
