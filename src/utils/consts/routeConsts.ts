export enum RoutePaths {
    AUTHORIZATION_ROUTE = '/auth/*',
    LOGIN_ROUTE = '/auth/login',
    REGISTRATION_ROUTE = '/auth/registration',
    MOMENTS_ROUTE = '/moments',
    EVENTS_ROUTE = '/events',
    PROFILE_ROUTE = '/profile',
    PROFILE_PARAM_ROUTE = '/profile/:id?',
    SEARCH_ROUTE = '/search',
    MOMENT_CREATION_ROUTE = '/moments-creation',
    ALL_PATH = '*'
}

export enum AuthorizationRoutePaths {
    LOGIN_ROUTE = '/login',
    REGISTRATION_ROUTE = '/registration',   
}