package com.ams.Service


import com.ams.Model.DTO.FloorsDTO
import com.ams.Model.db.Entity.BuildingsTable
import com.ams.Model.db.Entity.FloorsTable
import com.ams.Model.db.Mapper.mapToFloorsDTO
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

class FloorsService {

    val allFloors = transaction {
        FloorsTable.selectAll().map { mapToFloorsDTO(it) }
    }

    fun getFloorsInBuilding(buildingNum: Int): List<FloorsDTO.SingleFloorDTO> {
        val allFloorsInBuilding = transaction {
            (FloorsTable innerJoin BuildingsTable)
                .slice(
                    FloorsTable.FloorNumber,
                    FloorsTable.id,
                    FloorsTable.BuildingNumber
                ).select(
                    { BuildingsTable.id.eq(buildingNum) }
                ).map { mapToFloorsDTO(it) }
        }
        return allFloorsInBuilding
    }
}