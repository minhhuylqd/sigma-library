package com.profile.profileservice.LikedBook;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LikedBookService {

  public final LikedBookRepository likedBookRepository;

  public LikedBookService(LikedBookRepository likedBookRepository) {
    this.likedBookRepository = likedBookRepository;
  }
  
  public List<LikedBook> getLikedBooks() {
    return this.likedBookRepository.findAll();
  }

  @Transactional
  public List<LikedBook> getLikedBooksByUserId(String userId) {
    return this.likedBookRepository.findLikedBookByUserId(userId);
  }

  public void addLikedBook(LikedBook likedBook) {
    Optional<LikedBook> optionalLikedBook = this.likedBookRepository.findLikedBookByUserIdAndBookId(likedBook.getUserId(), likedBook.getBookId());

    if (optionalLikedBook.isPresent()) {
      throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Liked Book record already existed");
    }

    this.likedBookRepository.save(likedBook);
  }

  @Transactional
  public void deleteLikedBook(LikedBook likedBook) {
    String userId = likedBook.getUserId();
    String bookId = likedBook.getBookId();

    long deletedRecords = this.likedBookRepository.deleteByUserIdAndBookId(userId, bookId);
    if (deletedRecords != 1) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Failed to Delete Liked Book - Not Found");
    }

  }

}
