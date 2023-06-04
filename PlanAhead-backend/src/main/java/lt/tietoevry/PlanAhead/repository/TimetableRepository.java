package lt.tietoevry.PlanAhead.repository;

import lt.tietoevry.PlanAhead.model.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, Long> {
    boolean existsByDate(LocalDate date);
}
