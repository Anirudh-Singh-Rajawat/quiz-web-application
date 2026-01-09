package com.java.quizapp.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @ManyToMany
    @JoinTable(
            name = "quiz_questions",
            joinColumns = @JoinColumn(name = "quiz_id"),
            inverseJoinColumns = @JoinColumn(name = "questions_id")
    )
    private List<Question> questions;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle(){
        return title;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public List<Question> getQuestions(){
        return questions;
    }
}
