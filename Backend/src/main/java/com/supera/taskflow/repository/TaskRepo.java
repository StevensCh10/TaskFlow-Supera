package com.supera.taskflow.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.supera.taskflow.model.Task;


public interface TaskRepo extends JpaRepository<Task, Long>{

    @Query(
        value = "SELECT * FROM task WHERE fk_user = :userID" + "",
        nativeQuery = true
    )
    List<Task> findAllByUser(@Param("userID") Long userID);

    Task findByName(String name);
}
