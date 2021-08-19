package com.ams.Model.db.Mapper

import com.ams.Model.DTO.RoomsDTO
import com.ams.Model.db.Entity.FloorsTable
import com.ams.Model.db.Entity.RoomsTable
import org.jetbrains.exposed.sql.ResultRow

fun mapToRoomsByBuildingAndFloorDTO(it: ResultRow) = RoomsDTO.RoomsBFDTO(
    Id = it[RoomsTable.id],
    BuildingNumber = it[RoomsTable.BuildingNumber],
    FloorId = it[RoomsTable.FloorId],
    FloorNumber = it[FloorsTable.FloorNumber],
    RoomNumber = it[RoomsTable.RoomNumber],
    Available = it[RoomsTable.Available]
)
