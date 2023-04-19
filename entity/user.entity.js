const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "users", // Will use table name `category` as default behaviour.
    tableName: "users", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar"
        },
        email: {
            type: "varchar"
        }, 
        password: {
            type: "varchar"
        },
        role: {
            type: "varchar",
            default: "user"
        }
    },
})