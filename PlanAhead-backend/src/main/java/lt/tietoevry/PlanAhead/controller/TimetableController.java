package lt.tietoevry.PlanAhead.controller;

import lt.tietoevry.PlanAhead.model.Timetable;
import lt.tietoevry.PlanAhead.repository.TimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TimetableController {

    @Autowired
    private TimetableRepository timetableRepository;

    @GetMapping("/allTimes")
    public ResponseEntity<List<Timetable>> getAllTimes(){
        try {
            List<Timetable> times = new ArrayList<>();
            timetableRepository.findAll().forEach(times::add);

            if(times.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(times, HttpStatus.OK);
        }
        catch (Exception exception){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getTimesById/{id}")
    public ResponseEntity<Timetable> getTimeById(@PathVariable Long id){
        Optional<Timetable> timesData = timetableRepository.findById(id);

        if (timesData.isPresent()){
            return new ResponseEntity<>(timesData.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/addTime")
    public ResponseEntity<Timetable> addTime(@RequestBody Timetable timetable){
        Timetable timetableObject = timetableRepository.save(timetable);

        return new ResponseEntity<>(timetableObject, HttpStatus.OK);
    }

    @PostMapping("/updateTimeById/{id}")
    public ResponseEntity<Timetable> updateBookById(@PathVariable Long id, @RequestBody Timetable timetable){
        Optional<Timetable> timesData = timetableRepository.findById(id);

        if (timesData.isPresent()){
            Timetable updatedTimetable = timesData.get();
            updatedTimetable.setDate(timetable.getDate());
            updatedTimetable.setBusyHours(timetable.getBusyHours());

            Timetable timetableObject = timetableRepository.save(updatedTimetable);

            return new ResponseEntity<>(timetableObject, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleteTimeById/{id}")
    public ResponseEntity<Timetable> deleteBookById(@PathVariable Long id){
        timetableRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
