const { Model } = require("objection");

class Bike extends Model {
    static get tableName() {
        return "bikes";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "type", "price"],

            properties: {
                id: { type: "integer" },
                name: { type: "string", minLength: 1, maxLength: 50 },
                type: { type: "integer" },
                price: { type: "number" },
                rented_date: [{ type: "date" }, "null"],
                rented_time: [{ type: "number" }, "null"],
                is_rented: { type: "boolean" },
            },
        };
    }

    static get modifiers() {
        return {
            defaultSelects(builder) {
                builder.select(
                    "id",
                    "name",
                    "type",
                    "price",
                    "rented_date as rentedDate",
                    "rented_time as rentedTime",
                    "is_rented as isRented"
                );
            },
        };
    }
}

module.exports = Bike;
