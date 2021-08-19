package com.ams.Service

import com.ams.Model.DTO.BuildingsDTO
import com.ams.Model.db.Entity.BuildingsTable
import com.ams.Model.db.Mapper.mapToAllBuildingsDTO
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

class BuildingsService {


    val getAllBuildings = transaction {
        BuildingsTable.selectAll().map { mapToAllBuildingsDTO(it) }
    }
}