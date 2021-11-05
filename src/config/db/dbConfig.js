import Sequelize from "sequelize";

const sequelize = new Sequelize("auth-db", "admin", "123456", {
    host: "localhost",
    port: "5432",
    dialect: "postgres",
    quoteIdentifiers: false,
    define: {
        syncOnAssociation: true,
        timestamps: false,
        underscored: true,
        underscoredAll: true,
        freezeTableName: true
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.info("Connection has been established")
    }).catch((err) => {
    console.error("Connection with database has error")
    console.error(err.message)
});

export default sequelize;