
export default class LocationError extends Error {
    code;

    constructor ( code, message ) {
        super( message );
        this.code = code;
    }
}

export const isLocationError = ( error ) => {
    return Boolean(
        typeof error === 'object' && error && 'code' in error && 'message' in error,
    );
};