

export const userData = {
    clientId: 1,
    organizationId: 101,
    segment: "Средний бизнес",
    role: "Сотрудник",
    organizations: 3,
    mobileApp: true,
    signatures: {
        common: { mobile: 3, web: 10 },
        special: { mobile: 5, web: 6 },
    },
    availableMethods: ["SMS", "PayControl"],
    claims: 0,
    isFirstLogIn: true, // Было: hasAccount
    currentDevice: "web", // Было: web (строка вместо булевого значения)
    mobile: false,
};
