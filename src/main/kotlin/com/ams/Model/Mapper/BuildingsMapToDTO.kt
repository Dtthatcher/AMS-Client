package com.ams.Model.db.Mapper

import com.ams.Model.DTO.BuildingsDTO
import com.ams.Model.db.Entity.BuildingsTable
import org.jetbrains.exposed.sql.ResultRow


fun mapToAllBuildingsDTO(it: ResultRow) = BuildingsDTO(
    id = it[BuildingsTable.id]
)

