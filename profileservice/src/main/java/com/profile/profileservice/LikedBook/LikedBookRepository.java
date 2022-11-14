package com.profile.profileservice.LikedBook;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LikedBookRepository extends JpaRepository<LikedBook, Long> {
  
  @Query("SELECT b FROM LikedBook b WHERE b.userId = ?1 and b.bookId = ?2")
  Optional<LikedBook> findLikedBookByUserIdAndBookId(String userId, String bookId);

  @Query("SELECT b from LikedBook b WHERE b.userId = ?1")
  List<LikedBook> findLikedBookByUserId(String userId);

  long deleteByUserIdAndBookId(String userId, String bookId);

}
