package com.ams.Model.db.Mapper

import com.ams.Model.DTO.FloorsDTO
import com.ams.Model.db.Entity.FloorsTable
import org.jetbrains.exposed.sql.ResultRow

fun mapToFloorsDTO(it: ResultRow) = FloorsDTO.SingleFloorDTO(
    id = it[FloorsTable.id],
    BuildingNumber = it[FloorsTable.BuildingNumber],
    FloorNumber = it[FloorsTable.FloorNumber]
)
