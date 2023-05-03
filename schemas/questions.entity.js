const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "questions", // Will use table name `category` as default behaviour.
    tableName: "questions", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        question: {
            type: "varchar"
        },
        description: {
            type: "varchar"
        },
        answer: {
            type: "varchar"
        },
        test_cases:{
            type: "varchar",
            array: true
        }
    },
})