package com.profile.profileservice.LikedBook;


public class LikedBook {
  
  private Long id;
  private String userId;
  private String bookId;

  public LikedBook() {

  }

  public LikedBook(Long id, String userId, String bookId) {
    this.id = id;
    this.userId = userId;
    this.bookId = bookId;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUserId() {
    return this.userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getBookId() {
    return this.bookId;
  }

  public void setBookId(String bookId) {
    this.bookId = bookId;
  }

}
