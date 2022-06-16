package com.nuclear_kat.task_manager.controller;

import com.nuclear_kat.task_manager.entity.Subtype;
import com.nuclear_kat.task_manager.service.SubtypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/showSubtype")
public class SubtypeController {

    @Autowired
    private SubtypeService subtypeService;

    @GetMapping("/getSubtype/all")
    public List<Subtype> showAllSubtypes() {
        return subtypeService.getAllSubtypes();
    }

    @GetMapping("/getSubtype/{subtypeId}")
    public Subtype getSubtype(@PathVariable int subtypeId) {
        return subtypeService.getSubtype(subtypeId);
    }
}
