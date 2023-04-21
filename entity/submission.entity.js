const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "submissions", // Will use table name `category` as default behaviour.
    tableName: "submissions", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        code: {
            type: "varchar"
        },
        language:{
            type: "varchar"
        },
        accepted: {
            type: "boolean"
        }
    },
})