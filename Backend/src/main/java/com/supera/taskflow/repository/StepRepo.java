package com.supera.taskflow.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.supera.taskflow.model.Step;

public interface StepRepo extends JpaRepository<Step, Long>{
    
    @Query(
        value = "SELECT st.* FROM sub_task st JOIN task t ON st.fk_task = t.id WHERE t.name = :taskname" + "",
        nativeQuery = true
    )
    List<Step> findAllByTask(@Param("taskname") String taskname);

    Step findByName(String name);
}
