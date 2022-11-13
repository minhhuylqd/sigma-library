package com.profile.profileservice.LikedBook;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/likedbook")
public class LikedBookController {
  
  @GetMapping
  public List<LikedBook> getLikedBooks() {
    return List.of(
      new LikedBook(1L, "user123", "book123"),
      new LikedBook(2L, "user234", "book234")
    );
  }

}
