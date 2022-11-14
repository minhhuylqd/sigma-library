package com.profile.profileservice.LikedBook;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/books/liked")
public class LikedBookController {

  public final LikedBookService likedBookService;

  @Autowired
  public LikedBookController(LikedBookService likedBookService) {
    this.likedBookService = likedBookService;
  }
  
  @GetMapping
  public List<LikedBook> getLikedBooks() {
    return this.likedBookService.getLikedBooks();
  }

  @GetMapping(path = "byUserId/{userId}")
  public List<LikedBook> getLikedBooksByUserId(@PathVariable("userId") String userId) {
    return this.likedBookService.getLikedBooksByUserId(userId);
  }

  @PostMapping
  public void addLikedBook(@RequestBody LikedBook likedBook) {
    this.likedBookService.addLikedBook(likedBook);
  }

  @DeleteMapping
  public void deleteLikedBook(@RequestBody LikedBook likedBook) {
    this.likedBookService.deleteLikedBook(likedBook);
  }

}
