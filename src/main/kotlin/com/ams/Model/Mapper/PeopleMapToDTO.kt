package com.ams.Model.db.Mapper

import com.ams.Model.DTO.PeopleDTO
import com.ams.Model.db.Entity.PeoplesTable
import org.jetbrains.exposed.sql.ResultRow

fun mapAllPeopleDTO(it: ResultRow) = PeopleDTO.AllPeopleDTO(
    id = it[PeoplesTable.id],
    RoomId = it[PeoplesTable.RoomId],
    Name = it[PeoplesTable.Name],
    Position = it[PeoplesTable.Position],
)
