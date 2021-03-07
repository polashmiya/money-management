export const responceData = (message: string, statusCode: number, data?: any) => {
    return {
        message,
        statusCode,
        data: data ? data : null
    }
}