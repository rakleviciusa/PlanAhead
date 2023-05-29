package lt.tietoevry.PlanAhead.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;


@Entity
@Table(name = "times")
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDate date;

    private int busyHours;

}
