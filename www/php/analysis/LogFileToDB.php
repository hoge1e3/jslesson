<?php
// schema
// Log
//  id class user file time lang err(bool)  (index it)
//  raw (no index:JSON) 
// Annotation
//  LogID
//  TagID
//  additional(JSON)

// Tag
//  tagType(in detail: ex. <img scr )
//  detectionAlgorithm:  JS??
//  isOKprog(bool)
//  okDetail: "d":false,"i":false,"iR":false,"iN":false,"y":false
//  additional(JSON)
// TagConstraints
//   tagA => tagB
//   tagB => !tagC
//   oneof tagD,tagE,tagF

?>