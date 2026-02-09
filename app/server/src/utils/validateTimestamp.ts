export const validateTimestamp = (timestamp: string) => {
    if (!/^\d{2}:\d{2}:\d{2}\.\d{2,3}$/.test(timestamp))
        throw new Error("Invalid Input");
    return true;
};
