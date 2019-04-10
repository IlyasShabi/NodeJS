module.exports.isSuperAdmin = (data) => {
    return data.email === global.CONFIG.superAdmin.email && data.password === global.CONFIG.superAdmin.password;
}