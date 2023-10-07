const {
    INTEGER
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Produk = sequelize.define("ms_produks", {
        nama_produk: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: true
        },
        harga: {
            type: DataTypes.STRING,

            allowNull: true,
            defaultValue: true
        },
        diskon: {
            type: DataTypes.STRING,

            allowNull: true,
            defaultValue: true
        },
        categoryId: {
            type: DataTypes.INTEGER,

            allowNull: true,
            defaultValue: true
        },
        user_id: {
            type: DataTypes.STRING,


            allowNull: true,
            defaultValue: true
        },
        dibaca: {
            type: DataTypes.INTEGER,

            allowNull: true,
            defaultValue: true
        },
        kode: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: true
        },
        tanggal: {
            type: Date,
            allowNull: true,
            defaultValue: true
        },
        keterangan: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        },
        spesifikasi: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        },
        image: {
            type: DataTypes.STRING
        }
    });
    return Produk;
};