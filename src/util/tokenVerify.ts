export const tokenVerify = (exp: number | undefined) => {
    if (exp! * 1000 > new Date().getTime()) return true;
    return false;
};
