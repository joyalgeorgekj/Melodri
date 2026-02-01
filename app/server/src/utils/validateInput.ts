export const validateInput = (timestamp: string) => {
    if (!/^\d{2}:\d{2}:\d{2}$/.test(timestamp))
        throw new Error("Invalid Input");

    return true;
};
