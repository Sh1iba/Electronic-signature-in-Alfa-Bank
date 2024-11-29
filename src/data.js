

const requestData = {
    clientId: "client",
    organizationId: "organization",
    segment: "Малый бизнес",
    role: "ЕИО",
    organizations: 3,
    currentMethod: "SMS",
    mobileApp: true,
    signatures: {
        common: {
            mobile: 3,
            web: 10,
        },
        special: {
            mobile: 5,
            web: 6,
        },
    },
    availableMethods: ["SMS", "PayControl"],
    claims: 0,
};

export default requestData;
