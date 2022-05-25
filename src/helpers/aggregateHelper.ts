export function searchHelper(searchFiled: any, fields: any) {
  let orArr = <any>[]
  fields.forEach((element: any) => {
    orArr.push({ [element]: { $regex: new RegExp(searchFiled, 'i') } })
  })

  return { $match: { $or: orArr } }
};


export function facetHelper(skip: any, limit: any) {
  return {
    $facet: {
      list: [
        {
          $skip: Number(skip) < 0 ? 0 : Number(skip) || 0,
        },
        {
          $limit: Number(limit) < 0 ? 10 : Number(limit) || 10,
        },
      ],
      totalRecords: [
        {
          $count: 'count',
        },
      ],
    },
  }
}

export function sortHelper(columnName: any, orderBy: any) {
  return {
    $sort: { [columnName ? columnName : 'createdAt']: orderBy === 'asc' ? 1 : -1 },
  }
}

export function lookupHelper(from: any, localField: any, foreignField: any, as: any) {
  return {
    $lookup: {
      from: from,
      localField: localField,
      foreignField: foreignField,
      as: as,
    },
  }
}

export function unwindHelper(path: any) {
  return {
    $unwind: {
      path: path,
      preserveNullAndEmptyArrays: true
    }
  }
}
