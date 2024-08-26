package com.spring.repository;
import com.spring.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author dsozhara
 **/
public interface TaskRepository extends JpaRepository<Task, Long> {
}