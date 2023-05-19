const AppDataSource = require("../utils/data-source");

// format: tablename, columns, values
exports.findOne = async(repoName, fields, values) => {
    const repo = AppDataSource.getRepository(repoName);
    let query = {};
    fields.map((field, id) => query[field] = values[id]);

    const data = await repo.findOne({
        where: query
    })
    return data;
}

// format: tablename, columns, values
exports.findMany = async(repoName, fields=[], values=[]) => {
    const repo = AppDataSource.getRepository(repoName);

    // building database query
    let query = {};
    fields.map((field, id) => query[field] = values[id])

    const data = await repo.find({
        where: query
    })
    return data;
}

exports.updateOne = async() => {
    return null;
}

exports.save = async(repoName, data) => {
    const repo = AppDataSource.getRepository(repoName);
    const entitiesData = repo.create(data)
    await repo.save(entitiesData);
}